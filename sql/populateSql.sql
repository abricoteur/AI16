-- SQLite
-- Populate the Organisation table
INSERT INTO Organisation (siren, nom, type, siege_social)
VALUES (123456789, 'Company A', 'Type A', 'Headquarters A'),
       (987654321, 'Company B', 'Type B', 'Headquarters B');

-- Populate the Offre table
INSERT INTO Offre (id, nom, statut, responsable, type_metier, lieu, rythme, salaire, description, etat, date, liste_piece, id_orga)
VALUES (1, 'Job A', 'Statut A', 'John Doe', 'Type A', 'Location A', 'Rythme A', 'Salaire A', 'Description A', 'Publiée', '2023-01-01', 'Piece A', 123456789),
       (2, 'Job B', 'Statut B', 'Jane Smith', 'Type B', 'Location B', 'Rythme B', 'Salaire B', 'Description B', 'Non publiée', '2023-02-01', 'Piece B', 987654321),
       (3, 'Job C', 'Statut C', 'John Doe', 'Type C', 'Location C', 'Rythme C', 'Salaire C', 'Description C', 'Publiée', '2023-03-01', 'Piece C', 123456789),
       (4, 'Job D', 'Statut D', 'Jane Smith', 'Type D', 'Location D', 'Rythme D', 'Salaire D', 'Description D', 'Publiée', '2023-04-01', 'Piece D', 987654321);

-- Populate the Utilisateurs table
INSERT INTO Utilisateurs (email, nom, mdp, prenom, tel, dateCreation, statut, Role, id_orga)
VALUES ('user1@example.com', 'User1', 'password1', 'John', '1234567890', '2023-01-01', 'actif', 'Recruteur', 123456789),
       ('user2@example.com', 'User2', 'password2', 'Jane', '9876543210', '2023-02-01', 'actif', 'Candidat', 987654321),
       ('user3@example.com', 'User3', 'password3', 'Alice', '5555555555', '2023-03-01', 'inactif', 'Candidat', 987654321),
       ('user4@example.com', 'User4', 'password4', 'Bob', '9999999999', '2023-04-01', 'actif', 'Administrateur', 123456789);

-- Populate the Candidature table
INSERT INTO Candidature (id, date, id_user, id_offre)
VALUES (1, '2023-03-01', 'user2@example.com', 1),
       (2, '2023-04-01', 'user1@example.com', 2),
       (3, '2023-04-15', 'user3@example.com', 3),
       (4, '2023-05-01', 'user2@example.com', 4);

-- Populate the Piece table
INSERT INTO Piece (id, file, id_candidature)
VALUES (1, 'Piece A File', 1),
       (2, 'Piece B File', 2),
       (3, 'Piece C File', 3),
              (4, 'Piece D File', 4);

-- Additional data for the Organisation table
INSERT INTO Organisation (siren, nom, type, siege_social)
VALUES (135792468, 'Company C', 'Type C', 'Headquarters C'),
       (246813579, 'Company D', 'Type D', 'Headquarters D');

-- Additional data for the Offre table
INSERT INTO Offre (id, nom, statut, responsable, type_metier, lieu, rythme, salaire, description, etat, date, liste_piece, id_orga)
VALUES (5, 'Job E', 'Statut E', 'John Doe', 'Type E', 'Location E', 'Rythme E', 'Salaire E', 'Description E', 'Non publiée', '2023-05-01', 'Piece E', 135792468),
       (6, 'Job F', 'Statut F', 'Jane Smith', 'Type F', 'Location F', 'Rythme F', 'Salaire F', 'Description F', 'Publiée', '2023-06-01', 'Piece F', 246813579);

-- Additional data for the Utilisateurs table
INSERT INTO Utilisateurs (email, nom, mdp, prenom, tel, dateCreation, statut, Role, id_orga)
VALUES ('user5@example.com', 'User5', 'password5', 'Alice', '1111111111', '2023-05-01', 'actif', 'Candidat', 135792468),
       ('user6@example.com', 'User6', 'password6', 'Bob', '2222222222', '2023-06-01', 'actif', 'Recruteur', 246813579);

-- Additional data for the Candidature table
INSERT INTO Candidature (id, date, id_user, id_offre)
VALUES (5, '2023-06-01', 'user5@example.com', 5),
       (6, '2023-06-15', 'user6@example.com', 6);

-- Additional data for the Piece table
INSERT INTO Piece (id, file, id_candidature)
VALUES (5, 'Piece E File', 5),
       (6, 'Piece F File', 6);