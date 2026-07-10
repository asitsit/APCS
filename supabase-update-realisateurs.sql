-- ═══════════════════════════════════════════
-- AU PESTACLE CE SOIR — Metteurs en scène manquants
-- 38 fiches complétées via recherche web (sources
-- officielles : sites des théâtres, presse spécialisée)
--
-- 2 fiches laissées sans metteur en scène (info non
-- trouvée de façon fiable) :
--   - berger-sanson-manufacture-chanson (récital duo,
--     aucune mise en scène distincte créditée)
--   - festival-mondial-du-cirque-de-demain (festival,
--     pas de metteur en scène unique)
--
-- Coller dans Supabase > SQL Editor > Run
-- ═══════════════════════════════════════════

-- Correction : "Big Brother" n'existe pas à ce théâtre,
-- le spectacle réel est "Big Mother" (Mélody Mourey)
update spectacles set titre = 'Big Mother', realisateur = 'Mélody Mourey' where id = 'big-brother-beliers';

update spectacles set realisateur = 'Pascal Rambert' where id = 'les-consequences-rambert';
update spectacles set realisateur = 'Joël Pommerat' where id = 'les-petites-filles-modernes-pommerat';
update spectacles set realisateur = 'Angelin Preljocaj' where id = 'preljocaj-requiems-seine-musicale';
update spectacles set realisateur = 'Sharon Eyal & Léo Lérus' where id = 'sharon-eyal-leo-lerus';
update spectacles set realisateur = 'Crystal Pite & Simon McBurney' where id = 'ndt1-pite-mcburney';
update spectacles set realisateur = 'Emma Dante' where id = 'les-femmes-savantes-emma-dante';
update spectacles set realisateur = 'Mourad Merzouki' where id = 'zephyr-mourad-merzouki';
update spectacles set realisateur = 'Collectif La Cabale' where id = 'kermesse-collectif-la-cabale';
update spectacles set realisateur = 'Hofesh Shechter' where id = 'hofesh-shechter-theatre-of-dreams';
update spectacles set realisateur = 'Marcial Di Fonzo Bo — avec Catherine Hiegel' where id = 'viree-au-theatre-regles-savoir-vivre';
update spectacles set realisateur = 'Julien Gosselin' where id = 'musee-duras-gosselin';
update spectacles set realisateur = 'Charles Tordjman' where id = 'douze-hommes-en-colere';
update spectacles set realisateur = 'François Morel' where id = 'art-francois-morel';
update spectacles set realisateur = 'Pierre Guillois' where id = 'bigre-atelier';
update spectacles set realisateur = 'Karim Tougui' where id = 'chattologie';
update spectacles set realisateur = 'Éric Chantelauze' where id = 'constance-dans-inconstance';
update spectacles set realisateur = 'Gabriel Dufay' where id = 'etincelles-comedie-francaise';
update spectacles set realisateur = 'Guillaume Barbot' where id = 'juste-la-fin-du-monde-theatre13';
update spectacles set realisateur = 'Mathieu Rannou' where id = 'kessel-ou-la-liberte-a-tout-prix';
update spectacles set realisateur = 'Hugues Duchêne' where id = 'abolition-des-privileges';
update spectacles set realisateur = 'Métilde Weyergans et Samuel Hercule' where id = 'l-affaire-lexpire';
update spectacles set realisateur = 'Mickaël Délis — avec Papy de Trappes' where id = 'la-fete-du-slip';
update spectacles set realisateur = 'Jacques Vincey' where id = 'la-fin-du-courage';
update spectacles set realisateur = 'Tristan Petitgirard' where id = 'la-machine-de-turing';
update spectacles set realisateur = 'Victor Bourigault' where id = 'la-tete-ailleurs';
update spectacles set realisateur = 'Valérie Lesort' where id = 'la-vie-parisienne';
update spectacles set realisateur = 'Emmanuel Demarcy-Mota' where id = 'cercle-de-craie-caucasien';
update spectacles set realisateur = 'Denis Podalydès' where id = 'le-cid';
update spectacles set realisateur = 'Julien Sibre' where id = 'le-repas-des-fauves';
update spectacles set realisateur = 'Gilles Rico' where id = 'les-demoiselles-de-rochefort-lido';
update spectacles set realisateur = 'Pierre Guillois et Olivier Martin-Salvan' where id = 'les-gros-patinent-bien';
update spectacles set realisateur = 'Maëlle Mays' where id = 'lecons-impertinentes-zou';
update spectacles set realisateur = 'Louis Arène' where id = 'makbeth-munstrum';
update spectacles set realisateur = 'Métilde Weyergans et Samuel Hercule' where id = 'ne-pas-finir-comme-romeo-et-juliette';
update spectacles set realisateur = 'Eddy D''Aranjo' where id = 'oedipe-roi-odeon';
update spectacles set realisateur = 'Marie-Julie Baup et Thierry Lopez' where id = 'oublie-moi-bruyere';
update spectacles set realisateur = 'Alexis Michalik' where id = 'passeport-renaissance';
update spectacles set realisateur = 'Jean-Michel Ribes' where id = 'un-pas-de-cote-et-lautre-aussi';
update spectacles set realisateur = 'Yngvild Aspeli & Paola Rizza — Cie Plexus Polaire' where id = 'une-maison-de-poupee';
