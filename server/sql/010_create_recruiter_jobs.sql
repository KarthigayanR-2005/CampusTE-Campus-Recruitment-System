USE campuste_db;

CREATE TABLE IF NOT EXISTS recruiter_jobs (
    job_id BIGINT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    recruiter_user_id INT UNSIGNED NOT NULL,

    job_title VARCHAR(180) NOT NULL,

    department VARCHAR(120) NULL,

    employment_type ENUM(
        'Full-time',
        'Part-time',
        'Internship',
        'Contract',
        'Graduate Trainee'
    ) NOT NULL DEFAULT 'Full-time',

    experience_level ENUM(
        'Fresher',
        '0 - 1 Year',
        '1 - 2 Years',
        '2 - 4 Years',
        '4+ Years'
    ) NOT NULL DEFAULT 'Fresher',

    salary_min DECIMAL(12, 2) NULL,
    salary_max DECIMAL(12, 2) NULL,

    city VARCHAR(120) NULL,

    country VARCHAR(120)
        NOT NULL DEFAULT 'India',

    work_mode ENUM(
        'On-site',
        'Hybrid',
        'Remote'
    ) NOT NULL DEFAULT 'On-site',

    openings INT UNSIGNED
        NOT NULL DEFAULT 1,

    application_deadline DATE NULL,

    minimum_cgpa DECIMAL(4, 2)
        NOT NULL DEFAULT 6.50,

    required_skills JSON NULL,
    preferred_skills JSON NULL,
    eligible_branches JSON NULL,
    eligible_graduation_years JSON NULL,

    job_description TEXT NULL,
    responsibilities TEXT NULL,
    candidate_requirements TEXT NULL,

    status ENUM(
        'draft',
        'active',
        'closed'
    ) NOT NULL DEFAULT 'draft',

    published_at TIMESTAMP NULL,
    closed_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_recruiter_jobs_user
        FOREIGN KEY (recruiter_user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_recruiter_jobs_openings
        CHECK (openings >= 1),

    CONSTRAINT chk_recruiter_jobs_cgpa
        CHECK (
            minimum_cgpa >= 0
            AND minimum_cgpa <= 10
        ),

    CONSTRAINT chk_recruiter_jobs_salary
        CHECK (
            salary_min IS NULL
            OR salary_max IS NULL
            OR salary_max >= salary_min
        ),

    INDEX idx_recruiter_jobs_user (
        recruiter_user_id
    ),

    INDEX idx_recruiter_jobs_status (
        status
    ),

    INDEX idx_recruiter_jobs_deadline (
        application_deadline
    )
);