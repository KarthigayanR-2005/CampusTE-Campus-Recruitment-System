USE campuste_db;

CREATE TABLE IF NOT EXISTS student_experiences (
    experience_id INT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    user_id INT UNSIGNED NOT NULL,

    company_name VARCHAR(150) NOT NULL,

    job_title VARCHAR(150) NOT NULL,

    employment_type ENUM(
        'internship',
        'full_time',
        'part_time',
        'freelance',
        'contract',
        'volunteer',
        'apprenticeship',
        'other'
    ) NOT NULL,

    location VARCHAR(150) NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE NULL,

    currently_working BOOLEAN NOT NULL DEFAULT FALSE,

    description TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_experience_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_student_experience
        UNIQUE (
            user_id,
            company_name,
            job_title,
            start_date
        ),

    CONSTRAINT chk_student_experience_dates
        CHECK (
            (
                currently_working = TRUE
                AND end_date IS NULL
            )
            OR
            (
                currently_working = FALSE
                AND end_date IS NOT NULL
                AND end_date >= start_date
            )
        ),

    INDEX idx_student_experiences_user (
        user_id
    ),

    INDEX idx_student_experiences_start_date (
        start_date
    )
);