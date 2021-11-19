select submitted_date
from northwind.purchase_orders
where DATE(submitted_date) = '2006-04-26';
