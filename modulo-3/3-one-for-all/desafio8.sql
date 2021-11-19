DELIMITER $$
CREATE TRIGGER trigger_usuario_delete
  BEFORE DELETE ON User
  FOR EACH ROW
BEGIN
  DELETE FROM Listening_History WHERE user_id = OLD.user_id;
  DELETE FROM User_Artist WHERE USER_ID = OLD.user_id;
END $$
DELIMITER ;

DELETE FROM User WHERE user_id = 1;
