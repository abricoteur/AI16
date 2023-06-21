-- Drop tables if they exist
DROP TABLE IF EXISTS Demandes_Role;
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
    createdBy VARCHAR(100) NOT NULL,
    type_organisation ENUM('entreprise', 'association', 'ong') NOT NULL,
    siege_social VARCHAR(255)
);

-- Create Utilisateurs table
CREATE TABLE Utilisateurs (
    email VARCHAR(100) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    dateCreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tel VARCHAR(255),
    role ENUM('Recruteur', 'Candidat', 'Administrateur') NOT NULL,
    statut_activite ENUM('actif', 'inactif') NOT NULL DEFAULT 'actif',
    id_orga INT,
    FOREIGN KEY (id_orga) REFERENCES Organisations(siren) ON DELETE CASCADE
);


-- Create Demandes_Creation_Organisation table
CREATE TABLE Demandes_Creation_Organisation (
    request_id INT PRIMARY KEY AUTO_INCREMENT,
    requester_email VARCHAR(100) NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    siren INT,
    nom VARCHAR(255) NOT NULL,
    siege_social VARCHAR(255) NOT NULL,
    type_organisation ENUM('entreprise', 'association', 'ong') NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (requester_email) REFERENCES Utilisateurs(email) ON DELETE CASCADE
);


-- Create Offres table
CREATE TABLE Offres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    responsable VARCHAR(255) NOT NULL,
    lieu VARCHAR(255) NOT NULL,
    status ENUM('pending', 'accepted') NOT NULL DEFAULT 'pending',
    siren INT NOT NULL,
    domaine VARCHAR(255),
    rythme VARCHAR(255),
    salaire INT(255),
    description TEXT,

    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (siren) REFERENCES Organisations(siren) ON DELETE CASCADE,
    entreprise VARCHAR(255) NOT NULL
);


-- Create Candidatures table
CREATE TABLE Candidatures (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT,
    siren INT NOT NULL,
    id_user VARCHAR(100) NOT NULL,
    id_offre INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Utilisateurs(email) ON DELETE CASCADE,
    FOREIGN KEY (id_offre) REFERENCES Offres(id) ON DELETE CASCADE,
    FOREIGN KEY (siren) REFERENCES Organisations(siren) ON DELETE CASCADE,
    UNIQUE (id_user, id_offre)
);

-- Create Pieces table
CREATE TABLE Pieces (
    user_email VARCHAR(100) NOT NULL,
    file LONGBLOB NOT NULL,
    filename VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_email),
    FOREIGN KEY (user_email) REFERENCES Utilisateurs(email) ON DELETE CASCADE
);

CREATE TABLE Demandes_Role (
    requester_email VARCHAR(100) NOT NULL,
    requested_role ENUM('Recruteur', 'Administrateur') NOT NULL,
    siren INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(requester_email),
    FOREIGN KEY (requester_email) REFERENCES Utilisateurs(email) ON DELETE CASCADE,
    FOREIGN KEY (siren) REFERENCES Organisations(siren) ON DELETE CASCADE
);

CREATE TABLE Registre_Demandes_Role (
    requester_email VARCHAR(100) NOT NULL,
    requested_role ENUM('Recruteur', 'Administrateur') NOT NULL,
    siren INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('accepted', 'rejected', 'aborted') NOT NULL,
);
