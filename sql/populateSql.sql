-- Table Organisations
INSERT INTO Organisations (siren, nom, domaine, ceo, createdBy, description, adress, siege_social)
VALUES
    (123456789, 'Organisation 1', 'Banque/Assurance', 'CEO 1', 'Created By 1', 'Description 1', 'Adresse 1', 'Siège social 1'),
    (987654321, 'Organisation 2', 'Industrie pharmaceutique', 'CEO 2', 'Created By 2', 'Description 2', 'Adresse 2', 'Siège social 2'),
    (111111111, 'Organisation 3', 'Informatique / Télécoms', 'CEO 3', 'Created By 3', 'Description 3', 'Adresse 3', 'Siège social 3'),
    (222222222, 'Organisation 4', 'Commerce / Distribution', 'CEO 4', 'Created By 4', 'Description 4', 'Adresse 4', 'Siège social 4');
    

-- Table Offres
INSERT INTO Offres (nom, responsable, type_metier, lieu, rythme, salaire, description, status, date, siren, entreprise)
VALUES
    ('Offre 1', 'Responsable 1', 'Type métier 1', 'Lieu 1', 'Rythme 1', 'Salaire 1', 'Description 1', 'pending', '2023-06-11', 123456789, 'Organisation 1'),
    ('Offre 2', 'Responsable 2', 'Type métier 2', 'Lieu 2', 'Rythme 2', 'Salaire 2', 'Description 2', 'accepted', '2023-06-10', 987654321, 'Organisation 2'),
    ('Offre 3', 'Responsable 3', 'Type métier 3', 'Lieu 3', 'Rythme 3', 'Salaire 3', 'Description 3', 'hidden', '2023-06-09', 111111111, 'Organisation 3'),
    ('Offre 4', 'Responsable 4', 'Type métier 4', 'Lieu 4', 'Rythme 4', 'Salaire 4', 'Description 4', 'pending', '2023-06-08', 222222222, 'Organisation 4');