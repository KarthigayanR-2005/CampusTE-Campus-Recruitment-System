USE campuste_db;

CREATE TABLE IF NOT EXISTS student_skills (
    skill_id INT UNSIGNED
        PRIMARY KEY AUTO_INCREMENT,

    user_id INT UNSIGNED NOT NULL,

    skill_name VARCHAR(100) NOT NULL,

    proficiency ENUM(
        'beginner',
        'intermediate',
        'advanced',
        'expert'
    ) NOT NULL DEFAULT 'beginner',

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_skill_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_student_skill_name
        UNIQUE (user_id, skill_name),

    INDEX idx_student_skills_user (
        user_id
    ),

    INDEX idx_student_skills_proficiency (
        proficiency
    )
);