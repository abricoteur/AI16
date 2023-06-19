-- Table Organisations
INSERT INTO Organisations (siren, nom, domaine, ceo, createdBy, description, adress, siege_social)
VALUES
    (123456789, 'Organisation 1', 'Domaine 1', 'CEO 1', 'Created By 1', 'Description 1', 'Adresse 1', 'Siège social 1'),
    (987654321, 'Organisation 2', 'Domaine 2', 'CEO 2', 'Created By 2', 'Description 2', 'Adresse 2', 'Siège social 2'),
    (111111111, 'Organisation 3', 'Domaine 3', 'CEO 3', 'Created By 3', 'Description 3', 'Adresse 3', 'Siège social 3'),
    (222222222, 'Organisation 4', 'Domaine 4', 'CEO 4', 'Created By 4', 'Description 4', 'Adresse 4', 'Siège social 4');
    
    -- Table Utilisateurs
INSERT INTO Utilisateurs (email, nom, mdp, prenom, tel, role, id_orga)
VALUES
    ('user1@example.com', 'Nom 1', 'mdp1', 'Prénom 1', '',  'Recruteur', 123456789),
    ('user2@example.com', 'Nom 2', 'mdp2', 'Prénom 2', '', 'Candidat', 987654321),
    ('user3@example.com', 'Nom 3', 'mdp3', 'Prénom 3', '',  'Administrateur', 111111111),
    ('user4@example.com', 'Nom 4', 'mdp4', 'Prénom 4', '', 'Candidat', 222222222);


-- Table demandes_creation_organisation
INSERT INTO Demandes_Creation_Organisation (requester_id, status, date, message, object, siren, nom, domaine, siege_social)
VALUES
    ('user1@example.com', 'pending', '2023-06-11', 'Message 1', 'Object 1', 123456789, 'Organisation 1', 'Domaine 1', 'Siège social 1'),
    ('user2@example.com', 'accepted', '2023-06-10', 'Message 2', 'Object 2', 987654321, 'Organisation 2', 'Domaine 2', 'Siège social 2'),
    ('user2@example.com', 'rejected', '2023-06-09', 'Message 3', 'Object 3', 111111111, 'Organisation 3', 'Domaine 3', 'Siège social 3'),
    ('user1@example.com', 'pending', '2023-06-08', 'Message 4', 'Object 4', 222222222, 'Organisation 4', 'Domaine 4', 'Siège social 4');

-- Table Offres
INSERT INTO Offres (nom, responsable, type_metier, lieu, rythme, salaire, description, status, date, liste_piece, siren)
VALUES
    ('Offre 1', 'Responsable 1', 'Type métier 1', 'Lieu 1', 'Rythme 1', 'Salaire 1', 'Description 1', 'pending', '2023-06-11', 'Liste pièce 1', 123456789),
    ('Offre 2', 'Responsable 2', 'Type métier 2', 'Lieu 2', 'Rythme 2', 'Salaire 2', 'Description 2', 'accepted', '2023-06-10', 'Liste pièce 2', 987654321),
    ('Offre 3', 'Responsable 3', 'Type métier 3', 'Lieu 3', 'Rythme 3', 'Salaire 3', 'Description 3', 'hidden', '2023-06-09', 'Liste pièce 3', 111111111),
    ('Offre 4', 'Responsable 4', 'Type métier 4', 'Lieu 4', 'Rythme 4', 'Salaire 4', 'Description 4', 'pending', '2023-06-08', 'Liste pièce 4', 222222222);


-- Table Candidatures
INSERT INTO Candidatures (status, date, siren, id_user, id_offre)
VALUES
    ('pending', '2023-06-11', 123456789, 'user1@example.com', 1),
    ('accepted', '2023-06-10', 987654321, 'user2@example.com', 2),
    ('rejected', '2023-06-09', 111111111, 'user3@example.com', 3),
    ('pending', '2023-06-08', 222222222, 'user4@example.com', 4);
