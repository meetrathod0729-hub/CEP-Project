CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,

    token_number VARCHAR(20) UNIQUE NOT NULL,

    patient_id INTEGER NOT NULL,
    hospital_id INTEGER NOT NULL,

    priority VARCHAR(10) CHECK (priority IN ('RED', 'YELLOW', 'GREEN')) NOT NULL,

    status VARCHAR(20) CHECK (status IN ('WAITING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')) DEFAULT 'WAITING',

    estimated_wait_time INTEGER DEFAULT 0,

    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    CONSTRAINT fk_hospital FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
);