/* Système de likes — Au Pestacle ce soir */
(function () {
  if (typeof SUPA_URL === 'undefined') return;

  const HEADERS_W = {
    'apikey': SUPA_KEY,
    'Authorization': `Bearer ${SUPA_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
  };

  /* ── Token utilisateur (persisté en localStorage) ── */
  let userToken = localStorage.getItem('apcs_token');
  if (!userToken) {
    userToken = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('apcs_token', userToken);
  }

  /* ── État ── */
  let seeds      = {};   // id → likes_seed (base historique)
  let realCounts = {};   // id → nombre de vrais likes
  let userSet    = new Set(); // ids likés par cet utilisateur
  let ready      = false;

  /* ── Initialisation ── */
  async function init() {
    try {
      const [sRes, lRes] = await Promise.all([
        fetch(`${SUPA_URL}/rest/v1/spectacles?select=id,likes_seed`, { headers: SUPA_HEADERS }),
        fetch(`${SUPA_URL}/rest/v1/likes?select=spectacle_id,user_token`, { headers: SUPA_HEADERS }),
      ]);
      const spectaclesData = await sRes.json();
      const likesData      = await lRes.json();

      if (Array.isArray(spectaclesData)) {
        spectaclesData.forEach(s => { seeds[s.id] = s.likes_seed || 0; });
      }

      realCounts = {};
      userSet.clear();
      if (Array.isArray(likesData)) {
        likesData.forEach(l => {
          realCounts[l.spectacle_id] = (realCounts[l.spectacle_id] || 0) + 1;
          if (l.user_token === userToken) userSet.add(l.spectacle_id);
        });
      }

      ready = true;
      renderAll();
      document.dispatchEvent(new CustomEvent('likesReady'));
    } catch (_) { /* silencieux */ }
  }

  function total(id) {
    return (seeds[id] || 0) + (realCounts[id] || 0);
  }

  /* ── Rendu ── */
  function renderAll() {
    document.querySelectorAll('.like-btn[data-sid]').forEach(renderBtn);
  }

  function renderBtn(btn) {
    const id    = btn.dataset.sid;
    const liked = userSet.has(id);
    btn.classList.toggle('liked', liked);
    const iconEl  = btn.querySelector('.lk-icon');
    const countEl = btn.querySelector('.lk-count');
    if (iconEl)  iconEl.textContent  = liked ? '♥' : '♡';
    if (countEl) countEl.textContent = ready ? total(id) : '…';
    btn.setAttribute('aria-pressed', liked ? 'true' : 'false');
    btn.setAttribute('aria-label',
      (liked ? 'Retirer le coup de cœur' : 'Ajouter un coup de cœur') +
      ` — ${ready ? total(id) : '…'} personnes`);
  }

  /* ── Toggle ── */
  async function toggle(id) {
    if (!ready) return;
    const was = userSet.has(id);

    if (was) {
      userSet.delete(id);
      realCounts[id] = Math.max(0, (realCounts[id] || 0) - 1);
    } else {
      userSet.add(id);
      realCounts[id] = (realCounts[id] || 0) + 1;
    }
    document.querySelectorAll(`.like-btn[data-sid="${id}"]`).forEach(renderBtn);

    try {
      if (was) {
        await fetch(
          `${SUPA_URL}/rest/v1/likes?spectacle_id=eq.${encodeURIComponent(id)}&user_token=eq.${encodeURIComponent(userToken)}`,
          { method: 'DELETE', headers: SUPA_HEADERS }
        );
      } else {
        await fetch(`${SUPA_URL}/rest/v1/likes`, {
          method: 'POST',
          headers: HEADERS_W,
          body: JSON.stringify({ spectacle_id: id, user_token: userToken }),
        });
      }
    } catch (_) {
      /* Rollback si erreur réseau */
      if (was) { userSet.add(id); realCounts[id]++; }
      else      { userSet.delete(id); realCounts[id] = Math.max(0, (realCounts[id] || 0) - 1); }
      document.querySelectorAll(`.like-btn[data-sid="${id}"]`).forEach(renderBtn);
    }
  }

  /* ── API publique ── */
  window.apcsIsLiked = id => userSet.has(id);

  /* ── Délégation des clics ── */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.like-btn[data-sid]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    toggle(btn.dataset.sid);
  });

  /* ── Démarrage ── */
  document.addEventListener('spectaclesLoaded', init);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
