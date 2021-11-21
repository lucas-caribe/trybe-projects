SELECT Country AS `País`FROM w3schools.suppliers UNION
SELECT Country As `País` FROM w3schools.customers 
GROUP BY `País`
ORDER BY `País`
LIMIT 5;
