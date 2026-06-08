/* Au Pestacle ce soir — JS principal */

/* ── Navigation sticky scroll ──────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ── Burger menu mobile ─────────────────────── */
const burger   = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (nav && !nav.contains(e.target)) navLinks.classList.remove('open');
  });
}

/* ── Dropdown Avignon ───────────────────────── */
document.querySelectorAll('.nav__dropdown').forEach(dd => {
  const toggle = dd.querySelector('.nav__dropdown-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = dd.classList.toggle('nav__dropdown--open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.nav__dropdown--open').forEach(dd => {
    dd.classList.remove('nav__dropdown--open');
    const t = dd.querySelector('.nav__dropdown-toggle');
    if (t) t.setAttribute('aria-expanded', false);
  });
});

/* ── Lien actif dans la nav ─────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── Révélation au scroll ───────────────────── */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   FILTRES PAGE RECOMMANDATIONS
   Filtrage par période uniquement (humeur supprimée)
   Les cartes sont chargées dynamiquement via fetch.
   L'événement 'spectaclesLoaded' déclenche l'init.
══════════════════════════════════════════════ */

const PERIODE_LABELS = {
  avoir:    'À voir',
  souvenir: "On s'en souvient",
  toutes:   null,
};

let activePeriode = 'toutes';
let activeNote    = 'toutes';
let activeLiked   = false;

const periodeBtns = document.querySelectorAll('.filtre-btn--periode');
const noteBtns    = document.querySelectorAll('.filtre-btn--note');
const likedBtn    = document.getElementById('filtre-liked');
const activeBar   = document.getElementById('active-filters');
const chipsWrap   = document.getElementById('filter-chips');
const resetBtn    = document.getElementById('reset-filters');
const countLabel  = document.getElementById('count-label');

function getCards() {
  return document.querySelectorAll('.spectacle-card');
}

function applyFilters() {
  const cards = getCards();
  let visible = 0;

  cards.forEach(card => {
    const period = (card.dataset.period || 'avoir').trim();
    const note   = parseInt(card.dataset.note || '2', 10);
    let show;

    if (activePeriode === 'souvenir') {
      show = period === 'passe';
    } else if (activePeriode === 'avoir') {
      show = period !== 'passe';
    } else {
      show = true;
    }

    if (activeNote !== 'toutes') {
      show = show && note === parseInt(activeNote, 10);
    }

    if (activeLiked) {
      const sid = card.dataset.sid;
      show = show && typeof window.apcsIsLiked === 'function' && window.apcsIsLiked(sid);
    }

    if (show) { card.removeAttribute('data-hidden'); visible++; }
    else       { card.setAttribute('data-hidden', 'true'); }
  });

  if (countLabel)
    countLabel.textContent = visible + ' recommandation' + (visible > 1 ? 's' : '');

  updateChips();
}

function updateChips() {
  if (!chipsWrap || !activeBar) return;
  chipsWrap.innerHTML = '';
  let has = false;

  if (activePeriode !== 'toutes' && PERIODE_LABELS[activePeriode]) {
    has = true;
    const chip = document.createElement('button');
    chip.className = 'filter-chip filter-chip--periode';
    chip.innerHTML = `${PERIODE_LABELS[activePeriode]} <span class="filter-chip__x">×</span>`;
    chip.addEventListener('click', () => {
      activePeriode = 'toutes';
      periodeBtns.forEach(b => b.classList.remove('active'));
      applyFilters();
    });
    chipsWrap.appendChild(chip);
  }

  if (activeLiked) {
    has = true;
    const chip = document.createElement('button');
    chip.className = 'filter-chip';
    chip.innerHTML = `♥ Mes coups de cœur <span class="filter-chip__x">×</span>`;
    chip.addEventListener('click', () => {
      activeLiked = false;
      if (likedBtn) likedBtn.classList.remove('active');
      applyFilters();
    });
    chipsWrap.appendChild(chip);
  }

  if (activeNote !== 'toutes') {
    has = true;
    const noteLabel = { '3': 'HHH — Coups de cœur', '2': 'HH — Très recommandés', '1': 'H — Recommandés' }[activeNote] || activeNote;
    const chip = document.createElement('button');
    chip.className = 'filter-chip filter-chip--note';
    chip.style.fontFamily = 'var(--font-titre)';
    chip.innerHTML = `${noteLabel} <span class="filter-chip__x">×</span>`;
    chip.addEventListener('click', () => {
      activeNote = 'toutes';
      noteBtns.forEach(b => b.classList.remove('active'));
      applyFilters();
    });
    chipsWrap.appendChild(chip);
  }

  activeBar.style.display = has ? 'flex' : 'none';
}

function resetFilters() {
  activePeriode = 'toutes';
  activeNote    = 'toutes';
  activeLiked   = false;
  periodeBtns.forEach(b => b.classList.remove('active'));
  noteBtns.forEach(b => b.classList.remove('active'));
  if (likedBtn) likedBtn.classList.remove('active');
  applyFilters();
}

periodeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.filtreperiode || btn.dataset.filtrePeriode;
    if (activePeriode === val) {
      activePeriode = 'toutes';
      btn.classList.remove('active');
    } else {
      periodeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePeriode = val;
    }
    applyFilters();
  });
});

noteBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.filtreNote;
    if (activeNote === val) {
      activeNote = 'toutes';
      btn.classList.remove('active');
    } else {
      noteBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeNote = val;
    }
    applyFilters();
  });
});

if (resetBtn) resetBtn.addEventListener('click', resetFilters);

if (likedBtn) {
  likedBtn.addEventListener('click', () => {
    activeLiked = !activeLiked;
    likedBtn.classList.toggle('active', activeLiked);
    applyFilters();
  });
}

document.addEventListener('likesReady', () => {
  if (activeLiked) applyFilters();
});

document.addEventListener('spectaclesLoaded', () => {
  applyFilters();
});

/* ══════════════════════════════════════════════
   PAGES DÉTAIL SPECTACLE
   Inject poster image + H rating on /spectacles/*.html
══════════════════════════════════════════════ */
(function() {
  const pathname = window.location.pathname;
  if (!pathname.includes('/spectacles/')) return;

  const id = pathname.split('/spectacles/')[1].replace('.html', '');

  fetch(`${SUPA_URL}/rest/v1/spectacles?actif=eq.true`, { headers: SUPA_HEADERS })
    .then(r => r.json())
    .then(spectacles => {
      const s = spectacles.find(x => x.id === id);

      /* 1 ── Affiche dans la sidebar ── */
      if (s && s.photo) {
        const aside = document.querySelector('.article-aside');
        if (aside) {
          const posterCard = document.createElement('div');
          posterCard.className = 'aside-card';
          posterCard.style.cssText = 'padding:0;overflow:hidden;';
          posterCard.innerHTML = `<img src="${s.photo}" alt="Affiche — ${s.titre}" style="width:100%;display:block;height:280px;object-fit:cover;object-position:center top;">`;
          aside.insertBefore(posterCard, aside.firstChild);
        }
      }

      /* 2 ── Notation H (remplace les étoiles) ── */
      const n = s ? s.note : 2;
      function hSpans(size) {
        return Array.from({length:3}, (_,i) =>
          `<span style="color:${i<n?'var(--accent)':'#D8D8D8'};font-family:var(--font-titre);font-weight:700;font-size:${size};letter-spacing:4px;">H</span>`
        ).join('');
      }

      const headerStars = document.querySelector('.article-note__stars');
      if (headerStars) {
        headerStars.innerHTML = hSpans('1.5rem');
        const label = headerStars.nextElementSibling;
        if (label) {
          const txt = n >= 3 ? 'HHH — Coup de cœur absolu' : n >= 2 ? 'HH — Très recommandé' : 'H — Recommandé';
          label.textContent = `Note d'Hélène — ${txt}`;
        }
      }

      const asideRating = document.querySelector('.aside-card [aria-label*="toile"]');
      if (asideRating) {
        asideRating.innerHTML = hSpans('2rem');
        asideRating.removeAttribute('aria-label');
      }
    })
    .catch(() => {}); // silent fail, le reste de la page fonctionne
})();

/* ── Newsletter form ────────────────────────── */
const newsletterForm = document.querySelector('.newsletter__form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = newsletterForm.querySelector('.newsletter__input');
    const btn   = newsletterForm.querySelector('.newsletter__submit');
    if (!input.value.trim().includes('@')) {
      input.style.borderBottom = '2px solid var(--corail)';
      return;
    }
    btn.textContent      = '✓ Merci !';
    btn.style.background = '#22C55E';
    input.value  = '';
    input.disabled = true;
    btn.disabled   = true;
  });
}
