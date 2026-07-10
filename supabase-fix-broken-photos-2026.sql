-- ═══════════════════════════════════════════
-- AU PESTACLE CE SOIR — Correction de 2 photos
-- cassées (404 / hotlink bloqué)
--
-- Coller dans Supabase > SQL Editor > Run
-- ═══════════════════════════════════════════

update spectacles set photo = 'https://www.theatreonline.com/BDDPhoto/Medias//programmation/91478/xs_1_affiche.jpeg' where id = 'constance-dans-inconstance';
update spectacles set photo = 'https://www.billetreduc.com/zg/n300/vz-A6CF0079-3E3B-4C16-A2B4-B997D453280F.jpeg' where id = 'festival-mondial-du-cirque-de-demain';
