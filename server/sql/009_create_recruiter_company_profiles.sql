USE campuste_db;

CREATE TABLE IF NOT EXISTS recruiter_company_profiles (
    company_profile_id INT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    user_id INT UNSIGNED NOT NULL,

    company_name VARCHAR(150) NOT NULL,

    industry VARCHAR(120) NOT NULL,

    company_size ENUM(
        '1 - 50 Employees',
        '51 - 200 Employees',
        '201 - 500 Employees',
        '501 - 1000 Employees',
        '1000+ Employees'
    ) NOT NULL,

    founded_year SMALLINT UNSIGNED NULL,

    website_url VARCHAR(255) NULL,

    contact_email VARCHAR(150) NOT NULL,

    contact_phone VARCHAR(30) NOT NULL,

    headquarters VARCHAR(180) NOT NULL,

    linkedin_url VARCHAR(255) NULL,

    recruiter_name VARCHAR(150) NOT NULL,

    recruiter_designation VARCHAR(150) NOT NULL,

    company_description TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_recruiter_company_profile_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_recruiter_company_profile_user
        UNIQUE (user_id),

    CONSTRAINT chk_recruiter_company_founded_year
        CHECK (
            founded_year IS NULL
            OR founded_year BETWEEN 1800 AND 2100
        ),

    INDEX idx_recruiter_company_name (
        company_name
    )
);