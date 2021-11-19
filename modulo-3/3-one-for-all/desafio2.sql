CREATE VIEW estatisticas_musicais AS SELECT
  COUNT(*) AS `cancoes`,
  (SELECT COUNT(*) FROM Artist) AS `artistas`,
  (SELECT COUNT(*) FROM Album) AS `albuns`
FROM Song;
