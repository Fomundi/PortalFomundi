-- Creando la base de datos
CREATE DATABASE portalfomundi;

-- Utilizando la base de datos
use portalfomundi;

-- Creando la tabla
CREATE TABLE usuariosdb (
  id INT AUTO_INCREMENT,
  username TEXT,
  id_user TEXT,
  nivel INTEGER,
  exp INT,
  discriminator TEXT,
  avatar TEXT,
  pais_ciudad TEXT,
  urlpersonalizada TEXT,
  bio TEXT,
  facebook TEXT,
  twitter TEXT,
  youtube TEXT,
  web TEXT,
  sdiscord TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE bots (
  id INT AUTO_INCREMENT,
  id_bot TEXT,
  id_user TEXT,
  prefix TEXT,
  title TEXT,
  description TEXT,
  category TEXT,
  library TEXT,
  web_bot TEXT,
  soporte TEXT,
  invite TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE category (
  id INT AUTO_INCREMENT,
  cname TEXT,
  PRIMARY KEY(id)
);

  CREATE TABLE library (
  id INT AUTO_INCREMENT,
  lname TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE logros (
  id INT AUTO_INCREMENT,
  nombre TEXT,
  descripcion TEXT,
  categoria TEXT,
  numero_logro TEXT,
  PRIMARY KEY(id)
);
-- para mostrar todas las tablas si uno quiere
SHOW TABLES;

---describir la tabla
describe usuarios;

-- Nivel, puntos, lugros, seguidores