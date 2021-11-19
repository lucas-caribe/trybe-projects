CREATE VIEW faturamento_atual AS
SELECT
  FORMAT(MIN(Plan.value), 2) AS `faturamento_minimo`,
  FORMAT(MAX(Plan.value), 2) AS `faturamento_maximo`,
  FORMAT(AVG(Plan.value), 2) AS `faturamento_medio`,
  FORMAT(SUM(Plan.value), 2) AS `faturamento_total`
FROM User
JOIN Plan USING (plan_id);
