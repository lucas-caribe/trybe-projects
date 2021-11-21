CREATE VIEW cancoes_premium AS
SELECT
  Song.name AS `nome`,
  COUNT(*) AS `reproducoes`
FROM Listening_History
JOIN Song USING (song_id)
JOIN User USING (user_id)
WHERE User.plan_id <> 1
GROUP BY Song.name
ORDER BY Song.name;
