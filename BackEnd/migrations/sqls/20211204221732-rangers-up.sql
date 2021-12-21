CREATE TABLE rangers (
    id SERIAL PRIMARY KEY,
    name Varchar(50),
    email Varchar(50),
    password_digest Varchar,
    phone_number Varchar,
    nationality_id Varchar unique,
    firstTime boolean NOT NULL,
    role Varchar(50),
    create_at TIMESTAMPTZ DEFAULT Now()
);
