-- setting up gitty database in mysql

CREATE DATABASE IF NOT EXISTS gittydb;
CREATE USER IF NOT EXISTS 'gitty'@'localhost' IDENTIFIED BY 'gitty2024';
GRANT ALL PRIVILEGES ON gittydb.* TO 'gitty'@'localhost';
GRANT SELECT ON perfomance_schema.* TO 'gitty'@'localhost';
FLUSH PRIVILEGES
