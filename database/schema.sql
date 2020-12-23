DROP DATABASE IF EXISTS passport_demo;
CREATE DATABASE passport_demo;

DROP DATABASE IF EXISTS my_stream;

CREATE DATABASE my_stream;

USE my_stream;

CREATE TABLE watched (
	title VARCHAR(140) NOT NULL PRIMARY KEY,
    year INTEGER,
    rated VARCHAR(10),
	genre VARCHAR(140),
    plot VARCHAR(1000),
    poster VARCHAR(300),
    rating VARCHAR(400),
    type VARCHAR(30), 
    user VARCHAR (150)
);

CREATE TABLE to_watch (
	title VARCHAR(140) NOT NULL PRIMARY KEY,
    year INTEGER,
    rated VARCHAR(10),
	genre VARCHAR(140),
    plot VARCHAR(1000),
    poster VARCHAR(300),
    rating VARCHAR(400),
    type VARCHAR(30),
    user VARCHAR (150)
);

CREATE TABLE users (
	user_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) NOT NULL
);


