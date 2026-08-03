USE campuste_db;

ALTER TABLE recruiter_company_profiles
    ADD COLUMN company_logo_original_name VARCHAR(255) NULL
        AFTER company_description,

    ADD COLUMN company_logo_stored_name VARCHAR(255) NULL
        AFTER company_logo_original_name,

    ADD COLUMN company_logo_mime_type VARCHAR(100) NULL
        AFTER company_logo_stored_name,

    ADD COLUMN company_logo_size_bytes BIGINT UNSIGNED NULL
        AFTER company_logo_mime_type,

    ADD COLUMN company_logo_path VARCHAR(500) NULL
        AFTER company_logo_size_bytes,

    ADD COLUMN authorized_signature_original_name VARCHAR(255) NULL
        AFTER company_logo_path,

    ADD COLUMN authorized_signature_stored_name VARCHAR(255) NULL
        AFTER authorized_signature_original_name,

    ADD COLUMN authorized_signature_mime_type VARCHAR(100) NULL
        AFTER authorized_signature_stored_name,

    ADD COLUMN authorized_signature_size_bytes BIGINT UNSIGNED NULL
        AFTER authorized_signature_mime_type,

    ADD COLUMN authorized_signature_path VARCHAR(500) NULL
        AFTER authorized_signature_size_bytes;