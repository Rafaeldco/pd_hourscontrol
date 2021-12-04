CREATE DATABASE hours_control;

DROP TABLE IF EXISTS squad CASCADE;

CREATE TABLE squad (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL
 );

DROP TABLE IF EXISTS usuario CASCADE;

CREATE TABLE usuario (
  id serial PRIMARY KEY,
  name varchar(50) NOT NULL,
  user_estimated_hours int NOT NULL,
  squad_id int REFERENCES squad(id) NOT NULL
 );

DROP TABLE IF EXISTS report CASCADE;

CREATE TABLE report (
  id serial PRIMARY KEY,
  description text NOT NULL,
  user_id int REFERENCES usuario(id) NOT NULL,
  spent_hours int NOT NULL,
  created_at date DEFAULT CURRENT_TIMESTAMP
);