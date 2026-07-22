USE campuste_db;

CREATE TABLE IF NOT EXISTS student_profiles (
    student_profile_id INT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    user_id INT UNSIGNED NOT NULL UNIQUE,

    phone VARCHAR(30) NULL,

    date_of_birth DATE NULL,

    gender ENUM(
        'male',
        'female',
        'other',
        'prefer_not_to_say'
    ) NULL,

    roll_number VARCHAR(50) NULL,

    institution VARCHAR(180) NULL,

    degree VARCHAR(100) NULL,

    department VARCHAR(120) NULL,

    year_of_study TINYINT UNSIGNED NULL,

    cgpa DECIMAL(4, 2) NULL,

    graduation_year SMALLINT UNSIGNED NULL,

    city VARCHAR(100) NULL,

    state VARCHAR(100) NULL,

    country VARCHAR(100) NULL,

    linkedin_url VARCHAR(255) NULL,

    github_url VARCHAR(255) NULL,

    portfolio_url VARCHAR(255) NULL,

    profile_summary VARCHAR(2000) NULL,

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_profile_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT chk_student_year
        CHECK (
            year_of_study IS NULL OR
            year_of_study BETWEEN 1 AND 8
        ),

    CONSTRAINT chk_student_cgpa
        CHECK (
            cgpa IS NULL OR
            cgpa BETWEEN 0 AND 10
        ),

    INDEX idx_student_roll_number (
        roll_number
    ),

    INDEX idx_student_department (
        department
    ),

    INDEX idx_student_graduation_year (
        graduation_year
    )
);