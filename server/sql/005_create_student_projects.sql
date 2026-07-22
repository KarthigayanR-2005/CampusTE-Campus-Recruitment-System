USE campuste_db;

CREATE TABLE IF NOT EXISTS student_projects (
    project_id INT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    user_id INT UNSIGNED NOT NULL,

    project_title VARCHAR(150) NOT NULL,

    description TEXT NOT NULL,

    technologies JSON NOT NULL,

    github_url VARCHAR(255) NULL,

    live_demo_url VARCHAR(255) NULL,

    start_date DATE NULL,

    end_date DATE NULL,

    project_status ENUM(
        'planned',
        'in_progress',
        'completed',
        'on_hold'
    ) NOT NULL DEFAULT 'in_progress',

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_project_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_student_project_title
        UNIQUE (user_id, project_title),

    CONSTRAINT chk_student_project_dates
        CHECK (
            start_date IS NULL
            OR end_date IS NULL
            OR end_date >= start_date
        ),

    INDEX idx_student_projects_user (
        user_id
    ),

    INDEX idx_student_projects_status (
        project_status
    )
);