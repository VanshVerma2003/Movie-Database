
CREATE DATABASE IF NOT EXISTS movie_database;
USE movie_database;

-- Single Table: MOVIES
CREATE TABLE movies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    director VARCHAR(100),
    genre VARCHAR(50),
    year INT,
    rating DECIMAL(3,1)
);

-- Index for search
CREATE INDEX idx_title ON movies(title);

-- Sample Data
INSERT INTO movies (title, director, genre, year, rating) VALUES 
('1920', 'Vikram Bhatt', 'Horror', 2008, 8.8),
('Devdas', ' Sanjay Leela Bhansali', 'Romance', 2002, 9.0),
('Titanic', 'James Cameron', 'Romance', 1997, 7.9),
('Gangs of Wasseypur', 'Anurag Kashyap', 'Action', 2012, 7.8),
('Singham', 'Rohit Shetty', 'Drama', 2011, 8.9),
('RRR', 'SS Rajamoli', 'Action', 2022, 8.9);

