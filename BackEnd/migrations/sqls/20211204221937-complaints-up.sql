CREATE TABLE complaints (
    id SERIAL PRIMARY KEY,
    location point,
    image varchar,
    description varchar,
    nearest_attraction varchar,
    public boolean,
    place_name varchar,
    status varchar DEFAULT 'Needs Approval',
    create_at TIMESTAMPTZ DEFAULT Now(),
    user_id bigint REFERENCES users(id) ON DELETE CASCADE,
    closedBy_id bigint REFERENCES rangers(id) ON DELETE CASCADE
);