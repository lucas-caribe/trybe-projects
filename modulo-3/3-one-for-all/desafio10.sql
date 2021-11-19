DELIMITER $$
CREATE FUNCTION quantidade_musicas_no_historico(userId INT)
RETURNS INT READS SQL DATA
BEGIN
  DECLARE musics INT;
  
  SELECT COUNT(*) FROM Listening_History
  JOIN User USING (user_id)
  WHERE User.user_id = userId
  GROUP BY user_id
  INTO musics;
  
  RETURN musics;
END $$
DELIMITER ;

SELECT quantidade_musicas_no_historico(2);
