/* ============================================================
   AU PESTACLE CE SOIR — Serveur Node.js
   Fichiers statiques + API REST + Admin
   ============================================================ */

const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const PORT          = 3000;
const ROOT          = __dirname;
const DATA_FILE     = path.join(ROOT, 'data', 'spectacles.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pestacle2025';

/* ── Session en mémoire (simple, local) ───────────────────── */
let SESSION_TOKEN = null;

function parseCookies(req) {
  const list = {};
  const raw  = req.headers.cookie;
  if (!raw) return list;
  raw.split(';').forEach(part => {
    const [k, ...v] = part.trim().split('=');
    list[k.trim()] = decodeURIComponent(v.join('='));
  });
  return list;
}

function isAuth(req) {
  if (!SESSION_TOKEN) return false;
  return parseCookies(req)['admin_token'] === SESSION_TOKEN;
}

/* ── Lecture / écriture du JSON ───────────────────────────── */
function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeData(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

/* ── Lecture du corps JSON ─────────────────────────────────── */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(raw)); } catch { resolve({}); }
    });
    req.on('error', reject);
  });
}

/* ── MIME types ───────────────────────────────────────────── */
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain',
  '.xml':  'application/xml',
};

/* ── JSON helper ──────────────────────────────────────────── */
function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(data));
}

/* ══════════════════════════════════════════════════════════
   SERVEUR PRINCIPAL
══════════════════════════════════════════════════════════ */
http.createServer(async (req, res) => {
  const method  = req.method;
  const urlPath = req.url.split('?')[0];

  /* ─ CORS preflight ─ */
  if (method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE', 'Access-Control-Allow-Headers': 'Content-Type' });
    res.end();
    return;
  }

  /* ════════════════════════════════
     API — /api/spectacles
  ════════════════════════════════ */

  /* GET /api/spectacles — liste publique */
  if (urlPath === '/api/spectacles' && method === 'GET') {
    return json(res, 200, readData());
  }

  /* POST /api/spectacles — ajout (auth requise) */
  if (urlPath === '/api/spectacles' && method === 'POST') {
    if (!isAuth(req)) return json(res, 401, { error: 'Non autorisé' });
    const body     = await readBody(req);
    const data     = readData();
    const newItem  = {
      id:          body.id || Date.now().toString(),
      titre:       body.titre       || '',
      lieu:        body.lieu        || '',
      date_debut:  body.date_debut  || null,
      date_fin:    body.date_fin    || null,
      duree:       body.duree       || '',
      description: body.description || '',
      note:        Number(body.note) || 3,
      couleur:     body.couleur     || '#E8E8E8',
      photo:       body.photo       || '',
      lien:        body.lien        || '#',
      actif:       body.actif !== false,
    };
    data.push(newItem);
    writeData(data);
    return json(res, 201, newItem);
  }

  /* PUT /api/spectacles/:id — modification */
  const putMatch = urlPath.match(/^\/api\/spectacles\/([^/]+)$/);
  if (putMatch && method === 'PUT') {
    if (!isAuth(req)) return json(res, 401, { error: 'Non autorisé' });
    const id   = decodeURIComponent(putMatch[1]);
    const data = readData();
    const idx  = data.findIndex(s => s.id === id);
    if (idx === -1) return json(res, 404, { error: 'Introuvable' });
    const body    = await readBody(req);
    data[idx]     = { ...data[idx], ...body, id };
    writeData(data);
    return json(res, 200, data[idx]);
  }

  /* DELETE /api/spectacles/:id */
  const delMatch = urlPath.match(/^\/api\/spectacles\/([^/]+)$/);
  if (delMatch && method === 'DELETE') {
    if (!isAuth(req)) return json(res, 401, { error: 'Non autorisé' });
    const id   = decodeURIComponent(delMatch[1]);
    const data = readData();
    const idx  = data.findIndex(s => s.id === id);
    if (idx === -1) return json(res, 404, { error: 'Introuvable' });
    data.splice(idx, 1);
    writeData(data);
    return json(res, 200, { ok: true });
  }

  /* ═══════════════════════════════
     ADMIN AUTH
  ═══════════════════════════════ */

  /* POST /admin/login */
  if (urlPath === '/admin/login' && method === 'POST') {
    const body = await readBody(req);
    if (body.password === ADMIN_PASSWORD) {
      SESSION_TOKEN = crypto.randomBytes(32).toString('hex');
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Set-Cookie': `admin_token=${SESSION_TOKEN}; Path=/; HttpOnly; SameSite=Strict`
      });
      return res.end(JSON.stringify({ ok: true }));
    }
    return json(res, 401, { error: 'Mot de passe incorrect' });
  }

  /* POST /admin/logout */
  if (urlPath === '/admin/logout' && method === 'POST') {
    SESSION_TOKEN = null;
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Set-Cookie': 'admin_token=; Path=/; HttpOnly; Max-Age=0'
    });
    return res.end(JSON.stringify({ ok: true }));
  }

  /* GET /admin/check — vérifier l'auth (pour le JS côté client) */
  if (urlPath === '/admin/check' && method === 'GET') {
    return json(res, 200, { authenticated: isAuth(req) });
  }

  /* ═══════════════════════════════
     FICHIERS STATIQUES
  ═══════════════════════════════ */

  /* /admin → admin.html */
  let filePath = urlPath === '/admin'
    ? path.join(ROOT, 'admin.html')
    : path.join(ROOT, urlPath === '/' ? '/index.html' : urlPath);

  const ext = path.extname(filePath) || '.html';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<h1 style="font-family:sans-serif;padding:40px">404 — Page introuvable</h1>');
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });

}).listen(PORT, () => {
  console.log('\n  ╔══════════════════════════════════════╗');
  console.log('  ║   AU PESTACLE CE SOIR — Serveur      ║');
  console.log('  ╚══════════════════════════════════════╝\n');
  console.log(`  Site     →  http://localhost:${PORT}`);
  console.log(`  Admin    →  http://localhost:${PORT}/admin`);
  console.log(`  Password →  ${ADMIN_PASSWORD}\n`);
  console.log('  Ctrl+C pour arrêter\n');
});
