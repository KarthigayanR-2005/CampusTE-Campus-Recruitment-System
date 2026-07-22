USE campuste_db;

CREATE TABLE IF NOT EXISTS student_certifications (
    certification_id INT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    user_id INT UNSIGNED NOT NULL,

    certification_name VARCHAR(150) NOT NULL,

    issuing_organization VARCHAR(150) NOT NULL,

    credential_id VARCHAR(120) NULL,

    credential_url VARCHAR(255) NULL,

    issue_date DATE NOT NULL,

    expiry_date DATE NULL,

    does_not_expire BOOLEAN NOT NULL DEFAULT FALSE,

    description TEXT NULL,

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_certification_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_student_certification
        UNIQUE (
            user_id,
            certification_name,
            issuing_organization
        ),

    CONSTRAINT chk_certification_expiry
        CHECK (
            (
                does_not_expire = TRUE
                AND expiry_date IS NULL
            )
            OR
            (
                does_not_expire = FALSE
                AND expiry_date IS NOT NULL
                AND expiry_date >= issue_date
            )
        ),

    INDEX idx_student_certifications_user (
        user_id
    ),

    INDEX idx_student_certifications_issue_date (
        issue_date
    )
);