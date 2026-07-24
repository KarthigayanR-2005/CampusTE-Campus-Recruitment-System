USE campuste_db;

ALTER TABLE student_job_applications
    ADD COLUMN interview_date DATE NULL
        AFTER withdrawn_at,

    ADD COLUMN interview_time TIME NULL
        AFTER interview_date,

    ADD COLUMN interview_mode VARCHAR(60) NULL
        AFTER interview_time,

    ADD COLUMN interviewer_name VARCHAR(150) NULL
        AFTER interview_mode,

    ADD COLUMN interview_details VARCHAR(500) NULL
        AFTER interviewer_name,

    ADD COLUMN status_updated_by_user_id INT UNSIGNED NULL
        AFTER interview_details,

    ADD COLUMN status_updated_at TIMESTAMP NULL
        AFTER status_updated_by_user_id,

    ADD CONSTRAINT fk_application_status_updated_by
        FOREIGN KEY (status_updated_by_user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS application_status_history (
    history_id BIGINT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    application_id BIGINT UNSIGNED NOT NULL,

    changed_by_user_id INT UNSIGNED NULL,

    previous_status ENUM(
        'applied',
        'under_review',
        'shortlisted',
        'interview',
        'selected',
        'rejected',
        'withdrawn'
    ) NULL,

    new_status ENUM(
        'applied',
        'under_review',
        'shortlisted',
        'interview',
        'selected',
        'rejected',
        'withdrawn'
    ) NOT NULL,

    note VARCHAR(1000) NULL,

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_status_history_application
        FOREIGN KEY (application_id)
        REFERENCES student_job_applications(application_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_status_history_user
        FOREIGN KEY (changed_by_user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    INDEX idx_status_history_application (
        application_id
    ),

    INDEX idx_status_history_created (
        created_at
    )
);