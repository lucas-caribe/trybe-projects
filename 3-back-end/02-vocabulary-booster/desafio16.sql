DELIMITER $$
CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario(email VARCHAR(25))
RETURNS INT READS SQL DATA
BEGIN
  DECLARE job_count INT;

  SELECT COUNT(*) FROM hr.job_history AS jh
  JOIN hr.employees AS e ON e.EMPLOYEE_ID = jh.EMPLOYEE_ID
  WHERE e.EMAIL = email
  GROUP BY jh.EMPLOYEE_ID
  INTO job_count;

  RETURN job_count;
END $$
DELIMITER ;
