-- Add rows to Organisations table
INSERT INTO Organisations (siren, nom, createdBy, siege_social)
VALUES (123456789, 'Google', 'admin@example.com', '1600 Amphitheatre Parkway, Mountain View, CA, USA'),
       (987654321, 'Apple Inc', 'admin@example.com', 'One Apple Park Way, Cupertino, CA, USA'),
       (456123789, 'Pfizer', 'admin@example.com', '235 East 42nd Street, NY, USA'),
       (654321987, 'AXA', 'admin@example.com', '25 Avenue Matignon, Paris, France'),
       (789456123, 'Nestle', 'admin@example.com', 'Avenue Nestlé 55, Vevey, Switzerland'),
       (321654987, 'Amazon', 'admin@example.com', '410 Terry Ave N, Seattle, WA, USA');



-- Add rows to Utilisateurs table
INSERT INTO Utilisateurs (email, nom, mdp, prenom, role, id_orga)
VALUES ('recruiter@example.com', 'Recruiter', 'password', 'RecruiterFirstName', 'Recruteur', 123456789);

       -- Add rows to Utilisateurs table
INSERT INTO Utilisateurs (email, nom, mdp, prenom, role)
VALUES ('candidate@example.com', 'Candidate', 'password', 'CandidateFirstName', 'Candidat'),
       ('admin@example.com', 'Admin', 'passoword', 'AdminFirstName', 'Administrateur');


-- Add rows to Demandes_Creation_Organisation table
INSERT INTO Demandes_Creation_Organisation (requester_email, status, siren, nom, domaine,type_organisation, siege_social, message)
VALUES ('recruiter@example.com', 'pending', 111111111, 'Organisation2', 'Banque/Assurance',"association", '456 Street, City, Country'," OK"),
       ('recruiter@example.com', 'accepted', 222222222, 'Organisation3', 'Industrie pharmaceutique',"ong", '789 Street, City, Country',"DOS"),
       ('recruiter@example.com', 'rejected', 333333333, 'Organisation4', 'Commerce / Distribution',"entreprise", '012 Street, City, Country',"THRES");


-- Add rows to Offres table
INSERT INTO Offres (nom, responsable, lieu, status, siren, entreprise, domaine, rythme, salaire, description)
VALUES ('Développeur', 'responsable1', 'City1', 'pending', 123456789, 'Google', 'Informatique / Télécoms', "alternance", 4000, "Développement applicatif"),
       ('Scrum Master', 'responsable3', 'City3', 'accepted', 123456789, 'Google', 'Electronique / Electricité', "CDI",3500, "AGILE");

-- Add rows to Candidatures table (we will assume Offres have IDs 1,2,3 for these examples)
INSERT INTO Candidatures (status, date, siren, id_user, id_offre)
VALUES ('pending', CURDATE(), 123456789, 'candidate@example.com', 1),
       ('accepted', CURDATE(), 123456789, 'candidate@example.com', 2);