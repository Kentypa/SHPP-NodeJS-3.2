INSERT INTO "user" (email, password, role)
SELECT 'admin@gmail.com', 'admin', 2
WHERE NOT EXISTS (
    SELECT 1 FROM "user" WHERE role = 2
);