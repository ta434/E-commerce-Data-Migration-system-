# ECOMMERCE_MIGRATION

A data-migration toolkit designed to facilitate transferring and validating data between MongoDB and PostgreSQL for e-commerce datasets. The repository contains a set of Python scripts, SQL schema designs, and MongoDB data utilities to support end-to-end migration, backups, validation, and basic analytics dashboards.

## Quick Overview
- Language mix: Python, JavaScript (MongoDB scripts), and SQL.
- Data domains covered: users, products, categories, orders, and reviews.
- Supports a MongoDB-to-PostgreSQL migration workflow, including schema design, data population, and validation.
- Lightweight backups and a basic analytics dashboard to compare migrations before/after.

> Note: This repository is organized into logical folders that group related migration concerns. Each folder contains its own scripts and, in many cases, its own README with usage instructions. The top-level README documents overall structure and how to navigate the project.

## Repository Layout
The project code is primarily located in the `ECOMMERCE_MIGRATION` directory, with the following sub-folders:

```text
ECOMMERCE_MIGRATION/
├── 1_mongodb_data
├── 2_postgresql_design
├── 3_migration_scripts
├── 4_backup_system
├── 5_validation_reports
├── 6_business_dashboard
```

In this repository, there is also a nested clone in `E-commerce-Data-Migration-system-` (which contains a separate `.git` folder). The practical working copy for migration tasks is the `ECOMMERCE_MIGRATION` subdirectory.

```
E-commerce-Data-Migration-system-
└── .git/ (git metadata, not used for the active migration tasks)
```

If you clone or pull this project, ensure you operate inside the `ECOMMERCE_MIGRATION/` folder to work with the scripts and data for migration tasks.

## Folder Details
Below is a concise description of what each folder contains and its role in the migration workflow.

### 1_mongodb_data
Purpose: Provide initial MongoDB data scripts for seeding or testing the migration workflow.
Notable files:
- `01_create_database.js`
- `02_insert_categories.js`
- `03_insert_users.js`
- `04_insert_products.js`
- `05_insert_orders.js`
- `06_insert_reviews.js`
- `07_verify_data.js`

### 2_postgresql_design
Purpose: SQL design and schema definitions for PostgreSQL side of the migration.
Notable files:
- `01_create_database.sql`
- `02_schema_design.sql`
- `03_sample_queries.sql`

### 3_migration_scripts
Purpose: Core Python-based migration scripts that orchestrate data transfer and transformation between MongoDB and PostgreSQL.
Notable files:
- `migration_setup.py`
- `migrate_users.py`
- `migrate_reviews.py`
- `migrate_products.py`
- `migrate_orders.py`
- `migrate_categories.py`

### 4_backup_system
Purpose: Utilities for backing up MongoDB data and restoring as needed.
Notable files:
- `backup_mongodb.py`
- `restore_mongodb.py`
- `mongodb_backups/` (backup archives, e.g. `mongodb_backup_YYYYMMDD_HHMMSS.json`)

### 5_validation_reports
Purpose: Validate data integrity and migration fidelity after transfer.
Notable files:
- `validate_migration.py`

### 6_business_dashboard
Purpose: Lightweight analytics to compare migration results and performance.
Notable files:
- `performance_comparison.py`
- `business_analytics.py`
```

## How to Get Started (High-Level)
1. Inspect folder contents and read any per-folder README for environment setup and run instructions.
2. Start with 1_mongodb_data to understand data layout and seed data if needed.
3. Move to 2_postgresql_design to review the target schema design.
4. Use 3_migration_scripts in order to perform actual migrations for users, categories, products, orders, and reviews.
5. Use 4_backup_system to backup and restore data as needed during testing.
6. Validate results with 5_validation_reports.
7. If needed, explore 6_business_dashboard for basic analytics on the migration outcomes.

> Each folder typically includes its own README with environment requirements and exact run commands. Follow those for precise steps.

## Contributing
- Create issues or pull requests to propose enhancements or fixes.
- Follow the repository's conventions and keep changes focused to the migration tooling.
- Run basic sanity checks locally before submitting PRs.

## License
- This project does not specify a license in this readme. Please check the repository root for licensing information or contact the project maintainer for guidance.

## Contact & Support
- If you need help, open an issue or reach out to the project maintainer.
