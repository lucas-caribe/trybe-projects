DELIMITER $$
CREATE PROCEDURE albuns_do_artista(artistName VARCHAR(150)) 
BEGIN
  SELECT
    Artist.name AS `artista`,
    Album.name AS `album`
  FROM Album
  JOIN Artist USING (artist_id)
  WHERE Artist.name = artistName;
END $$
DELIMITER ;
