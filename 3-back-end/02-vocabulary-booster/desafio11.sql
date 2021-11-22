SELECT
  c1.ContactName AS `Nome`,
  c1.Country AS `País`,
  `Compatriot`.`count` - 1 AS `Número de compatriotas`
FROM w3schools.customers AS c1
JOIN (
  SELECT
    Country,
    count(*) AS `count`
  FROM w3schools.customers AS c2
  GROUP BY Country HAVING `count` > 1
) AS `Compatriot` ON `Compatriot`.Country = c1.Country
ORDER BY c1.ContactName;
