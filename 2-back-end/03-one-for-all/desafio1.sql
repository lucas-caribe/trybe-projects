DROP DATABASE IF EXISTS SpotifyClone;
CREATE DATABASE SpotifyClone;
USE SpotifyClone;

CREATE TABLE Plan (
  plan_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  value DOUBLE NOT NULL
);

CREATE TABLE Artist (
  artist_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL
);

CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  age TINYINT NOT NULL,
  plan_id INT,
  FOREIGN KEY (plan_id) REFERENCES Plan (plan_id)
);

CREATE TABLE Album (
  album_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  artist_id INT,
  FOREIGN KEY (artist_id) REFERENCES Artist (artist_id)
);

CREATE TABLE Song (
  song_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  album_id INT,
  FOREIGN KEY (album_id) REFERENCES Album (album_id)
);

CREATE TABLE User_Artist (
  user_id INT,
  artist_id INT,
  CONSTRAINT PRIMARY KEY (user_id, artist_id),
  FOREIGN KEY (user_id) REFERENCES User (user_id),
  FOREIGN KEY (artist_id) REFERENCES Artist (artist_id)
);

CREATE TABLE Listening_History (
  user_id INT,
  song_id INT,
  CONSTRAINT PRIMARY KEY (user_id, song_id),
  FOREIGN KEY (user_id) REFERENCES User (user_id),
  FOREIGN KEY (song_id) REFERENCES Song (song_id)
);

INSERT INTO Plan (name, value) VALUES
('gratuito', 0),
('familiar', 7.99),
('universitario', 5.99);

INSERT INTO Artist (name) VALUES
('Walter Phoenix'),
('Peter Strong'),
('Lance Day'),
('Freedie Shannon');

INSERT INTO User (name, age, plan_id) VALUES
('Thati', 23, 1),
('Cintia', 35, 2),
('Bill', 20, 3),
('Roger', 45, 1);

INSERT INTO Album (name, artist_id) VALUES
('Envious', 1),
('Exuberant', 1),
('Hallowed Steam', 2),
('Incandescent', 3),
('Temporary Culture', 4);

INSERT INTO Song (name, album_id) VALUES
('Soul For Us', 1),
('Reflections Of Magic', 1),
('Dance With Her Own', 1),
('Troubles Of My Inner Fire', 2),
('Time Fireworks', 2),
('Magic Circus', 3),
('Honey, So Do I', 3),
('Sweetie, Let\'s Go Wild', 3),
('She Knows', 3),
('Fantasy For Me', 4),
('Celebration Of More', 4),
('Rock His Everything', 4),
('Home Forever', 4),
('Diamond Power', 4),
('Honey, Let\'s Be Silly', 4),
('Thang Of Thunder', 5),
('Words Of Her Life', 5),
('Without My Streets', 5);

INSERT INTO User_Artist (user_id, artist_id) VALUES
(1, 1),
(1, 4),
(1, 3),
(2, 1),
(2, 3),
(3, 2),
(3, 1),
(4, 4);

INSERT INTO Listening_History (user_id, song_id) VALUES
(1, 1),
(1, 6),
(1, 14),
(1, 16),
(2, 13),
(2, 17),
(2, 2),
(2, 15),
(3, 4),
(3, 16),
(3, 6),
(4, 3),
(4, 18),
(4, 11);
