CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    age TEXT NOT NULL,
    phone INTEGER NOT NULL,
    email TEXT NOT NULL,
    document INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS cars(
    id INTEGER PRIMARY KEY NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    kms INTEGER NOT NULL,
    color TEXT NOT NULL,
    ac TEXT NOT NULL,
    passengers INTEGER NOT NULL,
    transmission TEXT NOT NULL,
    picture TEXT NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS rents(
id INTEGER PRIMARY KEY NOT NULL,
fk_car TEXT REFERENCES cars(id),
fk_user TEXT REFERENCES users(id),
startDate TEXT TEXT NOT NULL,
finishDate TEXT NOT NULL,
totalDays NUMBER NOT NULL
);