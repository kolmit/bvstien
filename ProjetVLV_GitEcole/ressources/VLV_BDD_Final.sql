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
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 80, 'Artisan', 'Zabrat', 'Gard', 'Azerbaijan');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 23, 'Arkansas', 'Dongdong', 'Loire', 'China');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 51, 'Kipling', 'Golmud', 'Rhone', 'China');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 35, 'Loftsgordon', 'Leme', 'Alpes', 'Brazil');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 20, 'John Wall', 'Tipitapa', 'Pyrenees', 'Nicaragua');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 100, 'Roth', 'Doudleby nad', 'Nord', 'Czech Republic');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 41, 'Waxwing', 'Igbeti', 'Ain', 'Nigeria');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 93, 'Bobwhite', 'Rakiv Lis', 'Var', 'Ukraine');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 2, 'School', 'Lembang', 'Ain', 'Indonesia');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 70, 'Dottie', 'Jiuquan', 'Gard', 'China');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 61, 'Springview', 'AndalucÃ­a', 'Gard', 'Colombia');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 23, 'Iowa', 'Butel', 'Ain', 'Macedonia');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 40, 'West', 'Xiaozhen', 'Ain', 'China');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 81, 'Spenser', 'Jingping', 'Gers', 'China');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 82, 'Bultman', 'Longnawang', 'Gard', 'Indonesia');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 16, 'Coolidge', 'Sulow', 'Gers', 'Poland');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 35, 'Manitowish', 'Cavadas', 'Gard', 'Portugal');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 60, 'Dwight', 'Leigongjian', 'Herault', 'China');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 92, 'Merchant', 'Zapolyarnyy', 'Herault', 'Russia');
INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, 48, 'Bartelt', 'Perzow', 'Herault', 'Poland');


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
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Choudhury', 'Austine', 'achoudhury0@4shared.com', to_date('28-09-1970', 'DD-MM-YYYY'), 0579816063, 3);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Abramson', 'Morten', 'mabramson1@blogs.com', to_date('20-12-1981','DD-MM-YYYY'), 0597391453, 1);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Bastien', 'Gouzerch', 'bg@wanadoo.fr', to_date('20-12-1993','DD-MM-YYYY'), 0597391453, 19);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Rollins', 'Christabel', 'crollins3@issuu.com', to_date('14-12-1976','DD-MM-YYYY'), 0522442131, 4);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'McGauhy', 'Lotta', 'lmcgauhy4@g.co', to_date('30-11-1974','DD-MM-YYYY'), 0027582033, 13);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Bend', 'Rem', 'rbend5@skyrock.com', to_date('24-05-1978','DD-MM-YYYY'),  0105433963, 5);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Torricina', 'Zachery', 'ztorricina6@bluehost.com', to_date('08-05-1963','DD-MM-YYYY'), 0260594157, 2);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Lambart', 'Chip', 'clambart7@ehow.com', to_date('05-02-1998','DD-MM-YYYY'), 0663438471, 6);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Isgar', 'Kristin', 'kisgar8@myspace.com', to_date('06-10-1974','DD-MM-YYYY'), 0587051583, 7);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Pipes', 'Omero', 'opipes9@hexun.com', to_date('19-04-1996','DD-MM-YYYY'), 0764499313, 8);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Coggill', 'Gusty', 'gcoggilla@shutterfly.com', to_date('07-09-1965','DD-MM-YYYY'), 0224241854, 9);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Coton', 'Fannie', 'fcotonb@cmu.edu', to_date('10-05-1969','DD-MM-YYYY'), 0612553287, 17);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Goodrum', 'Bran', 'bgoodrumc@zimbio.com', to_date('02-04-1978','DD-MM-YYYY'), 0901462956, 10);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Tomovic', 'Edmon', 'etomovicd@wix.com', to_date('22-11-1976','DD-MM-YYYY'), 0089600612, 11);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'O''Dulchonta', 'Keen', 'kodulchontae@salon.com', to_date('07-11-1976','DD-MM-YYYY'), 0994269913, 12);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Lockless', 'Harmon', 'hlocklessf@jimdo.com', to_date('08-11-1978','DD-MM-YYYY'), 0067161120, 14);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Towns', 'Ulysses', 'utownsg@skyrock.com', to_date('25-02-1994','DD-MM-YYYY'), 0549179812, 15);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Buckles', 'Maxwell', 'mbucklesh@senate.gov', to_date('22-07-1999','DD-MM-YYYY'), 0684842766, 16);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'Thomesson', 'Cal', 'cthomessoni@google.co.jp', to_date('31-07-1971','DD-MM-YYYY'), 0747523041, 18);
INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, 'O''Nion', 'Shalne', 'sonionj@github.io', to_date('19-08-1990','DD-MM-YYYY'), 0977402140, 12);


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
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 8);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 9);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 10);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 11);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 12);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 13);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 14);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 15);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 16);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 17);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 18);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 19);
INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, 20);




-- 4) CrÃ©ation de la table Centre
CREATE TABLE Centre(
    idCentre NUMBER NOT NULL,
    idAdresse NUMBER,
	nomCentre VARCHAR2(16) NOT NULL,
    CONSTRAINT pk_centre PRIMARY KEY (idCentre),
    CONSTRAINT fk_centre_idAdresse FOREIGN KEY (idAdresse) REFERENCES Adresse(idAdresse)
);

INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 1, 'CentreA');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 2, 'CentreB');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 3, 'CentreC');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 4, 'CentreD');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 5, 'CentreE');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 6, 'CentreF');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 7, 'CentreG');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 8, 'CentreH');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 9, 'CentreI');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 10, 'CentreJ');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 11, 'CentreK');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 12, 'CentreL');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 13, 'CentreM');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 14, 'CentreN');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 15, 'CentreO');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 16, 'CentreP');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 17, 'CentreQ');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 18, 'CentreR');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 19, 'CentreS');
INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_centre_sequence.nextval, 20, 'CentreT');

-- 5) CrÃ©ation de la table Moniteur
CREATE TABLE Moniteur(
    idMoniteur NUMBER NOT NULL,
    idPersonnel NUMBER NOT NULL,
    idCentre NUMBER,
    CONSTRAINT pk_moniteur PRIMARY KEY (idMoniteur),
    CONSTRAINT fk_moniteur_idPersonnel FOREIGN KEY (idPersonnel) REFERENCES Personnel(idPersonnel),
    CONSTRAINT fk_moniteur_idCentre FOREIGN KEY (idCentre) REFERENCES Centre(idCentre)
);
INSERT INTO Moniteur (idMoniteur,  idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 1, 1);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 2, 2);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 3, 3);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 4, 4);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 5, 5);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 6, 6);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 7, 7);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 8, 8);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 9, 9);
INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, 10, 10);




-- 6) CrÃ©ation de la table Responsable
CREATE TABLE Responsable(
    idResponsable NUMBER NOT NULL,
    idPersonnel NUMBER  NOT NULL,
    idCentre NUMBER,
    CONSTRAINT pk_responsable PRIMARY KEY (idResponsable),
    CONSTRAINT fk_responsable_idPersonnel FOREIGN KEY (idPersonnel) REFERENCES Personnel(idPersonnel),
    CONSTRAINT fk_responsable_idCentre FOREIGN KEY (idCentre) REFERENCES Centre(idCentre)
);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 11, 11);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 12, 2);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 13, 3);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 14, 4);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 15, 5);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 16, 16);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 17, 17);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 18, 18);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 19, 19);
INSERT INTO Responsable (idResponsable, idPersonnel, idCentre) VALUES (id_responsable_sequence.nextval, 20, 20);


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
INSERT INTO AffectHabilitation (idMoniteur, idHabilitation) VALUES (1, 1);
INSERT INTO AffectHabilitation (idMoniteur, idHabilitation) VALUES (2, 1);
INSERT INTO AffectHabilitation (idMoniteur, idHabilitation) VALUES (3, 1);
INSERT INTO AffectHabilitation (idMoniteur, idHabilitation) VALUES (4, 2);
INSERT INTO AffectHabilitation (idMoniteur, idHabilitation) VALUES (5, 4);
INSERT INTO AffectHabilitation (idMoniteur, idHabilitation) VALUES (6, 2);
INSERT INTO AffectHabilitation (idMoniteur, idHabilitation) VALUES (7, 3);
INSERT INTO AffectHabilitation (idMoniteur, idHabilitation) VALUES (8, 3);
INSERT INTO AffectHabilitation (idMoniteur, idHabilitation) VALUES (9, 4);



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

INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'Confirme', 10, 1);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'Confirme', 50, 2);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'Confirme', 20, 3);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'Confirme', 20, 4);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua Junior', 'Confirme', 40, 5);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Raquette', 'Artengo', 'Modele adulte', 'Confirme', 4, 5);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Raquette', 'Artengo', 'Modele adulte', 'Confirme', 40, 6);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Raquette', 'Artengo', 'Modele adulte', 'Confirme', 10, 7);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Raquette', 'Artengo', 'Modele adulte', 'Confirme', 8, 8);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Ballon', 'Fifa', 'World Cup 2006', 'Confirme', 5, 9);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Ballon', 'Fifa', 'World Cup 2006', 'Confirme', 15, 10);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Ballon', 'Fifa', 'World Cup 2006', 'Confirme', 25, 11);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Ballon', 'Fifa', 'World Cup 2006', 'Confirme', 50, 12);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Bottes', 'PassionCheval', 'Modele Enfant', 'Debutant', 10, 11);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Bottes', 'PassionCheval', 'Modele Enfant', 'Debutant', 900, 3);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Bottes', 'PassionCheval', 'Modele Enfant', 'Debutant', 20, 5);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Bottes', 'PassionCheval', 'Modele Enfant', 'Debutant', 10, 6);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Bottes', 'PassionCheval', 'Modele Enfant', 'Debutant', 50, 7);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Bottes', 'PassionCheval', 'Modele Enfant', 'Debutant', 80, 9);
INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Bottes', 'PassionCheval', 'Modele Enfant', 'Debutant', 10, 10);







-- 10) CrÃ©ation de la table Stagiaire
CREATE TABLE Stagiaire(
    idStagiaire NUMBER NOT NULL,
    dateDebut DATE NOT NULL,
    dateFin DATE NOT NULL,
    idPersonne NUMBER NOT NULL,
    CONSTRAINT pk_stagiaire PRIMARY KEY (idStagiaire),
    CONSTRAINT fk_idPersonne_stagiaire FOREIGN KEY (idPersonne) REFERENCES Personne(idPersonne)
);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('30-10-2017','DD-MM-YYYY'), to_date('08-03-2017','DD-MM-YYYY'), 1);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('30-09-2017','DD-MM-YYYY'), to_date('11-06-2017','DD-MM-YYYY'), 2);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('19-12-2016','DD-MM-YYYY'), to_date('08-02-2017','DD-MM-YYYY'), 3);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('19-02-2017','DD-MM-YYYY'), to_date('13-12-2016','DD-MM-YYYY'), 4);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('15-12-2016','DD-MM-YYYY'), to_date('27-06-2017','DD-MM-YYYY'), 5);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('19-07-2017','DD-MM-YYYY'), to_date('19-12-2016','DD-MM-YYYY'), 6);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('02-01-2017','DD-MM-YYYY'), to_date('22-03-2017','DD-MM-YYYY'), 1);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('04-05-2017','DD-MM-YYYY'), to_date('15-05-2017','DD-MM-YYYY'), 2);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('28-06-2017','DD-MM-YYYY'), to_date('21-05-2017','DD-MM-YYYY'), 2);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('21-03-2017','DD-MM-YYYY'), to_date('06-09-2017','DD-MM-YYYY'), 2);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('07-08-2017','DD-MM-YYYY'), to_date('17-06-2017','DD-MM-YYYY'), 2);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('27-03-2017','DD-MM-YYYY'), to_date('04-10-2017','DD-MM-YYYY'), 2);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('09-05-2017','DD-MM-YYYY'), to_date('07-04-2017','DD-MM-YYYY'), 2);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('10-01-2017','DD-MM-YYYY'), to_date('28-10-2017','DD-MM-YYYY'), 5);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('06-04-2017','DD-MM-YYYY'), to_date('28-09-2017','DD-MM-YYYY'), 5);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('23-09-2017','DD-MM-YYYY'), to_date('06-08-2017','DD-MM-YYYY'), 5);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('18-08-2017','DD-MM-YYYY'), to_date('21-08-2017','DD-MM-YYYY'), 5);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('06-04-2017','DD-MM-YYYY'), to_date('13-01-2017','DD-MM-YYYY'), 5);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('02-04-2017','DD-MM-YYYY'), to_date('11-08-2017','DD-MM-YYYY'), 5);
INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, to_date('03-11-2016','DD-MM-YYYY'), to_date('07-01-2017','DD-MM-YYYY'), 3);


-- 11) CrÃ©ation de la table Activite
CREATE TABLE Activite(
    idActivite NUMBER NOT NULL,
    nom VARCHAR2(16) NOT NULL,
    categorie VARCHAR2(32),
    nbStagiaire NUMBER NOT NULL,
    nbMoniteur NUMBER NOT NULL,
    idHabilitation NUMBER,
    CONSTRAINT pk_activite PRIMARY KEY (idActivite),
    CONSTRAINT fk_activite_habilitation FOREIGN KEY (idHabilitation) REFERENCES Habilitation(idHabilitation)
);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'posuere', 'In eleifend', 4, 1, 1);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'com', 'Maecenas', 2, 2, 2);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'id', 'Fusce', 3, 1, 3);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'nisl', 'Morbi', 9, 2, 4);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'nulla', 'Aliquam', 5, 1, 1);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'quam', 'Aenean fermentum', 3, 2, 2);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'diam', 'Donec dapibus', 7, 1, 3);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'aliquet', 'Morbi non lectus', 9, 2, 4);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'ante', 'Morbi quis', 10, 1, 3);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'mauris', 'Nam ultrices', 8, 1, 2);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'diam', 'In eleifend', 2, 2, 1);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'convallis', 'Nunc purus', 4, 2, 2);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'luctus', 'In quis justo', 9, 2, 3);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'sapien', 'Aliquam sit', 8, 2, 3);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'sed', 'Morbi a ipsum', 4, 2, 1);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'in', 'Morbi a ipsum', 9, 1, 1);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'ante', 'Pellentesque', 7, 2, 1);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'vivamus', 'Vestibulum', 8, 2, 1);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'nascetur', 'Vestibulum', 2, 2, 1);
INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, 'id', 'Sed sagittis', 9, 2, 2);


-- 12) CrÃ©ation de la table ListeActivite
CREATE TABLE ListeActivite(
    idActivite NUMBER NOT NULL,
    idCentre NUMBER NOT NULL,
    CONSTRAINT pk_listeactivite PRIMARY KEY (idActivite,idCentre),
    CONSTRAINT fk_listeactivite_idActivite FOREIGN KEY (idActivite) REFERENCES Activite(idActivite),
    CONSTRAINT fk_listeactivite_idCentre FOREIGN KEY (idCentre) REFERENCES Centre(idCentre)
);

INSERT INTO ListeActivite (idActivite, idCentre) VALUES (1, 1);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (1, 2);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (1, 5);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (2, 6);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (2, 8);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (2, 7);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (5, 9);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (5, 5);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (6, 4);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (6, 6);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (7, 12);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (8, 15);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (9, 14);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (9, 2);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (11, 3);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (13, 1);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (13, 2);
INSERT INTO ListeActivite (idActivite, idCentre) VALUES (1, 10);




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
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (10, 4);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (11, 4);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (12, 4);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (13, 2);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (14, 2);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (15, 3);
INSERT INTO Inscription (idStagiaire, idCentre) VALUES (16, 3);



-- 14) CrÃ©ation de la table Groupe
CREATE TABLE Groupe(
    idGroupe NUMBER NOT NULL,
    niveau VARCHAR2(32),
    idCentre NUMBER NOT NULL,
    CONSTRAINT pk_groupe PRIMARY KEY (idGroupe),
    CONSTRAINT fk_groupe_idCentre FOREIGN KEY (idCentre) REFERENCES Centre(idCentre)
);

INSERT INTO Groupe (idGroupe, niveau, idCentre) VALUES (id_groupe_sequence.nextval, 'Debutant', 1);
INSERT INTO Groupe (idGroupe, niveau, idCentre) VALUES (id_groupe_sequence.nextval, 'Debutant', 1);
INSERT INTO Groupe (idGroupe, niveau, idCentre) VALUES (id_groupe_sequence.nextval, 'Confirme', 1);
INSERT INTO Groupe (idGroupe, niveau, idCentre) VALUES (id_groupe_sequence.nextval, 'Confirme', 2);
INSERT INTO Groupe (idGroupe, niveau, idCentre) VALUES (id_groupe_sequence.nextval, 'Confirme', 2);
INSERT INTO Groupe (idGroupe, niveau, idCentre) VALUES (id_groupe_sequence.nextval, 'Confirme', 2);
INSERT INTO Groupe (idGroupe, niveau, idCentre) VALUES (id_groupe_sequence.nextval, 'Expert', 3);
INSERT INTO Groupe (idGroupe, niveau, idCentre) VALUES (id_groupe_sequence.nextval, 'Expert', 3);
INSERT INTO Groupe (idGroupe, niveau, idCentre) VALUES (id_groupe_sequence.nextval, 'Debutant', 3);


-- 15) CrÃ©ation de la table AffectGroupe
CREATE TABLE AffectGroupe(
    idGroupe NUMBER NOT NULL,
    idStagiaire NUMBER NOT NULL,
    CONSTRAINT pk_affectgroupe PRIMARY KEY (idGroupe,idStagiaire),
    CONSTRAINT fk_affectgroupe_idGroupe FOREIGN KEY (idGroupe) REFERENCES Groupe(idGroupe),
    CONSTRAINT fk_affectgroupe_idStagiaire FOREIGN KEY (idStagiaire) REFERENCES Stagiaire(idStagiaire)
);

INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1, 1);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1, 2);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1, 3);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1, 4);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1, 5);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1, 6);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1, 7);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1, 8);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (1, 9);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (2, 10);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (2, 11);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (2, 12);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (2, 13);
INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (2, 14);



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
INSERT INTO Seance VALUES (id_seance_sequence.nextval, DATE '2017-05-09', TIMESTAMP '2017-05-09 9:00:00', TIMESTAMP '2017-05-09 11:00:00', 1);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, DATE '2017-05-10', TIMESTAMP '2017-05-10 9:00:00', TIMESTAMP '2017-05-10 12:00:00', 2);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, DATE '2017-05-11', TIMESTAMP '2017-05-11 10:00:00', TIMESTAMP '2017-05-11 10:00:00', 3);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, DATE '2017-05-12', TIMESTAMP '2017-05-12 13:30:00', TIMESTAMP '2017-05-12 18:30:00', 1);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, DATE '2017-05-13', TIMESTAMP '2017-05-13 13:50:00', TIMESTAMP '2017-05-13 17:30:00', 2);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, DATE '2017-05-14', TIMESTAMP '2017-05-14 13:00:00', TIMESTAMP '2017-05-14 16:40:00', 5);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, DATE '2017-05-15', TIMESTAMP '2017-05-15 13:20:00', TIMESTAMP '2017-05-15 15:10:00', 6);
INSERT INTO Seance VALUES (id_seance_sequence.nextval, DATE '2017-05-16', TIMESTAMP '2017-05-16 13:10:00', TIMESTAMP '2017-05-16 18:00:00', 4);


-- 17) CrÃ©ation de la table Stage
CREATE TABLE Stage(
    idGroupe NUMBER NOT NULL,
    idSeance NUMBER NOT NULL,
    CONSTRAINT pk_stage PRIMARY KEY (idGroupe,idSeance),
    CONSTRAINT fk_stage_idGroupe FOREIGN KEY (idGroupe) REFERENCES Groupe(idGroupe),
    CONSTRAINT fk_stage_idSeance FOREIGN KEY (idSeance) REFERENCES Seance(idSeance)
);
INSERT INTO Stage (idGroupe, idSeance) VALUES (1, 1);
INSERT INTO Stage (idGroupe, idSeance) VALUES (1, 2);
INSERT INTO Stage (idGroupe, idSeance) VALUES (1, 3);
INSERT INTO Stage (idGroupe, idSeance) VALUES (2, 1);
INSERT INTO Stage (idGroupe, idSeance) VALUES (2, 2);
INSERT INTO Stage (idGroupe, idSeance) VALUES (2, 3);


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
INSERT INTO AffectMateriel (idMateriel, idSeance) VALUES (4, 8);
INSERT INTO AffectMateriel (idMateriel, idSeance) VALUES (5, 6);
INSERT INTO AffectMateriel (idMateriel, idSeance) VALUES (6, 7);
INSERT INTO AffectMateriel (idMateriel, idSeance) VALUES (1, 4);
INSERT INTO AffectMateriel (idMateriel, idSeance) VALUES (2, 5);


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
INSERT INTO MaterielNecessaire (idMateriel, idActivite) VALUES (4, 4);
INSERT INTO MaterielNecessaire (idMateriel, idActivite) VALUES (5, 5);
INSERT INTO MaterielNecessaire (idMateriel, idActivite) VALUES (6, 6);

