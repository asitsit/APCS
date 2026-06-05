/* ══════════════════════════════════════════════════════════════════
   Au Pestacle ce soir — Compteur de likes partagé (Supabase)

   ⚙️  CONFIGURATION : remplacer les 2 lignes ci-dessous
   (Supabase → Settings → API)
══════════════════════════════════════════════════════════════════ */

const SUPABASE_URL      = 'REMPLACER_PAR_VOTRE_PROJECT_URL';   // ex: https://abcdef.supabase.co
const SUPABASE_ANON_KEY = 'REMPLACER_PAR_VOTRE_ANON_KEY';      // clé "anon public"

/* ── Détection de la config ───────────────────────────────────── */
const LIKES_CONFIGURED = !SUPABASE_URL.startsWith('REMPLACER');

/* ── Headers Supabase ────────────────────────────────────────── */
const SB_HEADERS = {
  'apikey':        SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type':  'application/json',
};

/* ── API Supabase ─────────────────────────────────────────────── */
async function sbGet(path) {
  const r = await fetch(`${SUPABASE_URL}${path}`, { headers: SB_HEADERS });
  if (!r.ok) throw new Error(`SB ${r.status}`);
  return r.json();
}

async function sbRpc(fn, body) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST', headers: SB_HEADERS, body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`SB RPC ${r.status}`);
  return r.json();
}

async function getLikeCount(id) {
  const rows = await sbGet(`/rest/v1/likes?spectacle=eq.${encodeURIComponent(id)}&select=count`);
  return rows[0]?.count ?? 0;
}

async function getAllLikes() {
  const rows = await sbGet('/rest/v1/likes?select=spectacle,count');
  const map = {};
  rows.forEach(r => { map[r.spectacle] = r.count; });
  return map;
}

async function incrementLike(id) {
  return sbRpc('increment_like', { spectacle_id: id });
}

/* ── LocalStorage anti-double-vote ────────────────────────────── */
function hasLiked(id)   { return localStorage.getItem(`like_${id}`) === '1'; }
function saveLike(id)   { localStorage.setItem(`like_${id}`, '1'); }

/* ── Formattage ──────────────────────────────────────────────── */
function fmtCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k';
  return String(n);
}

/* ════════════════════════════════════════════════════════════════
   AUTO-INJECTION SUR LES FICHES SPECTACLES
   Détecte automatiquement la page via window.location.pathname
════════════════════════════════════════════════════════════════ */
async function initSpectaclePage() {
  /* Identifier le spectacle via l'URL */
  const spectacleId = window.location.pathname
    .split('/').pop()
    .replace('.html', '');

  /* Trouver le sidebar pour y injecter le bouton */
  const aside = document.querySelector('.article-aside');
  if (!aside) return;

  /* Créer la card like */
  const card = document.createElement('div');
  card.className = 'aside-card';
  card.style.textAlign = 'center';

  const liked = hasLiked(spectacleId);
  card.innerHTML = `
    <h3>Vous avez aimé ?</h3>
    <p style="font-size:0.85rem;color:var(--gris);margin-bottom:16px;line-height:1.5;">
      Dites-le à la communauté — ça aide Hélène à savoir quels spectacles recommander en priorité.
    </p>
    <button class="like-btn ${liked ? 'like-btn--active' : ''}" id="like-btn-main"
            aria-label="J'aime ce spectacle" ${liked ? 'disabled' : ''}>
      <span class="like-btn__heart">${liked ? '♥' : '♡'}</span>
      <span class="like-btn__count">…</span>
    </button>
    ${liked ? '<p style="font-size:0.78rem;color:var(--gris);margin-top:10px;">Vous avez déjà aimé ce spectacle ♥</p>' : ''}
  `;

  /* Insérer avant le dernier aside-card (le bloc "pour aller plus loin") */
  const cards = aside.querySelectorAll('.aside-card');
  const lastCard = cards[cards.length - 1];
  aside.insertBefore(card, lastCard);

  const btn   = document.getElementById('like-btn-main');
  const countEl = btn?.querySelector('.like-btn__count');

  /* Charger le compteur initial */
  try {
    const count = await getLikeCount(spectacleId);
    if (countEl) countEl.textContent = count > 0 ? fmtCount(count) + ' ♥' : 'Soyez le premier !';
  } catch {
    if (countEl) countEl.textContent = '—';
  }

  /* Clic */
  btn?.addEventListener('click', async () => {
    if (hasLiked(spectacleId)) return;

    /* UI optimiste */
    const cur = parseInt(countEl.textContent) || 0;
    btn.classList.add('like-btn--active', 'like-btn--bounce');
    btn.querySelector('.like-btn__heart').textContent = '♥';
    countEl.textContent = fmtCount(cur + 1) + ' ♥';
    btn.disabled = true;
    saveLike(spectacleId);

    /* Appel API */
    try {
      const newCount = await incrementLike(spectacleId);
      countEl.textContent = fmtCount(newCount) + ' ♥';
    } catch {
      /* vote local sauvé même en cas d'erreur réseau */
    }

    /* Message de remerciement */
    const msg = document.createElement('p');
    msg.style.cssText = 'font-size:0.78rem;color:var(--pistache-dark);margin-top:10px;font-weight:600;';
    msg.textContent = 'Merci pour votre soutien ! ♥';
    btn.after(msg);

    setTimeout(() => btn.classList.remove('like-btn--bounce'), 400);
  });
}

/* ════════════════════════════════════════════════════════════════
   AUTO-INJECTION SUR LA PAGE RECOMMANDATIONS
   Affiche un petit compteur ♥ sur chaque card
════════════════════════════════════════════════════════════════ */
async function initRecoPage() {
  let allCounts;
  try {
    allCounts = await getAllLikes();
  } catch {
    return;
  }

  document.querySelectorAll('.spectacle-card').forEach(card => {
    const link = card.querySelector('.spectacle-card__link');
    if (!link) return;

    const id = (link.getAttribute('href') || '')
      .replace(/.*spectacles\//, '').replace('.html', '');
    const count = allCounts[id] ?? 0;
    if (count === 0) return;

    const footer = card.querySelector('.spectacle-card__footer');
    if (!footer) return;

    const pill = document.createElement('span');
    pill.className = 'like-pill' + (hasLiked(id) ? ' like-pill--active' : '');
    pill.setAttribute('aria-label', `${count} like${count > 1 ? 's' : ''}`);
    pill.textContent = (hasLiked(id) ? '♥' : '♡') + ' ' + fmtCount(count);
    footer.insertBefore(pill, footer.firstChild);
  });
}

/* ════════════════════════════════════════════════════════════════
   POINT D'ENTRÉE — appelé depuis main.js
════════════════════════════════════════════════════════════════ */
window.LikesInit = function() {
  if (!LIKES_CONFIGURED) {
    /* Mode développement : affiche un message dans la console */
    console.info('[Likes] Configurez SUPABASE_URL et SUPABASE_ANON_KEY dans js/likes.js');
    return;
  }

  const path = window.location.pathname;

  if (path.includes('/spectacles/')) {
    initSpectaclePage();
  } else if (path.includes('recommandations.html') || path.endsWith('/') || path.includes('index.html')) {
    initRecoPage();
  }
};
