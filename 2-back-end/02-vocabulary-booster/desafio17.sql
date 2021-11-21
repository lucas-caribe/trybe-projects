DELIMITER $$
CREATE TRIGGER trigger_order_insert
  BEFORE INSERT ON w3schools.orders
  FOR EACH ROW
BEGIN
  SET NEW.OrderDate = NOW();
END $$
DELIMITER ;
