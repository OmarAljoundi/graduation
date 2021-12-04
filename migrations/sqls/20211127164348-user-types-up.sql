CREATE TABLE user_types (
    id SERIAL unique,
    type Varchar(50) PRIMARY KEY
);

INSERT INTO user_types(type) Values('admin');
INSERT INTO user_types(type) Values('ranger');
INSERT INTO user_types(type) Values('citizen');