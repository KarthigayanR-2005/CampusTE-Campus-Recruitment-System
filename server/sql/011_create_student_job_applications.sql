USE campuste_db;

CREATE TABLE IF NOT EXISTS student_job_applications (
    application_id BIGINT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    student_user_id INT UNSIGNED NOT NULL,

    job_id BIGINT UNSIGNED NOT NULL,

    resume_id INT UNSIGNED NULL,

    resume_file_name VARCHAR(255) NOT NULL,

    cover_note TEXT NULL,

    status ENUM(
        'applied',
        'under_review',
        'shortlisted',
        'interview',
        'selected',
        'rejected',
        'withdrawn'
    ) NOT NULL DEFAULT 'applied',

    applied_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    withdrawn_at TIMESTAMP NULL,

    CONSTRAINT fk_application_student
        FOREIGN KEY (student_user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_application_job
        FOREIGN KEY (job_id)
        REFERENCES recruiter_jobs(job_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_application_resume
        FOREIGN KEY (resume_id)
        REFERENCES student_resumes(resume_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT uq_student_job_application
        UNIQUE (
            student_user_id,
            job_id
        ),

    INDEX idx_application_student (
        student_user_id
    ),

    INDEX idx_application_job (
        job_id
    ),

    INDEX idx_application_status (
        status
    )
);