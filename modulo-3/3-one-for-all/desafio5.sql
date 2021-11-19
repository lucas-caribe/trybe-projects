CREATE VIEW top_2_hits_do_momento AS
SELECT
  Song.name AS `cancao`,
  COUNT(*) AS `reproducoes`
FROM Listening_History
JOIN Song USING (song_id)
GROUP BY song_id
ORDER BY `reproducoes` DESC, `cancao`
LIMIT 2;
