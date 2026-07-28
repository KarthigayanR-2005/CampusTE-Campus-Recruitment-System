CREATE TABLE IF NOT EXISTS recruiter_saved_candidates (
    saved_candidate_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    recruiter_user_id INT UNSIGNED NOT NULL,
    student_user_id INT UNSIGNED NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_saved_candidate_recruiter
        FOREIGN KEY (recruiter_user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_saved_candidate_student
        FOREIGN KEY (student_user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_recruiter_saved_candidate
        UNIQUE (
            recruiter_user_id,
            student_user_id
        ),

    INDEX idx_saved_candidate_recruiter (
        recruiter_user_id
    ),

    INDEX idx_saved_candidate_student (
        student_user_id
    )
);

CREATE TABLE IF NOT EXISTS recruiter_candidate_invitations (
    invitation_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    recruiter_user_id INT UNSIGNED NOT NULL,
    student_user_id INT UNSIGNED NOT NULL,
    job_id BIGINT UNSIGNED NOT NULL,

    message VARCHAR(1000) NULL,

    status ENUM(
        'sent',
        'accepted',
        'declined'
    ) NOT NULL DEFAULT 'sent',

    invited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP NULL,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_candidate_invitation_recruiter
        FOREIGN KEY (recruiter_user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_candidate_invitation_student
        FOREIGN KEY (student_user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_candidate_invitation_job
        FOREIGN KEY (job_id)
        REFERENCES recruiter_jobs(job_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_candidate_invitation
        UNIQUE (
            recruiter_user_id,
            student_user_id,
            job_id
        ),

    INDEX idx_candidate_invitation_student (
        student_user_id,
        status
    ),

    INDEX idx_candidate_invitation_recruiter (
        recruiter_user_id,
        invited_at
    )
);