CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    age_group Varchar(50),
    entity_name Varchar(50),
    expected_audience int,
    is_company boolean,
    notes Varchar,
    number_of_cars int,
    service_date Date,
    service_detalis Varchar,
    status varchar DEFAULT 'pending',
    create_at TIMESTAMPTZ DEFAULT Now(),
    service_type Varchar REFERENCES service_types(type),
    user_id bigint REFERENCES users(id) ON DELETE CASCADE
);

