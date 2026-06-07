-- ═══════════════════════════════════════════
-- AU PESTACLE CE SOIR — Migration Supabase
-- Coller dans Supabase > SQL Editor > Run
-- ═══════════════════════════════════════════

create table if not exists spectacles (
  id          text primary key,
  titre       text not null,
  lieu        text,
  date_debut  date,
  date_fin    date,
  duree       text,
  description text,
  note        integer default 2,
  couleur     text default '#E8E8E8',
  photo       text,
  lien        text,
  actif       boolean default true,
  created_at  timestamptz default now()
);

alter table spectacles enable row level security;

drop policy if exists "Lecture publique" on spectacles;
drop policy if exists "Ecriture admin" on spectacles;

create policy "Lecture publique" on spectacles
  for select using (true);

create policy "Ecriture admin" on spectacles
  for all using (auth.role() = 'authenticated');

-- ── Données existantes ──────────────────────
insert into spectacles (id, titre, lieu, date_debut, date_fin, duree, description, note, couleur, photo, lien, actif) values
('la-derniere-repetition', 'La Dernière Répétition', 'Théâtre de la Tempête, Vincennes', '2025-01-15', '2025-02-15', '1h30 sans entracte', 'Une troupe de comédiens amateurs répète pour la dernière fois avant la dissolution de leur compagnie. Entre larmes et fou rires, ce huis clos touchant sur la passion du plateau est une vraie pépite.', 2, '#F0E8E8', '/assets/spectacles/la-derniere-repetition.jpg', 'spectacles/la-derniere-repetition.html', true),
('corps-etrangers', 'Corps Étrangers', 'Centre Pompidou, Paris 4e', '2025-01-20', '2025-02-10', '1h15', 'Trois danseurs explorent l''espace entre leurs corps sans jamais se toucher. Un spectacle de danse contemporaine qui réussit l''exploit d''être à la fois exigeant et profondément émouvant.', 3, '#E8F0DC', '/assets/spectacles/corps-etrangers.jpg', 'spectacles/corps-etrangers.html', true),
('mimi-la-grenouille', 'Les Aventures de Mimi la Grenouille', 'Théâtre du Rond-Point, Paris 8e', '2024-09-04', '2025-06-28', '55 min (dès 4 ans)', 'Du cirque, des marionnettes et de la musique live pour une heure de pur bonheur. Les adultes sortent avec autant de sourires que les enfants. Un sans-faute pour les familles.', 3, '#F5F0CC', '/assets/spectacles/mimi-la-grenouille.jpg', 'spectacles/mimi-la-grenouille.html', true),
('menopause', 'Ménopause, le Musical', 'Apollo Théâtre, Paris 11e', null, '2026-12-31', '', 'Quatre femmes piégées aux soldes des Galeries Lafayette. Du malaise, des rires, de l''émotion — ces artistes sont incroyables. Ne vous fiez pas au titre, c''est pour tout le monde.', 3, '#F8E0EE', '/assets/spectacles/menopause.jpg', 'spectacles/menopause.html', true),
('akim-omiri-dans-contexte', 'Akim Omiri dans Contexte', 'Théâtre Gaîté Rive Gauche, Paris 14e', '2026-06-04', '2026-06-04', '1h15', 'Cancel culture, éducation formatée, théories du complot — Akim Omiri prend les sujets qui fâchent et en fait de l''or comique. 1493 avis, 10/10. Le stand-up français à son meilleur.', 3, '#FFF0E0', '/assets/spectacles/akim-omiri-dans-contexte.jpg', 'spectacles/akim-omiri-dans-contexte.html', true),
('le-roi-lion', 'Le Roi Lion', 'Théâtre Mogador, Paris 9e', '2026-06-03', '2026-08-09', '2h35 avec entracte', 'La comédie musicale la plus magique de Paris. Costumes époustouflants, voix exceptionnelles. Vous serez emportés dans un tourbillon dès les premières notes de Circle of Life.', 2, '#FFF8E0', '/assets/spectacles/le-roi-lion.jpg', 'spectacles/le-roi-lion.html', true),
('sacree-soiree', 'Sacrée Soirée !', 'La Grande Comédie, Paris 9e', '2026-06-04', '2026-06-13', '1h20', 'Une comédie parfaitement huilée d''Alil Vardar — quiproquos, rebondissements, jeu impeccable. 1152 avis et 10/10. Dernières dates, foncez !', 3, '#E8F8D0', '/assets/spectacles/sacree-soiree.jpg', 'spectacles/sacree-soiree.html', true),
('le-cercle-des-poetes-disparus', 'Le Cercle des Poètes Disparus', 'Théâtre Libre, Paris 10e', '2026-09-11', '2027-01-10', '2 heures', 'Carpe diem — Philippe Torreton incarne Keating avec une intensité bouleversante. 555 avis, 10/10. Un des meilleurs spectacles de la saison. À réserver maintenant.', 3, '#E8E0F0', '/assets/spectacles/le-cercle-des-poetes-disparus.jpg', 'spectacles/le-cercle-des-poetes-disparus.html', true),
('adn', 'ADN', 'Théâtre Michel, Paris 8e', '2026-06-03', '2026-08-29', '1h45', 'Un test ADN, un bébé qui n''est pas le sien, une mère assassinée. Thriller familial tiré de faits réels — redoutable d''efficacité (Télérama). On ne voit pas passer la pièce.', 2, '#F8E8D8', '/assets/spectacles/adn.jpg', 'spectacles/adn.html', true),
('jules-verne-le-voyage-extraordinaire', 'Jules Verne — Le Voyage Extraordinaire', 'Grand Hôtel des Rêves, Paris 5e', '2026-06-03', '2026-09-13', '1 heure', 'Phileas Fogg, le capitaine Nemo, le docteur Fergusson — un parcours immersif époustouflant avec deux acteurs brillants. Une expérience rare, pour toute la famille dès 4 ans.', 3, '#E0F0F8', '/assets/spectacles/jules-verne-le-voyage-extraordinaire.jpg', 'spectacles/jules-verne-le-voyage-extraordinaire.html', true),
('aladin', 'Aladin', 'Comédie Saint Martin, Paris 3e', '2026-06-06', '2026-10-11', '~1 heure (dès 3 ans)', 'Théâtre, chant, danse et magie dans un décor phosphorescent. Le Génie improvise avec les enfants dans la salle. Photo souvenir à la fin. Un sans-faute. 192 avis, 10/10.', 3, '#F0E0FF', '/assets/spectacles/aladin.jpg', 'spectacles/aladin.html', true),
('arsene-lupin-gentleman-illusionniste', 'Arsène Lupin, Gentleman Illusionniste', 'Théâtre des Variétés, Paris 2e', '2026-10-18', '2027-04-17', '1h20 (dès 6 ans)', 'Le gentleman cambrioleur + la magie + les Années Folles = un spectacle trans-générationnel. L''idée sortie en famille de l''automne-hiver. Le Théâtre des Variétés est un joyau.', 2, '#E0F0E8', '/assets/spectacles/arsene-lupin-gentleman-illusionniste.jpg', 'spectacles/arsene-lupin-gentleman-illusionniste.html', true),
('chicago-le-musical', 'Chicago, le Musical', 'Casino de Paris, Paris 9e', null, null, '2h35 avec entracte', 'Jazz, crimes passionnels, robes à franges — le classique de Broadway enfin à Paris. Orchestra live, Cell Block Tango, All That Jazz. On en sort en fredonnant pendant une semaine.', 2, '#F8E8E8', '/assets/spectacles/chicago-le-musical.jpg', 'spectacles/chicago-le-musical.html', true),
('josephine-baker-le-musical', 'Joséphine Baker, le Musical', 'Bobino, Paris 14e', null, null, '1h45', 'Du Missouri aux Folies Bergère, de la Résistance à ses 12 enfants adoptifs — une vie hors du commun racontée avec 12 artistes époustouflants. Un moment de pur bonheur.', 2, '#FFF8E0', '/assets/spectacles/josephine-baker-le-musical.jpg', 'spectacles/josephine-baker-le-musical.html', true),
('the-world-of-banksy', 'The World of Banksy', 'Espace Lafayette-Drouot, Paris 9e', null, '2026-12-31', '~1 heure', '100+ œuvres de Banksy recréées à taille réelle, contextualisées intelligemment. Une petite pépite très chouette dans le 9e. À 12€, le meilleur rapport qualité-prix de Paris.', 2, '#E8E8E8', '/assets/spectacles/the-world-of-banksy.jpg', 'spectacles/the-world-of-banksy.html', true),
('redouane-bougheraba', 'Redouane Bougheraba — Mon Premier Spectacle', 'Dôme de Paris, Paris 15e', '2027-02-03', '2027-02-06', '2h10', 'Du quartier du Panier au Dôme de Paris. On rit beaucoup — et on est surpris d''être ému. Sincère, généreux, personnel. Réservez maintenant pour les meilleures places.', 2, '#E0E8F8', '/assets/spectacles/redouane-bougheraba.jpg', 'spectacles/redouane-bougheraba.html', true),
('muriel-robin-infiniment-robin', 'Muriel Robin dans Infiniment Robin', 'Théâtre Marigny, Paris 8e', '2027-01-06', '2027-02-14', '1h30', 'Muriel Robin ouvre les vannes — fantaisie déjantée, poésie sensible, regard inimitable sur le monde. Elle entre en scène et la salle se détend instantanément. Un cadeau.', 2, '#F8E0EC', '/assets/spectacles/muriel-robin-infiniment-robin.jpg', 'spectacles/muriel-robin-infiniment-robin.html', true),
('garou-solo', 'Garou Solo', 'Casino de Paris, Paris 9e', '2027-01-17', '2027-01-17', '', 'Seul en scène avec son piano et sa guitare — un concert cinématique et intime qui revisite 30 ans de carrière. Après des Bobino complets, date unique au Casino. Réservez vite.', 2, '#E8EEF8', '/assets/spectacles/garou-solo.jpg', 'spectacles/garou-solo.html', true)
on conflict (id) do nothing;
