CREATE TABLE IF NOT EXISTS notifications (
    notification_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    recipient_user_id INT UNSIGNED NOT NULL,
    actor_user_id INT UNSIGNED NULL,

    category ENUM(
        'application',
        'interview',
        'job',
        'account',
        'system'
    ) NOT NULL DEFAULT 'system',

    notification_type VARCHAR(80) NOT NULL,

    title VARCHAR(180) NOT NULL,
    message VARCHAR(600) NOT NULL,

    action_url VARCHAR(255) NULL,

    reference_type VARCHAR(60) NULL,
    reference_id BIGINT UNSIGNED NULL,

    metadata JSON NULL,

    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_notifications_recipient
        FOREIGN KEY (recipient_user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_notifications_actor
        FOREIGN KEY (actor_user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL,

    INDEX idx_notifications_recipient_created (
        recipient_user_id,
        created_at
    ),

    INDEX idx_notifications_recipient_read (
        recipient_user_id,
        is_read
    ),

    INDEX idx_notifications_reference (
        reference_type,
        reference_id
    ),

    INDEX idx_notifications_category (
        category
    )
);