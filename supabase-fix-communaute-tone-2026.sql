-- ═══════════════════════════════════════════
-- AU PESTACLE CE SOIR — Correction du ton
-- "vente de places / MP-moi" sur 5 fiches
-- communauté, remplacé par du vrai avis /
-- recap de sortie collective
--
-- Coller dans Supabase > SQL Editor > Run
-- ═══════════════════════════════════════════

update spectacles set description = 'Pascal Rambert réunit une tête d''affiche impressionnante pour ce texte dense et exigeant sur les conséquences de nos actes. Une écriture qui avance par vagues de parole, portée par de grands acteurs au Théâtre de la Ville.', intro = 'Une tête d''affiche impressionnante pour un texte qui avance par vagues de parole.', contenu = 'Pascal Rambert a l''art de réunir des distributions qui donnent envie, et Les Conséquences ne fait pas exception : la tête d''affiche est de celles qui font se déplacer rien que pour le casting.

Comme souvent chez Rambert, le texte avance par vagues de parole, dans une écriture dense et rythmée qui demande de s''y abandonner plutôt que de la disséquer. C''est exigeant, mais ça paie : on ressort avec des images et des phrases qui restent.

Au Théâtre de la Ville, dans une salle qui sert particulièrement bien ce type d''écriture frontale. Une soirée pour qui aime le théâtre de texte porté par de grands acteurs.', note = 2, type = 'spectacle' where id = 'les-consequences-rambert';
update spectacles set description = 'Nous étions trente à nous retrouver à l''ECAM du Kremlin-Bicêtre pour découvrir ce spectacle ensemble. L''ambiance de groupe change tout : un verre avant, un debrief improvisé sur le trajet retour — exactement ce que j''aime dans ces sorties collectives.', intro = 'Trente d''entre nous réunis pour une sortie collective au Kremlin-Bicêtre.', contenu = 'C''est le genre de sortie que j''adore organiser : nous étions trente à nous retrouver à l''ECAM du Kremlin-Bicêtre pour découvrir ce spectacle ensemble.

L''ambiance de groupe change tout : on se retrouve avant pour un verre, on compare les impressions à la sortie, et le trajet retour se transforme en debrief improvisé. C''est exactement ce que j''aime dans ces sorties collectives — le spectacle devient un prétexte à se retrouver autant qu''une fin en soi.

Ce genre de sortie revient régulièrement au fil de la saison : si l''aventure vous tente, gardez un œil sur le fil de la communauté.', note = 2 where id = 'abolition-des-privileges';
update spectacles set description = 'On ne présente plus Joël Pommerat, l''un des trois grands metteurs en scène vivants français — j''y suis allée en groupe, les yeux fermés, sans même connaître le pitch. Comme souvent avec lui, la soirée a été marquante, et on en a longuement discuté après.', intro = 'Pommerat les yeux fermés — une sortie de groupe sans même connaître le pitch.', contenu = 'On ne présente plus Joël Pommerat, l''un des trois grands metteurs en scène vivants français. Je n''avais aucune idée précise de ce que racontait la pièce avant d''y aller, et honnêtement, ça n''a rien changé à mon envie d''y être — avec Pommerat, je fais confiance les yeux fermés.

Nous y sommes allés à plusieurs à Nanterre-Amandiers, et comme souvent avec lui, la mise en scène a transformé un matériau qu''on n''attendait pas en une soirée de théâtre marquante. On en a longuement discuté après, chacun avec sa propre lecture — signe, pour moi, d''un bon Pommerat.

Si vous ne connaissez pas encore son travail, c''est une bonne porte d''entrée dans son univers.', note = 2 where id = 'les-petites-filles-modernes-pommerat';
update spectacles set description = 'Angelin Preljocaj s''attaque à la forme du Requiem avec le Ballet de l''Opéra de Paris, à la Seine Musicale. Les places étaient chères et mal placées, la preuve qu''il faut être motivé pour ce genre de soirée — mais ça valait le déplacement.', intro = 'Preljocaj s''attaque à la forme du Requiem avec le Ballet de l''Opéra de Paris.', contenu = 'Angelin Preljocaj est de ces chorégraphes dont je ne loupe jamais une création, et s''attaquer à la forme du Requiem avec le Ballet de l''Opéra de Paris avait de quoi donner envie.

La Seine Musicale n''est pas la salle la plus simple d''accès ni la moins chère, mais l''écrin sert bien ce genre de pièce ample, portée par une scénographie et une musique live qui donnent au Requiem une dimension presque cérémonielle. Les places étaient chères et mal placées, la preuve qu''il faut vraiment être motivé pour ce genre de soirée — mais ça valait le déplacement.

Une soirée pour qui aime la danse contemporaine portée par une vraie ambition scénographique.', note = 2, type = 'spectacle' where id = 'preljocaj-requiems-seine-musicale';
update spectacles set description = 'Nous étions 45 ! Nous avons rempli près d''un quart de la salle pour aller voir ce spectacle totalement barré, mon gros coup de cœur d''Avignon. Poilade et fête ! Si vous voyez cette pièce du Collectif La Cabale, foncez.', intro = 'Mon gros coup de cœur d''Avignon — 45 d''entre nous sont venus en bande.', contenu = 'C''est mon gros coup de cœur de tout le festival d''Avignon cette année, et visiblement l''info a circulé : nous étions quarante-cinq à nous déplacer ensemble pour aller le voir, de quoi remplir près d''un quart de la salle du Théâtre 13.

Kermesse, signé par le Collectif La Cabale, c''est de la poilade et de la fête à l''état pur, totalement barré, dans le meilleur sens du terme. La salle entière était debout à la fin, et le trajet retour s''est transformé en debrief animé où chacun y allait de sa scène préférée.

Si vous voyez cette pièce passer, ne lisez surtout rien avant (spoiler alert !) et foncez. Jeunes bienvenus, aucun prérequis : c''est n''importe nawak assumé.', note = 3 where id = 'kermesse-collectif-la-cabale';
