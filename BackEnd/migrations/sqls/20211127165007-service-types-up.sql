CREATE TABLE service_types (
    id SERIAL unique,
    type Varchar(50) PRIMARY KEY
);

INSERT INTO service_types(type) Values('proposal_request');
INSERT INTO service_types(type) Values('cars_check_request');
INSERT INTO service_types(type) Values('nosie_measurement_request');
INSERT INTO service_types(type) Values('course_request');

