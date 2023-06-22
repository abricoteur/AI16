-- Add rows to Organisations table
INSERT INTO Organisations (siren, nom, createdBy,type_organisation, siege_social)
VALUES (123456789, 'Entreprise ABC', 'John Doe', 'entreprise', 'Paris, France'),
       (987654321, 'Association XYZ', 'Jane Smith', 'association', 'New York, USA'),
       (456789123, 'ONG Global', 'David Johnson', 'ong', 'London, UK'),
       (789123456, 'Entreprise DEF', 'Maria Garcia', 'entreprise', 'Madrid, Spain'),
       (321654987, 'Association ABCD', 'Robert Brown', 'association', 'Berlin, Germany'),
       (654987321, 'ONG Help', 'Sophie Martin', 'ong', 'Paris, France'),
       (987321654, 'Entreprise GHI', 'Michael Johnson', 'entreprise', 'New York, USA'),
       (159753468, 'Association LMN', 'Emily Davis', 'association', 'London, UK'),
       (357159468, 'ONG Care', 'William Wilson', 'ong', 'Berlin, Germany'),
       (468357159, 'Entreprise JKL', 'Olivia Martinez', 'entreprise', 'Madrid, Spain'),
       (951753684, 'Association OPQ', 'Daniel Taylor', 'association', 'Paris, France'),
       (246853197, 'ONG Hope', 'Sophia Anderson', 'ong', 'New York, USA'),
       (753159468, 'Entreprise RST', 'Mason Moore', 'entreprise', 'London, UK'),
       (864297531, 'Association UVW', 'Ava Wilson', 'association', 'Berlin, Germany');


-- Add rows to Utilisateurs table
INSERT INTO Utilisateurs (email, nom, mdp, prenom, role, id_orga)
VALUES ('recruiter@example.com', 'Recruiter', 'password', 'RecruiterFirstName', 'Recruteur', 123456789),
       ('recruteur1@example.com', 'Smith', 'mdp_recruteur1', 'Jane', 'Recruteur', 123456789),
       ('recruiter2@example.com', 'Recruiter', 'password', 'RecruiterFirstName', 'Recruteur', 987654321),
       ('recruteur3@example.com', 'Garcia', 'mdp_recruteur3', 'Maria', 'Recruteur', 987654321),
       ('recruteur4@example.com', 'Brown', 'mdp_recruteur4', 'Robert', 'Recruteur', 987654321);

       -- Add rows to Utilisateurs table
INSERT INTO Utilisateurs (email, nom, mdp, prenom, role)
VALUES ('candidate@example.com', 'Candidate', 'password', 'CandidateFirstName', 'Candidat'),
('candidat1@example.com', 'Candidate', 'password', 'CandidateFirstName', 'Candidat'),
       ('candidat2@example.com', 'Candidate', 'password', 'CandidateFirstName', 'Candidat'),
       ('candidat3@example.com', 'Candidate', 'password', 'CandidateFirstName', 'Candidat'),
       ('candidat4@example.com', 'Martin', 'mdp_candidat4', 'Olivia', 'Candidat'),
       ('candidat5@example.com', 'Moore', 'mdp_candidat5', 'Mason', 'Candidat'),
       ('admin@example.com', 'Admin', 'passoword', 'AdminFirstName', 'Administrateur');


-- Add rows to Demandes_Creation_Organisation table
INSERT INTO Demandes_Creation_Organisation (requester_email, status, siren, nom,type_organisation, siege_social, message)
VALUES 
       ('candidat1@example.com', 'pending', 444444444, 'Nouvelle Association', 'association','Madrid, Spain', 'Nous souhaitons créer une nouvelle association dans le domaine de la santé.'),
       ('candidat2@example.com', 'pending', 555555555, 'Nouvelle ONG', 'ong', 'Paris, France', 'Nous souhaitons créer une nouvelle ONG axée sur la protection des droits de lHomme.'),
       ('candidat3@example.com', 'pending', 666666666, 'Nouvelle Entreprise', 'entreprise', 'New York, USA', 'Nous souhaitons créer une nouvelle entreprise dans le domaine de la mode.'),
       ('candidat4@example.com', 'pending', 777777777, 'Nouvelle Association', 'association', 'London, UK', 'Nous souhaitons créer une nouvelle association dans le domaine de léducation.'),
       ('candidat5@example.com', 'pending', 888888888, 'Nouvelle ONG', 'ong', 'Berlin, Germany', 'Nous souhaitons créer une nouvelle ONG axée sur la protection des animaux.');




-- Add rows to Offres table
INSERT INTO Offres (nom, responsable, lieu, status, siren, entreprise, domaine, rythme, salaire, description)
VALUES ('Développeur', 'recruiter@example.com', 'City1', 'pending', 123456789, 'Google', 'Informatique / Télécoms', "alternance", 4000, "Développement applicatif"),
       ('Scrum Master', 'recruiter2@example.com', 'City3', 'accepted', 123456789, 'Google', 'Electronique / Electricité', "CDI",3500, "AGILE"),
       ('Développeur Web', 'Jean Dupont', 'Paris, France', 'pending', 123456789, 'Entreprise A', 'Informatique', 'Temps plein', 40000, 'Description de loffre de Développeur Web'),
       ('Responsable Marketing', 'Sophie Martin', 'New York, USA', 'pending', 123456789, 'Entreprise A', 'Marketing', 'Temps plein', 50000, 'Description de loffre de Responsable Marketing'),
       ('Analyste Financier', 'Thomas Johnson', 'London, UK', 'pending', 987654321, 'Entreprise B', 'Finance', 'Temps plein', 60000, 'Description de loffre dAnalyste Financier'),
       ('Infirmiere', 'Marie Garcia', 'Berlin, Germany', 'pending', 987654321, 'Santé', 'Entreprise B', 'Temps partiel', 35000, 'Description de loffre dInfirmier(e)'),
       ('Enseignante', 'Anne Thompson', 'Madrid, Spain', 'pending', 123456789, 'Entreprise A', 'Éducation', 'Temps plein', 45000, 'Description de loffre dEnseignant(e)'),
       ('Chef de Projet', 'David Wilson', 'Paris, France', 'pending', 123456789, 'Entreprise A', 'Informatique', 'Temps plein', 55000, 'Description de loffre de Chef de Projet'),
       ('Designer Graphique', 'Sophie Leroy', 'New York, USA', 'pending', 123456789, 'Entreprise A', 'Design', 'Temps plein', 45000, 'Description de loffre de Designer Graphique');

-- Add rows to Candidatures table (we will assume Offres have IDs 1,2,3 for these examples)
INSERT INTO Candidatures (status, siren, id_user, id_offre)
VALUES ('pending', 123456789, 'candidate@example.com', 1),
       ('accepted', 123456789, 'candidat2@example.com', 2),
       ('pending', 987654321, 'candidat1@example.com', 3),
       ('pending', 987654321, 'candidat2@example.com', 4),
       ('pending', 123456789, 'candidat3@example.com', 5);

INSERT INTO Demandes_Role (requester_email, requested_role, siren)
VALUES
       ('candidat2@example.com', 'Recruteur', 987654321),
       ('candidat3@example.com', 'Recruteur', 246853197),
       ('candidat4@example.com', 'Recruteur', 123456789),
       ('candidat5@example.com', 'Recruteur', 987654321);

INSERT INTO Demandes_Role (requester_email, requested_role)
VALUES ('candidate@example.com', 'Administrateur'),
       ('candidat1@example.com', 'Administrateur');