CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name Varchar(50),
    b_date Date,
    email Varchar(50),
    gender Varchar(50),
    password_digest Varchar,
    phone_number Varchar,
    nationality_id Varchar unique,
    status varchar DEFAULT 'not vertifiy',
    create_at TIMESTAMPTZ DEFAULT Now()
);
