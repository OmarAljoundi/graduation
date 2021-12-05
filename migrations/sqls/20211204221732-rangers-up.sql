CREATE TABLE rangers (
    id SERIAL PRIMARY KEY,
    name Varchar(50),
    password_digest Varchar,
    phone_number Varchar,
    nationality_id Varchar unique,
    create_at TIMESTAMPTZ DEFAULT Now()
);
