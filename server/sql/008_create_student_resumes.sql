USE campuste_db;

CREATE TABLE IF NOT EXISTS student_resumes (
    resume_id INT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    user_id INT UNSIGNED NOT NULL,

    original_file_name VARCHAR(255) NOT NULL,

    stored_file_name VARCHAR(255) NOT NULL,

    file_path VARCHAR(500) NOT NULL,

    mime_type VARCHAR(100) NOT NULL
        DEFAULT 'application/pdf',

    file_size INT UNSIGNED NOT NULL,

    uploaded_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_resume_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_student_resume_user
        UNIQUE (user_id),

    CONSTRAINT chk_student_resume_size
        CHECK (file_size > 0),

    INDEX idx_student_resumes_user (
        user_id
    )
);