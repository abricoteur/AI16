-- Drop tables if they exist
DROP TABLE IF EXISTS Pieces;
DROP TABLE IF EXISTS Candidatures;
DROP TABLE IF EXISTS Demandes_Creation_Organisation;
DROP TABLE IF EXISTS Utilisateurs;
DROP TABLE IF EXISTS Offres;
DROP TABLE IF EXISTS Organisations;

-- Create Organisations table
CREATE TABLE Organisations (
    siren INT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    domaine VARCHAR(255) NOT NULL,
    ceo VARCHAR(255) NOT NULL,
    createdBy VARCHAR(100) NOT NULL,
    description TEXT,
    adress VARCHAR(255) NOT NULL,
    siege_social VARCHAR(255)
);

-- Create Utilisateurs table
CREATE TABLE Utilisateurs (
    email VARCHAR(100) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    tel VARCHAR(255),
    dateCreation DATE NOT NULL,
    role ENUM('Recruteur', 'Candidat', 'Administrateur') NOT NULL,
    id_orga INT NOT NULL,
    FOREIGN KEY (id_orga) REFERENCES Organisations(siren)
);


-- Create Demandes_Creation_Organisation table
CREATE TABLE Demandes_Creation_Organisation (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    requester_id VARCHAR(100) NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') NOT NULL,
    date DATE NOT NULL,
    message TEXT,
    object TEXT,
    siren INT,
    nom VARCHAR(255) NOT NULL,
    domaine VARCHAR(255) NOT NULL,
    siege_social VARCHAR(255),
    FOREIGN KEY (requester_id) REFERENCES Utilisateurs(email)
);

-- Create Offres table
CREATE TABLE Offres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    responsable VARCHAR(255) NOT NULL,
    type_metier VARCHAR(255),
    lieu VARCHAR(255) NOT NULL,
    rythme VARCHAR(255),
    salaire VARCHAR(255),
    description TEXT,
    status ENUM('pending', 'hidden', 'accepted') NOT NULL,
    date DATE NOT NULL,
    liste_piece VARCHAR(255) NOT NULL,
    siren INT NOT NULL,
    FOREIGN KEY (siren) REFERENCES Organisations(siren)
);


-- Create Candidatures table
CREATE TABLE Candidatures (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('pending', 'accepted', 'rejected') NOT NULL,
    date DATE NOT NULL,
    siren INT NOT NULL,
    id_user VARCHAR(100) NOT NULL,
    id_offre INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Utilisateurs(email),
    FOREIGN KEY (id_offre) REFERENCES Offres(id),
    FOREIGN KEY (siren) REFERENCES Organisations(siren),
    UNIQUE (id_user, id_offre)
);

-- Create Pieces table
CREATE TABLE Pieces (
    id INT PRIMARY KEY AUTO_INCREMENT,
    file LONGBLOB NOT NULL,
    id_candidature INT NOT NULL,
    FOREIGN KEY (id_candidature) REFERENCES Candidatures(id)
);
