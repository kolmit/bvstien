SET AUTOCOMMIT ON;
SET PAGESIZE 1000;
SET LINESIZE 1000;

--------------------------------------------------------------------------------
-- SÃ©quencement de crÃ©ation des tables de la base de donnÃ©es
--------------------------------------------------------------------------------
-- 1) Adresse
-- 2) Personne
-- 3) Personnel
-- 4) Centre
-- 5) Moniteur
-- 6) Responsable
-- 7) Habilitation
-- 8) AffectHabilitation
-- 9) Materiel
-- 10) Stagiaire
-- 11) Activite
-- 12) ListeActivite
-- 13) Inscription
-- 14) Groupe
-- 15) AffectGroupe
-- 16) Seance
-- 17) Stage
-- 18) Encadre
-- 19) AffectMateriel
--------------------------------------------------------------------------------
-- Suppression des tables dans l'ordre dÃ©croissant du sÃ©quencement de crÃ©ation
--------------------------------------------------------------------------------
DROP TABLE MaterielNecessaire;
DROP TABLE AffectMateriel;
DROP TABLE Encadre;
DROP TABLE Stage;
DROP TABLE Seance;
DROP TABLE AffectGroupe;
DROP TABLE Groupe;
DROP TABLE Inscription;
DROP TABLE ListeActivite;
DROP TABLE Stagiaire;
DROP TABLE AffectHabilitation;
DROP TABLE Responsable;
DROP TABLE Moniteur;
DROP TABLE Personnel;
DROP TABLE Personne;
DROP TABLE Activite;
DROP TABLE Habilitation;
DROP TABLE Materiel;
DROP TABLE Centre;
DROP TABLE Adresse;




--------------------------------------------------------------------------------
-- Suppression des sÃ©quences d'incrÃ©mentation des tables
--------------------------------------------------------------------------------
DROP SEQUENCE "ID_SEANCE_SEQUENCE";
DROP SEQUENCE "ID_GROUPE_SEQUENCE";
DROP SEQUENCE "ID_ACTIVITE_SEQUENCE";
DROP SEQUENCE "ID_STAGIAIRE_SEQUENCE";
DROP SEQUENCE "ID_MATERIEL_SEQUENCE";
DROP SEQUENCE "ID_HABILITATION_SEQUENCE";
DROP SEQUENCE "ID_RESPONSABLE_SEQUENCE";
DROP SEQUENCE "ID_MONITEUR_SEQUENCE";
DROP SEQUENCE "ID_CENTRE_SEQUENCE";
DROP SEQUENCE "ID_PERSONNEL_SEQUENCE";
DROP SEQUENCE "ID_PERSONNE_SEQUENCE";
DROP SEQUENCE "ID_ADRESSE_SEQUENCE";
DROP SEQUENCE "ID_NUMBADGE_SEQUENCE";
--------------------------------------------------------------------------------
-- CrÃ©ation des sÃ©quence d'incrÃ©mentation
--------------------------------------------------------------------------------
CREATE SEQUENCE id_adresse_sequence start with 1 increment by 1;
CREATE SEQUENCE id_personne_sequence start with 1 increment by 1;
CREATE SEQUENCE id_personnel_sequence start with 1 increment by 1;
CREATE SEQUENCE id_numbadge_sequence start with 1 increment by 1;
CREATE SEQUENCE id_moniteur_sequence start with 1 increment by 1;
CREATE SEQUENCE id_centre_sequence start with 1 increment by 1;
CREATE SEQUENCE id_responsable_sequence start with 1 increment by 1;
CREATE SEQUENCE id_habilitation_sequence start with 1 increment by 1;
CREATE SEQUENCE id_materiel_sequence start with 1 increment by 1;
CREATE SEQUENCE id_stagiaire_sequence start with 1 increment by 1;
CREATE SEQUENCE id_activite_sequence start with 1 increment by 1;
CREATE SEQUENCE id_groupe_sequence start with 1 increment by 1;
CREATE SEQUENCE id_seance_sequence start with 1 increment by 1;

--------------------------------------------------------------------------------
-- CrÃ©ation des tables contenues dans le schÃ©ma de la base de donnÃ©es
-- CrÃ©ation suivant le sÃ©quencement dÃ©cris plus haut dans le fichier
--------------------------------------------------------------------------------
-- 1) CrÃ©ation de la table Adresse
CREATE TABLE Adresse(
    idAdresse NUMBER NOT NULL,
    numRue NUMBER NOT NULL,
    rue VARCHAR2(16) NOT NULL,
    ville VARCHAR2(16) NOT NULL,
    departement VARCHAR2(16) NOT NULL,
    pays VARCHAR2(16) NOT NULL,
    CONSTRAINT pk_adresse PRIMARY KEY (idAdresse)
);
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 1, 'Joliette', 'Marseille', '13002', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 2, 'Marechal', 'Rouen', '76000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 3, 'Petin', 'Orleans', '45000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 4, 'Auriel', 'Pujol', '47000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 5, 'Soleil', 'Paris', '75000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 6, 'Comart', 'Bordeaux', '33000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 7, 'Tout', 'Somme', '80000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 8, 'hultre', 'Meuse', '55000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 9, 'palfon', 'Ardennes', '08000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 10, 'resistance', 'Ajaccio', '2A', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 11, 'Comart', 'Bordeaux', '33000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 12, 'fin', 'Indre', '36000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 13, 'Beau', 'Cher', '18000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 14, 'Derit', 'Nord', '59000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 15, 'Papaye', 'Guyane', '973000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 16, 'pyramide', 'Essonne', '91000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 17, 'autonme', 'Correze', '19000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 18, 'Xavil', 'Mayenne', '53000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 19, 'milles', 'Eguilles', '13510', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 20, 'Evan', 'Vosges', '88000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 21, 'Patrice', 'Loiret', '45000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 22, 'rety', 'Doubs', '25000', 'France');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 23, 'pulouin', 'Angers', '49000', 'France');


-- 2) CrÃ©ation de la table Personne
CREATE TABLE Personne (
    idPersonne NUMBER NOT NULL,
    nom VARCHAR2(16) NOT NULL,
    prenom VARCHAR2(16) NOT NULL,
    mail VARCHAR2(25),
    dateNaissance DATE,
    telephone VARCHAR2(10),
    idAdresse NUMBER,
    CONSTRAINT pk_personne PRIMARY KEY (idPersonne),
    CONSTRAINT fk_personne_idAdresse FOREIGN KEY (idAdresse) REFERENCES Adresse(idAdresse)
);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Jean', 'Michel', 'jm@mail.com', to_date('11-11-1970', 'DD-MM-YYYY'), 0123456789, 4);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Abramson', 'Morten', 'mabramson@mail.com', to_date('20-12-1981','DD-MM-YYYY'), 0597391453, 5);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Bastien', 'Caparte', 'bg@wanadoo.fr', to_date('20-12-1993','DD-MM-YYYY'), 0597391453, 6);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 7);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 8);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 9);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 10);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 11);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 12);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 13);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 14);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 15);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 16);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 17);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 18);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 19);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 20);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 21);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 22);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Augustin', 'Ferrent', 'af@wanadoo.fr', to_date('20-12-1954','DD-MM-YYYY'), 0597391453, 23);



-- 3) CrÃ©ation de la table Personnel
CREATE TABLE Personnel(
    idPersonnel NUMBER NOT NULL,
    numBadge NUMBER NOT NULL,
    idPersonne NUMBER NOT NULL,
    CONSTRAINT pk_personnel PRIMARY KEY (idPersonnel),
    CONSTRAINT fk_personnel_idPersonne FOREIGN KEY (idPersonne) REFERENCES Personne(idPersonne)
);

INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 1);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 2);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 3);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 4);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 5);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 6);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 7);


-- 4) CrÃ©ation de la table Centre
CREATE TABLE Centre(
    idCentre NUMBER NOT NULL,
    idAdresse NUMBER,
	nomCentre VARCHAR2(16) NOT NULL,
    CONSTRAINT pk_centre PRIMARY KEY (idCentre),
    CONSTRAINT fk_centre_idAdresse FOREIGN KEY (idAdresse) REFERENCES Adresse(idAdresse)
);

INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 1, 'Centre A');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 2, 'Centre B');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 3, 'Centre C');

-- 5) Cr�ation de la table Moniteur
CREATE TABLE Moniteur(
    idMoniteur NUMBER NOT NULL,
    idPersonnel NOT NULL,
    idCentre NUMBER NOT NULL,
    CONSTRAINT pk_moniteur PRIMARY KEY (idMoniteur),
    CONSTRAINT fk_moniteur_idPersonnel FOREIGN KEY (idPersonnel) REFERENCES Personnel(idPersonnel),
    CONSTRAINT fk_moniteur_idCentre FOREIGN KEY (idCentre) REFERENCES Centre(idCentre)
);

INSERT INTO Moniteur (idMoniteur,  idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 4, 1);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 5, 2);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 6, 3);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 7, 1);

-- 6) Cr�ation de la table Responsable
CREATE TABLE Responsable(
    idResponsable NUMBER NOT NULL,
    idPersonnel NUMBER  NOT NULL,
    idCentre NUMBER,
    CONSTRAINT pk_responsable PRIMARY KEY (idResponsable),
    CONSTRAINT fk_responsable_idPersonnel FOREIGN KEY (idPersonnel) REFERENCES Personnel(idPersonnel),
    CONSTRAINT fk_responsable_idCentre FOREIGN KEY (idCentre) REFERENCES Centre(idCentre)
);

INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 1, 1);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 2, 2);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 3, 3);

-- 7) CrÃ©ation de la table Habilitation
CREATE TABLE Habilitation(
    idHabilitation NUMBER NOT NULL,
    habilitation VARCHAR2(32),
    CONSTRAINT pk_habilitation PRIMARY KEY (idHabilitation)
);
INSERT INTO Habilitation (idHabilitation, habilitation) VALUES (id_habilitation_sequence.nextval, 'BAFA');
INSERT INTO Habilitation (idHabilitation, habilitation) VALUES (id_habilitation_sequence.nextval, 'BAPAAT');
INSERT INTO Habilitation (idHabilitation, habilitation) VALUES (id_habilitation_sequence.nextval, 'BPJEPS');
INSERT INTO Habilitation (idHabilitation, habilitation) VALUES (id_habilitation_sequence.nextval, 'DEJEPS');



-- 8) CrÃ©ation de la table AffectHabilitation
CREATE TABLE AffectHabilitation(
    idMoniteur NUMBER NOT NULL,
    idHabilitation NUMBER  NOT NULL,
    CONSTRAINT pk_affectHabilitation PRIMARY KEY (idMoniteur,idHabilitation),
    CONSTRAINT fk_affectHabilit_idMoniteur FOREIGN KEY (idMoniteur) REFERENCES Moniteur(idMoniteur),
    CONSTRAINT fk_affectHabilit_idHabilit FOREIGN KEY (idHabilitation) REFERENCES Habilitation(idHabilitation)
);



-- 9) CrÃ©ation de la table Materiel
CREATE TABLE Materiel(
    idMateriel NUMBER NOT NULL,
    type VARCHAR2(32),
    marque VARCHAR2(32),
    modele VARCHAR2(32),
    niveau VARCHAR2(32),
    quantite NUMBER,
	idCentre NUMBER NOT NULL,
    CONSTRAINT pk_materiel PRIMARY KEY (idMateriel),
	CONSTRAINT fk_materiel_idCentre FOREIGN KEY (idCentre) REFERENCES Centre(idCentre)
);

INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'debutant', 10, 1);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'debutant', 50, 2);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'debutant', 20, 3);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'Confirme', 20, 1);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'Confirme', 40, 2);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'Confirme', 40, 3);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Raquette', 'Artengo', 'Modele adulte', 'Expert', 4, 1);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Raquette', 'Artengo', 'Modele adulte', 'Expert', 40, 2);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Raquette', 'Artengo', 'Modele adulte', 'Expert', 10, 3);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Chaussure de randonnee', 'Artengo', 'Modele adulte', 'Expert', 4, 1);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Chaussure de randonnee', 'Artengo', 'Modele adulte', 'Expert', 40, 2);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Chaussure de randonnee', 'Artengo', 'Modele adulte', 'Expert', 10, 3);







-- 10) CrÃ©ation de la table Stagiaire
CREATE TABLE Stagiaire(
    idStagiaire NUMBER NOT NULL,
    dateDebut DATE NOT NULL,
    dateFin DATE NOT NULL,
    idPersonne NUMBER NOT NULL,
    CONSTRAINT pk_stagiaire PRIMARY KEY (idStagiaire),
    CONSTRAINT fk_idPersonne_stagiaire FOREIGN KEY (idPersonne) REFERENCES Personne(idPersonne)
);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('1-11-2018','DD-MM-YYYY'),to_date('17-03-2018','DD-MM-YYYY'),4);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('6-07-2017','DD-MM-YYYY'),to_date('14-09-2017','DD-MM-YYYY'),5);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('9-10-2017','DD-MM-YYYY'),to_date('6-09-2017','DD-MM-YYYY'),6);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('25-05-2017','DD-MM-YYYY'),to_date('3-08-2018','DD-MM-YYYY'),7);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('7-09-2017','DD-MM-YYYY'),to_date('20-08-2017','DD-MM-YYYY'),8);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('21-03-2017','DD-MM-YYYY'),to_date('19-02-2018','DD-MM-YYYY'),9);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('10-05-2017','DD-MM-YYYY'),to_date('18-11-2017','DD-MM-YYYY'),10);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('24-12-2016','DD-MM-YYYY'),to_date('15-11-2018','DD-MM-YYYY'),11);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('13-08-2017','DD-MM-YYYY'),to_date('20-09-2017','DD-MM-YYYY'),12);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('6-10-2017','DD-MM-YYYY'),to_date('3-12-2018','DD-MM-YYYY'),13);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('14-01-2018','DD-MM-YYYY'),to_date('5-06-2017','DD-MM-YYYY'),14);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('18-11-2018','DD-MM-YYYY'),to_date('9-11-2017','DD-MM-YYYY'),15);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('19-04-2018','DD-MM-YYYY'),to_date('17-11-2018','DD-MM-YYYY'),16);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('15-10-2017','DD-MM-YYYY'),to_date('20-05-2017','DD-MM-YYYY'),17);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('30-01-2018','DD-MM-YYYY'),to_date('24-03-2017','DD-MM-YYYY'),18);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('12-10-2017','DD-MM-YYYY'),to_date('5-04-2017','DD-MM-YYYY'),19);
INSERT INTO Stagiaire (idStagiaire,dateDebut,dateFin,idPersonne) VALUES (id_stagiaire_sequence.nextval,to_date('25-07-2017','DD-MM-YYYY'),to_date('7-06-2018','DD-MM-YYYY'),20);

-- 11) CrÃ©ation de la table Activite
CREATE TABLE Activite(
    idActivite NUMBER NOT NULL,
    nom VARCHAR2(32) NOT NULL,
    categorie VARCHAR2(32),
    nbStagiaire NUMBER NOT NULL,
    nbMoniteur NUMBER NOT NULL,
    idHabilitation NUMBER,
    CONSTRAINT pk_activite PRIMARY KEY (idActivite),
    CONSTRAINT fk_activite_habilitation FOREIGN KEY (idHabilitation) REFERENCES Habilitation(idHabilitation)
);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'Plongee', 'Nautique', 4, 1, 1);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'Randonnee Hivernale', 'Montagne', 5, 1, 2);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'Randonnee', 'Montagne', 5, 1, 2);



-- 12) CrÃ©ation de la table ListeActivite
CREATE TABLE ListeActivite(
    idActivite NUMBER NOT NULL,
    idCentre NUMBER NOT NULL,
    CONSTRAINT pk_listeactivite PRIMARY KEY (idActivite,idCentre),
    CONSTRAINT fk_listeactivite_idActivite FOREIGN KEY (idActivite) REFERENCES Activite(idActivite),
    CONSTRAINT fk_listeactivite_idCentre FOREIGN KEY (idCentre) REFERENCES Centre(idCentre)
);

INSERT INTO ListeActivite (idActivite, idCentre) VALUES (1, 1);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (2, 2);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (3, 3);



-- 13) CrÃ©ation de la table Inscription
CREATE TABLE Inscription(
    idStagiaire NUMBER NOT NULL,
    idCentre NUMBER NOT NULL,
    CONSTRAINT pk_inscription PRIMARY KEY (idStagiaire,idCentre),
    CONSTRAINT fk_inscription_idStagiaire FOREIGN KEY (idStagiaire) REFERENCES Stagiaire(idStagiaire),
    CONSTRAINT fk_inscription_idCentre FOREIGN KEY (idCentre) REFERENCES Centre(idCentre)
);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (1, 1);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (2, 1);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (3, 1);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (4, 1);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (5, 1);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (6, 2);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (7, 2);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (8, 2);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (9, 2);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (10,2);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (11,3);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (12,3);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (13,3);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (14,3);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (15,3);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (16,3);



-- 14) CrÃ©ation de la table Groupe
CREATE TABLE Groupe(
    idGroupe NUMBER NOT NULL,
    niveau VARCHAR2(32),
    idCentre NUMBER NOT NULL,
    CONSTRAINT pk_groupe PRIMARY KEY (idGroupe),
    CONSTRAINT fk_groupe_idCentre FOREIGN KEY (idCentre) REFERENCES Centre(idCentre)
);

INSERT INTO Groupe (idGroupe, niveau,idCentre) VALUES (id_groupe_sequence.nextval, 'Debutant',1);
INSERT INTO Groupe (idGroupe, niveau,idCentre) VALUES (id_groupe_sequence.nextval, 'Confirme',2);
INSERT INTO Groupe (idGroupe, niveau,idCentre) VALUES (id_groupe_sequence.nextval, 'Expert',3);
INSERT INTO Groupe (idGroupe, niveau,idCentre) VALUES (id_groupe_sequence.nextval, 'Debutant',1);
INSERT INTO Groupe (idGroupe, niveau,idCentre) VALUES (id_groupe_sequence.nextval, 'Confirme',2);
INSERT INTO Groupe (idGroupe, niveau,idCentre) VALUES (id_groupe_sequence.nextval, 'Expert',3);
INSERT INTO Groupe (idGroupe, niveau,idCentre) VALUES (id_groupe_sequence.nextval, 'Debutant',1);
INSERT INTO Groupe (idGroupe, niveau,idCentre) VALUES (id_groupe_sequence.nextval, 'Confirme',2);
INSERT INTO Groupe (idGroupe, niveau,idCentre) VALUES (id_groupe_sequence.nextval, 'Expert',3);


-- 15) CrÃ©ation de la table AffectGroupe
CREATE TABLE AffectGroupe(
    idGroupe NUMBER NOT NULL,
    idStagiaire NUMBER NOT NULL,
    CONSTRAINT pk_affectgroupe PRIMARY KEY (idGroupe,idStagiaire),
    CONSTRAINT fk_affectgroupe_idGroupe FOREIGN KEY (idGroupe) REFERENCES Groupe(idGroupe),
    CONSTRAINT fk_affectgroupe_idStagiaire FOREIGN KEY (idStagiaire) REFERENCES Stagiaire(idStagiaire)
);

INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1,1);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1,2);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1,3);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1,4);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1,5);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (2,6);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (2,7);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (2,8);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (2,9);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (2,10);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (3,11);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (3,12);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (3,13);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (3,15);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (3,16);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (3,17);



-- 16) CrÃ©ation de la table Seance
CREATE TABLE Seance(
    idSeance NUMBER NOT NULL,
    dateSeance DATE NOT NULL,
    heureDebut TIMESTAMP NOT NULL,
    heureFin TIMESTAMP NOT NULL,
    idActivite NUMBER NOT NULL,
    CONSTRAINT pk_seance PRIMARY KEY (idSeance),
    CONSTRAINT fk_seance_activite FOREIGN KEY (idActivite) REFERENCES Activite(idActivite)
);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, to_date('09-05-2017','DD-MM-YYYY'), TIMESTAMP '2017-05-09 9:00:00', TIMESTAMP '2017-05-09 11:00:00', 1);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, to_date( '10-05-2017','DD-MM-YYYY'), TIMESTAMP '2017-05-10 9:00:00', TIMESTAMP '2017-05-10 12:00:00', 2);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, to_date( '11-05-2017','DD-MM-YYYY'), TIMESTAMP '2017-05-11 10:00:00', TIMESTAMP '2017-05-11 10:00:00', 3);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, to_date( '12-05-2017','DD-MM-YYYY'), TIMESTAMP '2017-05-12 13:30:00', TIMESTAMP '2017-05-12 18:30:00', 1);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, to_date( '13-05-2017','DD-MM-YYYY'), TIMESTAMP '2017-05-13 13:50:00', TIMESTAMP '2017-05-13 17:30:00', 2);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, to_date( '14-05-2017','DD-MM-YYYY'), TIMESTAMP '2017-05-14 13:00:00', TIMESTAMP '2017-05-14 16:40:00', 3);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, to_date( '15-05-2017','DD-MM-YYYY'), TIMESTAMP '2017-05-15 13:20:00', TIMESTAMP '2017-05-15 15:10:00', 1);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, to_date( '16-05-2017','DD-MM-YYYY'), TIMESTAMP '2017-05-16 13:10:00', TIMESTAMP '2017-05-16 18:00:00', 2);


-- 17) CrÃ©ation de la table Stage
CREATE TABLE Stage(
    idGroupe NUMBER NOT NULL,
    idSeance NUMBER NOT NULL,
    CONSTRAINT pk_stage PRIMARY KEY (idGroupe,idSeance),
    CONSTRAINT fk_stage_idGroupe FOREIGN KEY (idGroupe) REFERENCES Groupe(idGroupe),
    CONSTRAINT fk_stage_idSeance FOREIGN KEY (idSeance) REFERENCES Seance(idSeance)
);
INSERT INTO Stage (idGroupe, idSeance) VALUES (1, 1);
INSERT INTO Stage (idGroupe, idSeance) VALUES (2, 2);
INSERT INTO Stage (idGroupe, idSeance) VALUES (3, 3);

-- 18) CrÃ©ation de la table Encadre
CREATE TABLE Encadre(
    idMoniteur NUMBER NOT NULL,
    idSeance NUMBER NOT NULL,
    CONSTRAINT pk_encadre PRIMARY KEY (idMoniteur,idSeance),
    CONSTRAINT fk_encadre_idMoniteur FOREIGN KEY (idMoniteur) REFERENCES Moniteur(idMoniteur),
    CONSTRAINT fk_encadre_idSeance FOREIGN KEY (idSeance) REFERENCES Seance(idSeance)
);
INSERT INTO Encadre (idMoniteur, idSeance) VALUES (1, 1);
INSERT INTO Encadre (idMoniteur, idSeance) VALUES (2, 1);
INSERT INTO Encadre (idMoniteur, idSeance) VALUES (3, 1);


-- 19) CrÃ©ation de la table AffectMateriel
CREATE TABLE AffectMateriel(
    idMateriel NUMBER NOT NULL,
    idSeance NUMBER NOT NULL,
    CONSTRAINT pk_affectmateriel PRIMARY KEY (idMateriel,idSeance),
    CONSTRAINT fk_affectmateriel_idMateriel FOREIGN KEY (idMateriel) REFERENCES Materiel(idMateriel),
    CONSTRAINT fk_affectmateriel_idSeance FOREIGN KEY (idSeance) REFERENCES Seance(idSeance)
);
INSERT INTO AffectMateriel (idMateriel, idSeance) VALUES (1, 1);
INSERT INTO AffectMateriel (idMateriel, idSeance) VALUES (2, 2);
INSERT INTO AffectMateriel (idMateriel, idSeance) VALUES (3, 3);

CREATE TABLE MaterielNecessaire(
	idMateriel NUMBER NOT NULL,
	idActivite NUMBER NOT NULL,
	CONSTRAINT pk_materielnecessaire PRIMARY KEY (idMateriel, idActivite), 
	CONSTRAINT fk_matNecessaire_idMat FOREIGN KEY (idMateriel) REFERENCES Materiel(idMateriel),
	CONSTRAINT fk_matNecessaire_idAct FOREIGN KEY (idActivite) REFERENCES Activite(idActivite)
);

INSERT INTO MaterielNecessaire (idMateriel, idActivite) VALUES (1, 1);
INSERT INTO MaterielNecessaire (idMateriel, idActivite) VALUES (2, 2);
INSERT INTO MaterielNecessaire (idMateriel, idActivite) VALUES (3, 3);

