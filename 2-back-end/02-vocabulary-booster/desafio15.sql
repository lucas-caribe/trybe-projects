DELIMITER $$
CREATE PROCEDURE buscar_media_por_cargo(IN role VARCHAR(35))
BEGIN
  SELECT ROUND(AVG(SALARY), 2) AS `Média salarial`
  FROM hr.employees AS e
  JOIN hr.jobs AS j ON j.JOB_ID = e.JOB_ID
  WHERE j.JOB_TITLE = role
  GROUP BY e.JOB_ID;
END $$
DELIMITER ;
