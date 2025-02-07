CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE "User" (
    userId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL
);
