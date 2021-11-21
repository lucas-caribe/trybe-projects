CREATE VIEW top_3_artistas AS
SELECT
  Artist.name AS `artista`,
  COUNT(*) AS `seguidores` 
FROM User_Artist 
JOIN Artist USING (artist_id)
GROUP BY artist_id
ORDER BY `seguidores` DESC, `artista`
LIMIT 3;
