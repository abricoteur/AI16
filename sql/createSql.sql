CREATE TABLE Organisation (
    siren INT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    siege_social VARCHAR(255)
);

CREATE TABLE Offre (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    statut VARCHAR(255) NOT NULL,
    responsable VARCHAR(255) NOT NULL,
    type_metier VARCHAR(255),
    lieu VARCHAR(255) NOT NULL,
    rythme VARCHAR(255),
    salaire VARCHAR(255),
    description TEXT,
    etat ENUM('Publiée', 'Non publiée', 'Expirée') NOT NULL,
    date DATE NOT NULL,
    liste_piece VARCHAR(255) NOT NULL,
    id_orga INT NOT NULL,
    FOREIGN KEY (id_orga) REFERENCES Organisation(siren)
);

CREATE TABLE Utilisateurs (
    email VARCHAR(255) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    tel VARCHAR(255),
    dateCreation DATE NOT NULL,
    statut ENUM('actif', 'inactif') NOT NULL,
    Role ENUM('Recruteur', 'Candidat', 'Administrateur') NOT NULL,
    id_orga INT NOT NULL,
    FOREIGN KEY (id_orga) REFERENCES Organisation(siren)
);

CREATE TABLE Candidature (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    id_user VARCHAR(255) NOT NULL,
    id_offre INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Utilisateurs(email),
    FOREIGN KEY (id_offre) REFERENCES Offre(id),
    UNIQUE (id_user, id_offre)
);

CREATE TABLE Piece (
    id INT PRIMARY KEY AUTO_INCREMENT,
    file LONGBLOB NOT NULL,
    id_candidature INT NOT NULL,
    FOREIGN KEY (id_candidature) REFERENCES Candidature(id)
);
