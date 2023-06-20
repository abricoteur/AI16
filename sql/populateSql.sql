-- Add rows to Organisations table
INSERT INTO Organisations (siren, nom, domaine, createdBy, siege_social)
VALUES (123456789, 'Google', 'Informatique / Télécoms', 'admin@example.com', '1600 Amphitheatre Parkway, Mountain View, CA, USA'),
       (987654321, 'Apple Inc', 'Electronique / Electricité', 'admin@example.com', 'One Apple Park Way, Cupertino, CA, USA'),
       (456123789, 'Pfizer', 'Industrie pharmaceutique', 'admin@example.com', '235 East 42nd Street, NY, USA'),
       (654321987, 'AXA', 'Banque/Assurance', 'admin@example.com', '25 Avenue Matignon, Paris, France'),
       (789456123, 'Nestle', 'Agroalimentaire', 'admin@example.com', 'Avenue Nestlé 55, Vevey, Switzerland'),
       (321654987, 'Amazon', 'Commerce / Distribution', 'admin@example.com', '410 Terry Ave N, Seattle, WA, USA');



-- Add rows to Utilisateurs table
INSERT INTO Utilisateurs (email, nom, mdp, prenom, role, id_orga)
VALUES ('recruiter@example.com', 'Recruiter', 'password', 'RecruiterFirstName', 'Recruteur', 123456789);

       -- Add rows to Utilisateurs table
INSERT INTO Utilisateurs (email, nom, mdp, prenom, role)
VALUES ('candidate@example.com', 'Candidate', 'password', 'CandidateFirstName', 'Candidat'),
       ('admin@example.com', 'Admin', 'password', 'AdminFirstName', 'Administrateur');


-- Add rows to Demandes_Creation_Organisation table
INSERT INTO Demandes_Creation_Organisation (requester_email, status, siren, nom, domaine, siege_social)
VALUES ('recruiter@example.com', 'pending', 111111111, 'Organisation2', 'Banque/Assurance', '456 Street, City, Country'),
       ('recruiter@example.com', 'accepted', 222222222, 'Organisation3', 'Industrie pharmaceutique', '789 Street, City, Country'),
       ('recruiter@example.com', 'rejected', 333333333, 'Organisation4', 'Commerce / Distribution', '012 Street, City, Country');


-- Add rows to Offres table
INSERT INTO Offres (nom, responsable, lieu, status, siren, entreprise)
VALUES ('Offre1', 'responsable1', 'City1', 'pending', 123456789, 'Organisation1'),
       ('Offre2', 'responsable2', 'City2', 'hidden', 123456789, 'Organisation1'),
       ('Offre3', 'responsable3', 'City3', 'accepted', 123456789, 'Organisation1');

-- Add rows to Candidatures table (we will assume Offres have IDs 1,2,3 for these examples)
INSERT INTO Candidatures (status, date, siren, id_user, id_offre)
VALUES ('pending', CURDATE(), 123456789, 'candidate@example.com', 1),
       ('accepted', CURDATE(), 123456789, 'candidate@example.com', 2),
       ('rejected', CURDATE(), 123456789, 'candidate@example.com', 3);