USE campuste_db;

CREATE TABLE IF NOT EXISTS placement_officer_profiles (
    placement_officer_profile_id INT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    user_id INT UNSIGNED NOT NULL UNIQUE,

    phone VARCHAR(30) NOT NULL,

    employee_id VARCHAR(50) NOT NULL UNIQUE,

    designation VARCHAR(100) NOT NULL,

    department VARCHAR(120) NOT NULL,

    institution VARCHAR(180) NOT NULL,

    institution_code VARCHAR(50) NOT NULL,

    location VARCHAR(150) NOT NULL,

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_placement_officer_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_po_institution_code (
        institution_code
    ),

    INDEX idx_po_institution (
        institution
    )
);