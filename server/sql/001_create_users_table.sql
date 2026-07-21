USE campuste_db;

CREATE TABLE IF NOT EXISTS users (
    user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    role ENUM(
        'student',
        'recruiter',
        'placement_officer',
        'admin'
    ) NOT NULL,

    account_status ENUM(
        'pending',
        'active',
        'suspended',
        'rejected'
    ) NOT NULL DEFAULT 'pending',

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    last_login_at DATETIME NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_users_role (role),
    INDEX idx_users_status (account_status),
    INDEX idx_users_created_at (created_at)
);