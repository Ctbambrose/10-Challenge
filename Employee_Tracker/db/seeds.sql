INSERT INTO department (name)
VALUES ('CareAware Upgrade Center'),
       ('CareAware Consulting'),
       ('CareAware UCIT');


INSERT INTO role (title, salary, department_id)
VALUES ('Senior Director', 100000, 1),
       ('Director', 90000, 1),
       ('Consulting Manager', 75000, 2),
       ('UCIT Manager', 75000, 2),
       ('Technology Architect', 70000, 3),
       ('Senior System Engineer', 60000, 3),
       ('System Engineer', 50000, 3),
       ('Delivery Consultant', 45000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alma', 'Anthony', 1, NULL),
('Evangeline', 'Middleton', 2, 1),
('Luqman', 'Roberts', 3, 2),
('Deacon', 'Kelley', 4, 2),
('Callum', 'Summers', 5, 4),
('Elmer', 'Mclean', 6, 4),
('Courtney', 'Woodard', 6, 4),
('Salma', 'Beasley', 7, 4),
('Abraham', 'Gross', 7, 4),
('Zeeshan', 'Chaney', 7, 4),
('Maisha', 'Barber', 8, 3),
('Dawid', 'Greene', 8, 3),
('Hiba', 'Mendez', 8, 3),
('Shane', 'Boyer', 8, 3),
('Arran', 'Beasley', 8, 3),
('Blake', 'Baker', 8, 3),
('Edie', 'Hahn', 8, 3),
('Raja', 'Nunez', 8, 3),
('Abdul', 'Haas', 8, 3);