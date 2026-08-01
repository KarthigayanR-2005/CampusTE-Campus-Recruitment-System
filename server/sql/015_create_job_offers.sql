CREATE TABLE IF NOT EXISTS job_offers (
    offer_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    application_id BIGINT UNSIGNED NOT NULL,
    recruiter_user_id INT UNSIGNED NOT NULL,
    student_user_id INT UNSIGNED NOT NULL,
    job_id BIGINT UNSIGNED NOT NULL,

    designation VARCHAR(150) NOT NULL,

    salary_amount DECIMAL(12, 2) NOT NULL,
    currency_code CHAR(3) NOT NULL DEFAULT 'INR',
    salary_period ENUM(
        'annual',
        'monthly'
    ) NOT NULL DEFAULT 'annual',

    joining_date DATE NOT NULL,
    work_location VARCHAR(200) NOT NULL,
    offer_expiry_date DATE NOT NULL,

    employment_type VARCHAR(80) NULL,
    probation_period VARCHAR(100) NULL,
    terms TEXT NULL,

    status ENUM(
        'draft',
        'sent',
        'accepted',
        'declined',
        'withdrawn',
        'expired'
    ) NOT NULL DEFAULT 'draft',

    sent_at TIMESTAMP NULL,
    responded_at TIMESTAMP NULL,
    accepted_at TIMESTAMP NULL,
    declined_at TIMESTAMP NULL,
    withdrawn_at TIMESTAMP NULL,

    offer_letter_original_name VARCHAR(255) NULL,
    offer_letter_stored_name VARCHAR(255) NULL,
    offer_letter_mime_type VARCHAR(120) NULL,
    offer_letter_size_bytes BIGINT UNSIGNED NULL,
    offer_letter_path VARCHAR(500) NULL,

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_job_offer_application
        UNIQUE (application_id),

    CONSTRAINT fk_job_offer_application
        FOREIGN KEY (application_id)
        REFERENCES student_job_applications(application_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_job_offer_recruiter
        FOREIGN KEY (recruiter_user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_job_offer_student
        FOREIGN KEY (student_user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_job_offer_job
        FOREIGN KEY (job_id)
        REFERENCES recruiter_jobs(job_id)
        ON DELETE CASCADE,

    INDEX idx_job_offer_recruiter_status (
        recruiter_user_id,
        status
    ),

    INDEX idx_job_offer_student_status (
        student_user_id,
        status
    ),

    INDEX idx_job_offer_expiry (
        offer_expiry_date,
        status
    )
);

CREATE TABLE IF NOT EXISTS job_offer_status_history (
    history_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    offer_id BIGINT UNSIGNED NOT NULL,
    changed_by_user_id INT UNSIGNED NULL,

    previous_status ENUM(
        'draft',
        'sent',
        'accepted',
        'declined',
        'withdrawn',
        'expired'
    ) NULL,

    new_status ENUM(
        'draft',
        'sent',
        'accepted',
        'declined',
        'withdrawn',
        'expired'
    ) NOT NULL,

    note VARCHAR(1000) NULL,

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_offer_history_offer
        FOREIGN KEY (offer_id)
        REFERENCES job_offers(offer_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_offer_history_user
        FOREIGN KEY (changed_by_user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL,

    INDEX idx_offer_history_offer (
        offer_id,
        created_at
    )
);