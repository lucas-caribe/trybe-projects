CREATE VIEW perfil_artistas AS
SELECT
  Artist.name AS `artista`,
  Album.name AS `album`,
  (
    SELECT COUNT(*) FROM User_Artist
    GROUP BY artist_id
    HAVING artist_id = Artist.artist_id
  ) AS `seguidores`
FROM Album
JOIN Artist USING (artist_id)
ORDER BY `seguidores` DESC, `artista`, `album`;
