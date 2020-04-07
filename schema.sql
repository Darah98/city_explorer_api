DROP TABLE IF EXISTS cities;
CREATE TABLE cities(
    id SERIAL PRIMARY KEY,
    city_name VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7)

);
-- INSERT INTO cities(city_name) VALUES ('Amman');