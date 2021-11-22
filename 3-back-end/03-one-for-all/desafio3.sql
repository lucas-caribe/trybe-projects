CREATE VIEW historico_reproducao_usuarios AS
SELECT 
  User.name AS `usuario`,
  Song.name AS `nome`
FROM Listening_History
JOIN User USING (user_id) JOIN Song USING (song_id)
ORDER BY `usuario`, `nome`;
