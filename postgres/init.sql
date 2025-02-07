CREATE TABLE "User" (
    userId serial PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL
);
