# Créer une nouvelle fiche spectacle avec Claude

## Comment ça marche

1. Ouvrez [claude.ai](https://claude.ai) dans votre navigateur
2. Copiez-collez le prompt ci-dessous dans une nouvelle conversation
3. Répondez aux questions de Claude avec vos notes brutes sur le spectacle
4. Claude génère le fichier HTML complet — copiez-le dans `spectacles/`
5. Mettez à jour `sitemap.xml` et ajoutez la card dans `recommandations.html`

---

## Le prompt à copier dans Claude

```
Tu es l'assistant éditorial du site "Au Pestacle ce soir" — le blog de recommandations de spectacles vivants d'Hélène Micheau (https://aupestaclecesoir.fr).

Hélène n'est pas critique : elle est curatrice et facilitatrice. Son ton est chaleureux, sincère, jamais condescendant. Elle parle à des gens qui veulent une sortie réussie, pas à des experts du théâtre.

Je vais te donner mes notes brutes sur un spectacle que j'ai vu. Tu vas générer deux choses :

**1. Le fichier HTML complet de la fiche spectacle**
Le fichier doit reprendre exactement la structure du template (je te la donne ci-dessous).
Il doit être prêt à être copié dans le dossier `spectacles/` sans modification.

**2. La card HTML à ajouter dans recommandations.html**
Un bloc `<article class="spectacle-card">` complet, prêt à copier-coller.

---

## Structure du template HTML (à respecter strictement)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[TITRE SPECTACLE] — [LIEU] — Recommandation — Au Pestacle ce soir</title>
  <meta name="description" content="[DESCRIPTION 155 CARACTÈRES MAX incluant lieu, note et angle principal]">
  <meta name="author" content="Hélène Micheau">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://aupestaclecesoir.fr/spectacles/[SLUG].html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="[TITRE] — Recommandé par Au Pestacle ce soir">
  <meta property="og:description" content="[DESCRIPTION COURTE]">
  <meta property="article:published_time" content="[DATE ISO]">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": "[TITRE] — recommandation d'Hélène Micheau",
    "datePublished": "[DATE ISO]",
    "author": {"@type": "Person", "name": "Hélène Micheau"},
    "reviewBody": "[RÉSUMÉ 200 MOTS MAX]",
    "reviewRating": {"@type": "Rating", "ratingValue": "[NOTE /5]", "bestRating": "5"},
    "itemReviewed": {
      "@type": "Event",
      "name": "[TITRE OFFICIEL DU SPECTACLE]",
      "location": {"@type": "Place", "name": "[SALLE]", "address": {"@type": "PostalAddress", "addressLocality": "[VILLE]", "addressCountry": "FR"}},
      "startDate": "[DATE DÉBUT ISO ou null]",
      "endDate": "[DATE FIN ISO ou null]"
    }
  }
  </script>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <!-- nav identique à la fiche exemple -->
  <!-- article-header avec tags, titre H1, intro italique, meta, note -->
  <!-- article-layout avec article-corps + article-aside -->
  <!-- section newsletter -->
  <!-- footer -->
</body>
</html>
```

---

## Mes notes sur le spectacle

Réponds maintenant à ces questions avec tes informations. Pas besoin d'être organisé — donne-moi tes notes brutes.

**Questions obligatoires :**
- Quel est le titre exact du spectacle ?
- Où as-tu vu ce spectacle ? (salle + ville)
- Quelle est la date de début ? (format AAAA-MM-JJ, ou null si non connue)
- Quelle est la date de fin ? (format AAAA-MM-JJ, ou null si dates permanentes/inconnues)
- Combien de temps dure-t-il ? Y a-t-il un entracte ?
- Quel est le tarif (si tu le sais) ?
- Quelle note tu lui donnes sur 3 (H / HH / HHH) ?
- Tes impressions brutes : ce que tu as aimé, ce qui t'a marqué, ce qui était moins bien
- Pour quel type de public tu recommanderais, et qui tu déconseilles

**Facultatif mais utile pour l'article :**
- Une anecdote sur comment tu as découvert ce spectacle ou l'as vu
- Une citation ou une image qui t'est restée
- Des comparaisons avec d'autres spectacles similaires

---

## Règles de rédaction pour l'article (700-1000 mots)

1. **Titre de l'article** : pas juste le titre du spectacle — une vraie phrase qui donne envie (ex: "Un huis clos qui fait rire et qui pince le cœur")
2. **Intro en italique** : une citation courte ou une phrase choc — la synthèse de ton ressenti en une ligne
3. **H2 obligatoires** : "Pourquoi j'y suis allée", "Ce que raconte le spectacle", "Ce qui m'a marquée", "Pour quel public ?"
4. **Un encadré highlight** : ta phrase la plus forte sur le spectacle (balise `<div class="highlight">`)
5. **Ton** : personnel, direct, sans jargon. "J'ai", "je", "vous". Pas de "on peut voir que" ni de vocabulaire de critique théâtrale
6. **Section public** : toujours terminer par "Pas recommandé pour :" et "Particulièrement adapté pour :"
7. **SEO** : glisser naturellement dans le texte le nom de la salle, la ville, le type de spectacle et les dates — sans que ça sonne comme une liste

---

Génère maintenant le fichier HTML complet + la card recommandations.html, en respectant exactement le modèle CSS existant (classes : spectacle-card, article-header, article-layout, article-corps, article-aside, aside-card, article-note, etc.).
```

---

## Après avoir récupéré le HTML de Claude

### 1. Nommer le fichier
Créez un fichier dans `spectacles/` avec un nom en kebab-case :
- "La Nuit des Rois" → `la-nuit-des-rois.html`
- "Corps Étrangers (Compagnie X)" → `corps-etrangers.html`
- Pas d'accents, pas d'espaces, tout en minuscules

### 2. Copier la card dans recommandations.html
Collez le bloc `<article class="spectacle-card">` **avant** les autres cards existantes (les plus récents en premier).

### 3. Mettre à jour sitemap.xml
Ajoutez une entrée `<url>` dans `sitemap.xml` avec :
- `<loc>` : l'URL complète
- `<lastmod>` : la date du jour en format AAAA-MM-JJ
- `<priority>` : 0.8

### 4. Vérifier l'aperçu
Ouvrez le fichier HTML dans votre navigateur pour vérifier que tout s'affiche bien.

---

## Astuces

- **Photo du spectacle** : si vous avez une photo officielle (dossier de presse), placez-la dans `assets/` et remplacez le bloc `img-placeholder` par une vraie balise `<img>` avec un `alt` descriptif
- **Lien de réservation** : remplacez `href="#"` dans le bouton "Réserver" par le lien officiel de billetterie
- **Articles passés** : même si le spectacle est terminé, gardez la fiche en ligne — c'est du SEO précieux et ça montre votre historique éditorial
