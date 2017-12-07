package vlv;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLDataException;
import java.sql.SQLException;
import java.util.InputMismatchException;
import java.util.Scanner;

public class Responsable extends Personnel {

	/**
	 * Attribut statique permettant de récupérer les choix saisis par le
	 * responsable. Cet attribut est purement lié à l'application, pas du tout à la
	 * modélisation.
	 */
	private static Scanner scanner = new Scanner(System.in);

	/**
	 * Identifiant de connexion que le responsable saisit quand il se connecte à
	 * l'application.
	 */
	private static int myLoginID;
	private static int myCentreID;

	/**
	 * Attributs du Responsable
	 */
	private static Centre centreGere;

	/**
	 * Le constructeur permet d'instancier un Responsable dans le but de l'ajouter à
	 * l'application et à la BDD.
	 */
	public Responsable() {
		try {
			System.out.println("===============");
			System.out.println("| Responsable |");
			System.out.println("===============");

			System.out.println("Nom :");
			this.nom = scanner.nextLine();

			System.out.println("Prénom :");
			this.prenom = scanner.nextLine();

			System.out.println("Mail :");
			this.mail = scanner.nextLine();

			System.out.println("Date de Naissance (format DDMMYYYY) :");
			this.dateDeNaissance = new java.sql.Date(scanner.nextLong());
			scanner.nextLine();

			System.out.println("Telephone (format 0466691231) :");
			this.tel = scanner.nextInt();
			scanner.nextLine();
		} catch (InputMismatchException e) {
			System.err.println("Vous venez de faire une erreur de frappe !");
		}
	}

	/**
	 * Fonction appelée en premier, permettant au responsable de se log et d'appeler
	 * la fonction principale.
	 */
	static void LoginResponsable() {
		demanderIdResponsable();
		UIResponsable();
	}

	/**
	 * Fonction principale gérant l'interface du responsable
	 */
	static void UIResponsable() {
		while (true) {
			afficherMenuResponsable();
			traitementChoixMenuResponsable();
		}
	}

	/**
	 * Fonction permettant au responsable de se log.
	 */
	private static void demanderIdResponsable() {
		try {
			Connection con = ConnexionDB.getConnection();
			System.out.println("Bonjour Responsable, quel est votre identifiant ?");
			executerEtAfficherSelect(con, "SELECT * FROM Responsable");
			myLoginID = scanner.nextInt();
			// TODO : Gérer le range du scan

			/*
			 * On récupère le nom et le prénom du responsable, juste pour le côté
			 * user-friendly
			 */
			executerEtAfficherSelect(con,"SELECT DISTINCT p.nom, p.prenom FROM personne p "
					+ "WHERE p.idPersonne = (SELECT DISTINCT idpersonne FROM personnel "
					+ "WHERE idpersonnel = (SELECT DISTINCT idpersonnel FROM responsable "
					+ "WHERE idresponsable = "+ myLoginID + "))");

			/*
			 * On récupère l'id du Centre
			 */
			PreparedStatement selectIDCentre = con
					.prepareStatement("SELECT idCentre FROM Responsable WHERE idResponsable = " + myLoginID);
			ResultSet resultatSelectIDCentre = selectIDCentre.executeQuery();

			int idCentre = 0;
			while (resultatSelectIDCentre.next()) {
				idCentre = resultatSelectIDCentre.getInt("idCentre");
			}
			if (idCentre != 0)
				myCentreID = idCentre;
			else
				throw new SQLException();

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private static void gererHabilitation() {
		System.out.flush();
		System.out.println("==================================");
		System.out.println("1. Ajouter une nouvelle habilitation");
		System.out.println("2. Supprimer une habilitation");
		System.out.println("3. Afficher les habilitations du centre");
		System.out.println("4. Retourner au menu principal");
		System.out.println("==================================");
		traitementChoixMenuGererHabilitation();
	}

	private static void traitementChoixMenuGererHabilitation() {

		switch (scanner.nextInt()) {
		case 1:
			ajouterHabilitation();
			break;
		case 2:
			supprimerHabilitation();
			break;
		case 3:
			afficherHabilitation();
			break;
		case 4:
			UIResponsable();
			break;
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			gererHabilitation();
			break;
		}
	}

	private static void afficherHabilitation() {
		try {
			Connection con = ConnexionDB.getConnection();
			executerEtAfficherSelect(con, "SELECT * FROM Habilitation");
		} 
		catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private static void ajouterHabilitation() {
		try {
			Connection con = ConnexionDB.getConnection();

			/*
			 * Le constructeur fait appel à un scanner pour remplir les champs de
			 * l'habilitation.
			 */
			Habilitation habilitation = new Habilitation();

			/*
			 * On insère l'habilitation du centre dans la BDD
			 */
			PreparedStatement insertHabilitation = con.prepareStatement(
					"INSERT INTO Habilitation (idHabilitation, habilitation) VALUES (id_habilitation_sequence.nextval, ?)");
			insertHabilitation.setObject(1, habilitation.getHabilitation());
			insertHabilitation.executeQuery();
			System.out.println("Habilitation ajoutée.");

		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
			gererMoniteur();
		}
	}

	private static void supprimerHabilitation() {
		try {
			Connection con = ConnexionDB.getConnection();

			/**
			 * On affiche tous les habilitations
			 */
			executerEtAfficherSelect(con, "SELECT * FROM Habilitation");

			
			/*
			 * Choix de l'id Habilitation pour la supprimer dans la base de données
			 */
			System.out.println("Veuillez choisir l'id de l'habilitation à supprimer : ");
			int idHabilitation = scanner.nextInt();
			
			
			/*
			 * On supprime les affectations qui sont liées à cette habilitation
			 */
			PreparedStatement requeteDeleteAffectHabilitation = con
					.prepareStatement("DELETE FROM AffectHabilitation WHERE idHabilitation=" + idHabilitation);

			// TODO : Pour des raisons obscures, l'executeQuery est bloquante quand il n'y a
			// pas de tuples dans la table.
			// Je commente donc la ligne pour les tests unitaires.
			requeteDeleteAffectHabilitation.executeQuery();
			System.out.println("affectHabilitation supprimé");

			/*
			 * On modifie les habilitations dans les activites a null
			 */
			// TODO : On ne devrait pas plutôt supprimer l'activité ? (question de logique,
			// mais au pire c'est pas indispensable)
			PreparedStatement updateActivite = con
					.prepareStatement("UPDATE Activite SET idHabilitation=NULL WHERE idHabilitation=" + idHabilitation);

			// TODO : Pour des raisons obscures, l'executeQuery est bloquante quand il n'y a
			// pas de tuples dans la table.
			updateActivite.executeQuery();

			/*
			 * On supprime l'habilitation dans la BDD
			 */
			PreparedStatement suppressionHabilitation = con
					.prepareStatement("DELETE FROM Habilitation WHERE idHabilitation = " + idHabilitation);
			suppressionHabilitation.executeQuery();
			System.out.println("Habilitation " + idHabilitation + " supprimée.");

		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
			UIResponsable();
		}
	}

	private static void gererMoniteur() {
		// TODO SQL
		System.out.flush();
		System.out.println("==================================");
		System.out.println("1. Ajouter un nouveau moniteur");
		System.out.println("2. Supprimer un moniteur");
		System.out.println("3. Affecter un moniteur à une séance");
		System.out.println("4. Afficher les moniteurs");
		System.out.println("5. Retourner au menu principal");
		System.out.println("==================================");
		traitementChoixMenuGererMoniteur();
	}
	

	private static void traitementChoixMenuGererMoniteur() {

		switch (scanner.nextInt()) {
		case 1:
			ajouterMoniteur();
			break;
		case 2:
			supprimerMoniteur();
			break;
		case 3:
			affecterMoniteurSeance();
			break;
		case 4:
			Connection con;
			try {
			con = ConnexionDB.getConnection();
			executerEtAfficherSelect(con , "SELECT DISTINCT per.nom, per.prenom, m.idmoniteur FROM Moniteur m, Personnel p, Personne per "
					+ "WHERE m.idPersonnel = p.idPersonnel "
					+ "AND per.idPersonne = p.idpersonnel "
					+ "AND m.idCentre = "+ myCentreID);
 
			} catch (SQLException e) {
				e.printStackTrace();
			}
			break;
		case 5:
			UIResponsable();
			break;
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			gererMoniteur();
			break;
		}
	}

	/**
	 * Ordre de création des tables : </br>
	 * [Adresse] --> [Personne] --> [Personnel] --> [Moniteur]
	 */
	private static void ajouterMoniteur() {
		try {
			Connection con = ConnexionDB.getConnection();

			/*
			 * Le constructeur fait appel à un scanner pour remplir les champs de l'adresse.
			 */
			Adresse adresseMoniteur = new Adresse();

			/*
			 * On insère l'adresse du responsable dans la BDD
			 */
			PreparedStatement insertAdresse = con.prepareStatement(
					"INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, ?, ?, ?, ?, ?)");
			insertAdresse.setObject(1, adresseMoniteur.getNumRue());
			insertAdresse.setObject(2, adresseMoniteur.getRue());
			insertAdresse.setObject(3, adresseMoniteur.getDepartement());
			insertAdresse.setObject(4, adresseMoniteur.getVille());
			insertAdresse.setObject(5, adresseMoniteur.getPays());
			insertAdresse.executeQuery();
			System.out.println("Adresse ajoutée.");

			/*
			 * Il faut récupérer l'idAdresse précédemment créée pour la requête de la
			 * création de la Personne.
			 */
			PreparedStatement selectidAdresse = con.prepareStatement("SELECT DISTINCT idAdresse FROM Adresse WHERE "
					+ "numRue = " + adresseMoniteur.getNumRue() + " "
					+ "AND rue = '" + adresseMoniteur.getRue() + "' "
					/*+ "AND ville = '" + adresseMoniteur.getVille() + "' " 
					+ "AND departement = '"+ adresseMoniteur.getDepartement() + "' " 
					+ "AND pays = '" + adresseMoniteur.getPays() + "'"*/);
			ResultSet resultatSelectIdAdresse = selectidAdresse.executeQuery();

			int idAdresse = 0;
			while (resultatSelectIdAdresse.next()) {
				idAdresse = resultatSelectIdAdresse.getInt("idAdresse");
			}
			/*
			 * Le constructeur fait appel à un scanner pour remplir les champs Personne du
			 * moniteur.
			 */
			Moniteur moniteur = new Moniteur();

			PreparedStatement requeteSQLPersonne = con.prepareStatement(
					"INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, ?, ?, ?, ?, ?, ?)");
			requeteSQLPersonne.setObject(1, moniteur.getNom());
			requeteSQLPersonne.setObject(2, moniteur.getPrenom());
			requeteSQLPersonne.setObject(3, moniteur.getMail());
			requeteSQLPersonne.setObject(4, moniteur.getDateDeNaissance());
			requeteSQLPersonne.setObject(5, moniteur.getTel());
			requeteSQLPersonne.setObject(6, idAdresse);
			requeteSQLPersonne.executeQuery();
			System.out.println("Personne ajoutée.");

			/*
			 * Il faut récupérer l'idPersonne pour la requête qui suit (celle de la création
			 * du Personnel)
			 */
			PreparedStatement selectIdPersonne = con
					.prepareStatement("SELECT DISTINCT idPersonne FROM Personne WHERE nom = '" + moniteur.getNom()
							+ "'"/* +" AND prenom = '"+rue */);
			ResultSet resultatSelectIdPersonne = selectIdPersonne.executeQuery();

			int idPersonne = 0;
			while (resultatSelectIdPersonne.next()) {
				idPersonne = resultatSelectIdPersonne.getInt("idPersonne");
			}
			System.out.println("idPersonne : " + idPersonne);

			PreparedStatement insertPersonnel = con.prepareStatement(
					"INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, "
							+ idPersonne + ")");
			insertPersonnel.executeQuery();
			System.out.println("Personnel ajouté.");

			/*
			 * Il faut récupérer l'idPersonnel pour la requête qui suit (celle de la
			 * création du Moniteur)
			 */
			PreparedStatement selectIdPersonnel = con
					.prepareStatement("SELECT DISTINCT idPersonnel FROM Personnel WHERE idPersonne = " + idPersonne);
			ResultSet resultatSelectIdPersonnel = selectIdPersonnel.executeQuery();

			int idPersonnel = 0;
			while (resultatSelectIdPersonnel.next()) {
				idPersonnel = resultatSelectIdPersonnel.getInt("idPersonnel");
			}
			System.out.println("idPersonnel : " + idPersonnel);

			/*
			 * NB : L'attribut "IdCentre" de la table Responsable n'est pas remplit ici
			 * puisqu'il s'agit d'un autre usecase de l'Administrateur.
			 */

			PreparedStatement insertResponsable = con.prepareStatement(
					"INSERT INTO Moniteur (idMoniteur, idPersonnel, idCentre) VALUES (id_moniteur_sequence.nextval, " + idPersonnel + ", " + myCentreID + ")");
			insertResponsable.executeQuery();
			System.out.println("Moniteur ajouté.");

		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
			gererMoniteur();
		}
	}

	/**
	 * Suppression successives des tables : [AffectHabilitation] & [Encadre] Puis du
	 * tuple présent dans Moniteur.
	 */
	private static void supprimerMoniteur() {
		try {
			Connection con = ConnexionDB.getConnection();

			/**
			 * On affiche tous les moniteurs
			 */
			executerEtAfficherSelect(con, "SELECT * FROM Moniteur WHERE idCentre=" + myCentreID);

			/*
			 * Choix de l'id du moniteur pour le supprimer dans la base de données
			 */
			System.out.println("Veuillez choisir l'id du moniteur à supprimer");
			int idmoniteur = scanner.nextInt();

			/*
			 * On supprime les affectations qui contiennent ce moniteur
			 */
			PreparedStatement requeteDeleteHabilitation = con.prepareStatement("DELETE FROM AffectHabilitation WHERE idMoniteur=?");
			requeteDeleteHabilitation.setObject(1, idmoniteur);
			requeteDeleteHabilitation.executeQuery();
			System.out.println("|- AffectHabilitation supprimé.");

			/*
			 * On supprime les encadrements qui contiennent ce moniteur
			 */
			PreparedStatement requeteDeleteEncadre = con.prepareStatement("DELETE FROM Encadre WHERE idMoniteur=?");
			requeteDeleteEncadre.setObject(1, idmoniteur);
			requeteDeleteEncadre.executeQuery();
			System.out.println("|- Encadre supprimé.");

			/*
			 * On supprime le moniteur dans la BDD
			 */
			PreparedStatement requeteDeleteMoniteur = con.prepareStatement("DELETE FROM Moniteur WHERE idMoniteur=?");
			requeteDeleteMoniteur.setObject(1, idmoniteur);
			requeteDeleteMoniteur.executeQuery();
			System.out.println("|_ Moniteur supprimé.");

		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
			gererMoniteur();
			// e.printStackTrace();
		}
	}

	private static void affecterMoniteurSeance() {
		try {
			Connection con = ConnexionDB.getConnection();

			System.out.println("Choisir une séance:");
			executerEtAfficherSelect(con, "SELECT DISTINCT * FROM Seance");
			int idSeance = scanner.nextInt();

			/*
			 *  On affiche les moniteurs ayant une habilitation pour l'activité de la séance
			 *  On cherche parmi les moniteurs qui ne participent pas déjà à la séance
			 */
						
			System.out.println("Choisir un moniteur à affecter :");
/*			executerEtAfficherSelect(con, "SELECT DISTINCT m.idMoniteur FROM Encadre e, Moniteur m, AffectHabilitation ah, Habilitation h, Activite a, Seance s "
					+ "WHERE s.idSeance=" + idSeance + " "
					+ "AND s.idActivite=a.idActivite "
					+ "AND a.idHabilitation=h.idHabilitation "
					+ "AND ah.idHabilitation=h.idHabilitation AND m.idMoniteur=ah.idMoniteur "
					+ "AND e.idSeance !="+ idSeance + " "
					+ "AND e.idMoniteur=m.idMoniteur "  
					+ "AND m.idCentre = "+myCentreID);*/
            executerEtAfficherSelect(con,"SELECT idMoniteur FROM AffectHabilitation WHERE idHabilitation= (SELECT idHabilitatio FROM Activite WHERE idActivite =(SELECT idActivite FROM Seance WHERE idSeance = "+idSeance+")) EXCEPT SELECT idMoniteur FROM Encadre WHERE idSeance="+idSeance);
			int idMoniteur = scanner.nextInt();

			PreparedStatement affectMoniteur = con.prepareStatement("INSERT INTO Encadre (idMoniteur, idSeance) VALUES (?,?)");
			affectMoniteur.setInt(1, idMoniteur);
			affectMoniteur.setInt(2, idSeance);
			affectMoniteur.executeQuery();

			System.out.print("Moniteur affecté");
		}
		catch (SQLDataException vide) {
			return;
		}
		catch (SQLException e) {
			//e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
		} 
	}

	private static void gererSeance() {
		// TODO SQL
		System.out.flush();
		System.out.println("==================================");
		System.out.println("1. Ajouter une nouvelle séance");
		System.out.println("2. Supprimer une séance");
		System.out.println("3. Afficher les séances");
		System.out.println("4. Retourner au menu principal");
		System.out.println("==================================");
		traitementChoixMenuGererSeance();
	}

	private static void traitementChoixMenuGererSeance() {

		switch (scanner.nextInt()) {
		case 1:
			ajouterSeance();
			break;
		case 2:
			supprimerSeance();
			break;
		case 3:
			Connection con;
			try {
			con = ConnexionDB.getConnection();
			executerEtAfficherSelect(con , "SELECT DISTINCT * FROM Seance WHERE idactivite IN "
					+ "(SELECT DISTINCT idactivite FROM activite WHERE idactivite IN "
					+ "(SELECT DISTINCT idActivite FROM ListeActivite WHERE idCentre = "+ myCentreID +"))");
			 
			} catch (SQLException e) {
				e.printStackTrace();
			}
			break;
			
		case 4:
			UIResponsable();
			break;
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			gererSeance();
			break;
		}

	}



	private static void ajouterSeance() {
		// TODO SQL
		try {
			Connection con = ConnexionDB.getConnection();

			/*
			 * Création de la séance
			 */
			Seance seanceAjoute = new Seance();
            
            /*
            * Je choisis une activité qui est affecté dans mon centre
            */
			System.out.println("Choisissez l'activite de la séance :");
			executerEtAfficherSelect(con, "SELECT idActivite, nom FROM Activite WHERE idActivite IN (SELECT idActivite FROM ListeActivite WHERE idCentre="+myCentreID+")");
			int idActivite = scanner.nextInt();

			
			/*
			 * On recupère les moniteurs pouvant encadrer la séance
			 */
			System.out.println("Choisir un moniteur pour encadrer la séance: ");
/*			executerEtAfficherSelect(con,
					"SELECT DISTINCT m.idMoniteur FROM Moniteur m, Habilitation h, Activite a, AffectHabilitation af "
					+ "WHERE a.idHabilitation = af.idHabilitation "
					+ "AND af.idMoniteur = m.idMoniteur "
					+ "AND a.idActivite="+ idActivite);*/
			executerEtAfficherSelect(con,"SELECT DISTINCT idMoniteur FROM AffectHabilitation WHERE idHabilitation = (SELECT idHabilitation FROM Activite WHERE idActivite="+idActivite+")");
			int idMon = scanner.nextInt();
			

			System.out.println("Choix du groupe participant à la seance");
			/*
			 * On recupère les groupes pouvant participer à la seance
			 */
/*			PreparedStatement seance = con.prepareStatement("SELECT DISTINCT se.idSeance, se.heureDebut, se.heureFin, g.idGroupe "
					+ "FROM Stage s, Seance se, Groupe g, AffectGroupe aff, Stagiaire stag, Inscription insc "
					+ "WHERE g.idGroupe = aff.idGroupe"
					+ "AND aff.idStagiaire = stag.idStagiaire "
					+ "AND stag.idStagiaire = insc.idStagiaire "
					+ "AND insc.idCentre = 1 "
					+ "AND se.idSeance = s.idSeance "
					+ "AND s.idGroupe = g.idGroupe");*/
			// J'affiche les stagiaires qui sont libre à la date de la séance
			executerEtAfficherSelect(con,"SELECT DISTINCT idGroupe FROM AffectGroupe WHERE idStagiaire =" + 
					"    (SELECT DISTINCT idStagiaire FROM Stagiaire WHERE dateDebut < (SELECT DISTINCT  dateSeance FROM Seance)" + 
					" AND dateFin > (SELECT DISTINCT dateSeance FROM Seance))");
			int idGroup = scanner.nextInt();
			
			/*
			 *  Nombre de stagiaire pour la séance
			 */
			int nbStagiaire = 0;
			PreparedStatement requeteNbreSt = con.prepareStatement(
					"SELECT COUNT(idStagiaire) FROM AffectGroupe WHERE idGroupe = ?");
			requeteNbreSt.setInt(1, idGroup);
			ResultSet ResultatNbreStagiaire = requeteNbreSt.executeQuery();
			while (ResultatNbreStagiaire.next())
				nbStagiaire = ResultatNbreStagiaire.getInt(1);

			// On affecte le materiel à notre séance
			System.out.println("Choisir l'id Materiel à affecter:");
/*			executerEtAfficherSelect(con,
					"SELECT DISTINCT m.idMateriel, m.type, m.marque FROM Materiel m, MaterielNecessaire mn, Activite a WHERE mn.idActivite="
							+ idActivite + " AND mn.idMateriel = m.idMateriel AND m.idCentre=" + myCentreID
							+ " AND m.quantite >= " + nbStagiaire);*/
			executerEtAfficherSelect(con,"SELECT idMateriel FROM Materiel WHERE idCentre ="+myCentreID+" AND quantite >"+nbStagiaire);
			int idMateriel = scanner.nextInt();

			// On crée la séance
			PreparedStatement createSeance = con.prepareStatement(
					"INSERT INTO Seance (idSeance, dateSeance, heureDebut, heureFin, idActivite) VALUES (id_seance_sequence.nextval, ?, ?, ?, ?)");
			createSeance.setDate(2, (java.sql.Date) seanceAjoute.getDate());
			createSeance.setTimestamp(3, seanceAjoute.getHeureDebut());
			createSeance.setTimestamp(4, seanceAjoute.getHeureFin());
			createSeance.setInt(5, idActivite);
			createSeance.executeQuery();
			System.out.println("|- Création de la séance");

			// On recupère l'id de la séance que l'on vient de crée
			int idSeance = 0;
			PreparedStatement getSeance = con.prepareStatement(
					"SELECT idSeance FROM Seance WHERE dateSeance=? AND heureDebut=? AND heureFin=? AND idActivite=?");
			getSeance.setDate(1, (java.sql.Date) seanceAjoute.getDate());
			getSeance.setTimestamp(2, seanceAjoute.getHeureDebut());
			getSeance.setTimestamp(3, seanceAjoute.getHeureFin());
			getSeance.setInt(4, idActivite);
			ResultSet res = getSeance.executeQuery();
			
            while (res.next()){
				idSeance = res.getInt(1);
		    }
			// On assigne le moniteur
			PreparedStatement assMon = con.prepareStatement("INSERT INTO Encadre VALUES (?,?)");
			assMon.setInt(1, idMon);
			assMon.setInt(2, idSeance);
			assMon.executeQuery();
			System.out.println("|- Affectation d'un moniteur à la séance");
			

			// On assigne le groupe
			PreparedStatement assGroup = con.prepareStatement("INSERT INTO Stage VALUES (?,?)");
			assGroup.setInt(1, idGroup);
			assGroup.setInt(2, idSeance);
			assGroup.executeQuery();
			System.out.println("|- Affectation d'un groupe à la séance");

			// On assigne le materiel
			PreparedStatement assMat = con.prepareStatement("INSERT INTO AffectMateriel VALUES (?,?)");
			assMat.setInt(1, idMateriel);
			assMat.setInt(2, idSeance);
			assMat.executeQuery();
			System.out.println("|- Affectation du matériel à la séance");
			System.out.print("|_ Séance ajoutée");
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
		}
	}

	private static void supprimerSeance() {
		try {
			Connection con = ConnexionDB.getConnection();
			System.out.println("Entrez l'ID de la séance à supprimer :");
			executerEtAfficherSelect(con, "SELECT idSeance FROM Seance");
			int idSeance = scanner.nextInt();

			// On supprime les Encadre correspondant
			PreparedStatement delEnc = con.prepareStatement("DELETE FROM Encadre WHERE idSeance=" + idSeance);
			delEnc.executeQuery();

			// On supprime les materiels correspondant
			PreparedStatement delMat = con.prepareStatement("DELETE FROM AffectMateriel WHERE idSeance=" + idSeance);
			delMat.executeQuery();

			// On supprime le stage
			PreparedStatement delStage = con.prepareStatement("DELETE FROM Stage WHERE idSeance=" + idSeance);
			delStage.executeQuery();

			// On supprime la seance
			PreparedStatement delSeance = con.prepareStatement("DELETE FROM Seance WHERE idSeance=" + idSeance);
			delSeance.executeQuery();

			System.out.println("Séance supprimée");
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
		}
	}

	private static void gererActivite() {
		// TODO SQL
		System.out.flush();
		System.out.println("==================================");
		System.out.println("1. Ajouter une nouvelle activité");
		System.out.println("2. Supprimer une activité");
		System.out.println("3. Créer une activité");
		System.out.println("4. Afficher les activités");
		System.out.println("5. Retourner au menu principal");
		System.out.println("==================================");
		traitementChoixMenuGererActivite();
	}

	private static void traitementChoixMenuGererActivite() {

		switch (scanner.nextInt()) {
		case 1:
			ajouterActiviteAuCentre();
			break;
		case 2:
			supprimerActivite();
			break;
		case 3:
			creerNouvelleActivite();
			break;
		case 4: 
			Connection con;
			try {
			con = ConnexionDB.getConnection();
			executerEtAfficherSelect(con , "SELECT DISTINCT * FROM activite WHERE idactivite IN "
					+ "(SELECT DISTINCT idactivite FROM listeactivite WHERE idcentre = "+ myCentreID +")");
			 
			} catch (SQLException e) {
				e.printStackTrace();
			}
			break;
		case 5:
			UIResponsable();
			break;
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			gererActivite();
			break;
		}

	}

	private static void creerNouvelleActivite() {
		try {
			Connection con = ConnexionDB.getConnection();
			Activite activiteCreee = new Activite();

			PreparedStatement requeteInsertActivite = con.prepareStatement(
					"INSERT INTO Activite (idActivite, nom, categorie, nbStagiaire, nbMoniteur, idHabilitation) VALUES (id_activite_sequence.nextval, ?, ?, ?, ?, null)");
			requeteInsertActivite.setObject(1, activiteCreee.getNom());
			requeteInsertActivite.setObject(2, activiteCreee.getCategorie());
			requeteInsertActivite.setObject(3, activiteCreee.getNbStagiaire());
			requeteInsertActivite.setObject(4, activiteCreee.getNbMoniteurs());

			requeteInsertActivite.executeQuery();

			/*
			 * Demande de l'habilitation
			 */
			System.out.println("Faut-il une habilitation pour l'activite ?");
			System.out.println("1. Oui");
			System.out.println("2. Non");

			switch (scanner.nextInt()) {
			case 1:
				System.out.println("Quelle habilitation :");
				ConnexionDB.executerEtAfficherSelect(con, "SELECT * FROM Habilitation");
				activiteCreee.setHabilitationRequise(scanner.nextInt());
				break;

			case 2:
				break;

			default:
				throw new InputMismatchException();
			}

			/*
			 * Demande du matériel
			 */
			System.out.println("Faut-il du matériel pour l'activite ?");
			System.out.println("1. Oui");
			System.out.println("2. Non");

			switch (scanner.nextInt()) {
			case 1:
				System.out.println("Quel matériel voulez-vous ajouter ?");
				ConnexionDB.executerEtAfficherSelect(con, "SELECT * FROM Materiel WHERE idCentre = " + myCentreID);

				int idMaterielAjoute = scanner.nextInt();
				if (idMaterielAjoute == 0)
					break;

				/*
				 * On récupère l'idActivite juste créée avant
				 */
				PreparedStatement pr = con.prepareStatement("SELECT idActivite FROM Activite " + ""
						+ "WHERE nom = '"+ activiteCreee.getNom() + "' " 
						+ "AND categorie = '" + activiteCreee.getCategorie() + "' "
						+ "AND nbStagiaire = " + activiteCreee.getNbStagiaire() + " " 
						+ "AND nbMoniteur = " + activiteCreee.getNbMoniteurs());
				ResultSet rs = pr.executeQuery();

				int idActivite = 0;
				while (rs.next()) {
					idActivite = rs.getInt("idActivite");
				}
				System.out.println("idActivite : "+idActivite);
				System.out.println("centre : "+myCentreID);

				/*
				 * On crée un tuple MaterielNecessaire
				 */
				PreparedStatement requeteInsertMaterielActivite = con
						.prepareStatement("INSERT INTO MaterielNecessaire (idMateriel, idActivite) VALUES ("
								+ idMaterielAjoute + ", " + idActivite + ")");
				requeteInsertMaterielActivite.executeQuery();
				
				/*
				 * On ajoute l'activité au centre
				 */
				PreparedStatement requeteInsertActiviteListe = con
						.prepareStatement("INSERT INTO ListeActivite (idCentre, idActivite) VALUES ("+myCentreID+", "+idActivite+")");
				requeteInsertActiviteListe.executeQuery();
				break;
			case 2:
				break;

			default:
				throw new InputMismatchException();
			}

			System.out.println("Activité ajoutée.");
			
			
		} catch (InputMismatchException e) {
			gererActivite();
			System.err.println("Vous venez de faire une erreur de frappe !");
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private static void ajouterActiviteAuCentre() {
		try {
			// TODO : Faire en sorte de pouvoir choisir plusieurs activités à la suite.
			Connection con = ConnexionDB.getConnection();

			/*
			 * On propose à l'utilisateur d'ajouter une activité à son centre. On ne
			 * récupère que les activités qui ne sont pas dans la liste des activités déjà
			 * proposées par le centre.
			 */
			System.out.println("Entrez l'ID de l'activité à ajouter :");
			executerEtAfficherSelect(con,
					"SELECT DISTINCT idActivite, Nom FROM Activite WHERE idActivite NOT IN (SELECT DISTINCT idActivite FROM ListeActivite WHERE idCentre = "
							+ myCentreID + ")");
			int idActivitePourAjout = scanner.nextInt();

			/*
			 * On crée la table ListeActivité lié
			 */
			PreparedStatement requeteAjouterActivite = con
					.prepareStatement("INSERT INTO ListeActivite (idActivite, idCentre) VALUES (" + idActivitePourAjout
							+ ", " + myCentreID + ")");
			requeteAjouterActivite.executeQuery();

			System.out.println("Activite ajoutée.");

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private static void supprimerActivite() {
		try {
			Connection con = ConnexionDB.getConnection();
			System.out.println("Entrez l'ID de l'activité à supprimer :");
			executerEtAfficherSelect(con, "SELECT DISTINCT idActivite, nom FROM Activite WHERE idActivite IN (SELECT idActivite FROM ListeActivite WHERE idCentre = "+myCentreID +")");
			int idActivite = scanner.nextInt();
            
            // On doit supprimer toutes les séances associées à cette activité
            // On supprime les stages
			PreparedStatement requeteDeleteStage = con.prepareStatement("DELETE FROM Stage WHERE idSeance = (SELECT idSeance FROM Seance WHERE idActivite = " + idActivite +")");
			requeteDeleteStage.executeQuery();
			System.out.println("|- Suppression des stages de l'activité");
			
			// On supprime les encadrements des moniteurs
			PreparedStatement requeteDeleteEnc = con.prepareStatement("DELETE FROM Encadre WHERE idSeance = (SELECT idSeance FROM Seance WHERE idActivite = " + idActivite +")");
			requeteDeleteEnc.executeQuery();
			System.out.println("|- Suppression des encadrements des séances de l'activité");
			
			// On supprime les affectations matériels des séances
			PreparedStatement delMateriel = con.prepareStatement("DELETE FROM AffectMateriel WHERE idSeance = (SELECT idSeance FROM Seance WHERE idActivite = " + idActivite +")");
			delMateriel.executeQuery();
			System.out.println("|- Suppression de l'affectation du matériel nécessaire aux séances de l'activité");
			
			// On supprime les seances
			PreparedStatement delSeance = con.prepareStatement("DELETE FROM Seance WHERE idActivite=" + idActivite);
			delSeance.executeQuery();
			System.out.println("|- Suppression des séances de l'activité");
            
            // On doit supprimer l'activite de la liste d'activité et la lsite de matériel dont elle a besoin
            // On supprime l'activité de la liste des activités de notre centre
            PreparedStatement delCentre = con.prepareStatement("DELETE FROM ListeActivite WHERE idActivite=" + idActivite);
			delCentre.executeQuery();
			System.out.println("|- Suppression de l'activité à la liste des activités de notre centre");
			
			// On supprime le matériel nécessaire de l'activite
			PreparedStatement delMaterielNec = con.prepareStatement("DELETE FROM MaterielNecessaire WHERE idActivite=" + idActivite);
			delMaterielNec.executeQuery();
			System.out.println("|- Suppression du matériel nécessaire à l'activité");

			// On supprime l'activité
			//PreparedStatement delAct = con.prepareStatement("DELETE FROM Activite WHERE idActivite=" + idActivite);
			//delAct.executeQuery();
			System.out.println("|_ Activité supprimée");
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
		}
	}

	private static void gererGroupeStagiaires() {
		// TODO SQL
		System.out.flush();
		System.out.println("==================================");
		System.out.println("1. Ajouter un nouveau groupe de stagiaires");
		System.out.println("2. Supprimer un groupe de stagiaires");
		System.out.println("3. Ajouter des stagiaires à un groupe");
		System.out.println("4. Afficher les groupes");
		System.out.println("5. Afficher la composition des groupes");
		System.out.println("6. Retourner au menu principal");
		System.out.println("==================================");
		traitementChoixMenuGererGroupeStagiaires();
	}

	private static void traitementChoixMenuGererGroupeStagiaires() {

		switch (scanner.nextInt()) {
		case 1:
			ajouterGroupeStagiaires();
			break;
		case 2:
			supprimerGroupeStagiaires();
			break;
		case 3:
			ajouterStagiaireAGroupe();
			break;
		case 4:
			Connection con;
			try {
				con = ConnexionDB.getConnection();
				/*executerEtAfficherSelect(con , "SELECT DISTINCT * FROM Groupe WHERE idGroupe IN "
						+ "(SELECT DISTINCT idGroupe FROM AffectGroupe WHERE idStagiaire IN "
						+ "(SELECT DISTINCT idStagiaire FROM Stagiaire WHERE idStagiaire IN "
						+ "(SELECT DISTINCT idStagiaire FROM Inscription WHERE idCentre = "+ myCentreID +")))");
				*/
				executerEtAfficherSelect(con, "SELECT DISTINCT * FROM Groupe WHERE idCentre = "+myCentreID);
			} catch (SQLException e) {
				e.printStackTrace();
			}
			break;
		case 5:
			afficherCompositionGroupe();
			break;
		case 6:
			UIResponsable();
			break;
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			gererGroupeStagiaires();
			break;
		}
	}

	private static void afficherCompositionGroupe() {
		try {		
			Connection con = ConnexionDB.getConnection();
			/*
			 * On choisit le groupe à afficher
			 */
			System.out.println("Quel groupe ?");
			executerEtAfficherSelect(con , "SELECT DISTINCT * FROM Groupe WHERE idCentre = "+myCentreID);
			int idGroupeAAfficher = scanner.nextInt();
			
			executerEtAfficherSelect(con, "SELECT idStagiaire FROM AffectGroupe WHERE idGroupe = "+idGroupeAAfficher);
			
		}
		catch (SQLException e ) {
			e.printStackTrace();
		}
	}

	private static void ajouterStagiaireAGroupe() {
		try {
			/*
			 * Connection à la base de donnees
			 */
			
			Connection con = ConnexionDB.getConnection();
			
			/*
			 * On choisit le stagiaire qui ne fait partie d'aucun groupe
			 */
			System.out.println("Les stagiaires disponibles sont : ");
			executerEtAfficherSelect(con, "SELECT idStagiaire FROM Stagiaire WHERE idStagiaire IN (SELECT idStagiaire FROM Inscription WHERE idCentre = "+myCentreID+") "
					+ "AND idStagiaire NOT IN (SELECT idStagiaire FROM AffectGroupe)");
			int idStagiaireAjoute = scanner.nextInt();
			
			
			/*
			 * On choisit le groupe dans lequel le stagiaire va être affecté
			 */
			System.out.println("Dans quel groupe ?");
			executerEtAfficherSelect(con , "SELECT DISTINCT * FROM Groupe WHERE idCentre = "+myCentreID);
			int idGroupeAremplir = scanner.nextInt();

			
			PreparedStatement requeteAjouterStagiaireGroupe = con
					.prepareStatement("INSERT INTO AffectGroupe (idGroupe, idStagiaire) VALUES (?, ? )");
			requeteAjouterStagiaireGroupe.setObject(1, idGroupeAremplir);
			requeteAjouterStagiaireGroupe.setObject(2, idStagiaireAjoute);
			requeteAjouterStagiaireGroupe.executeQuery();
			System.out.println("|_ Stagiaire "+idStagiaireAjoute+ " ajouté au groupe "+idGroupeAremplir);
		}
		catch (SQLException e ){
			e.printStackTrace();
		}
	}

	private static void gererChoixNiveauGroupe(Groupe newGroupe) {
		// TODO SQL
		System.out.flush();
		System.out.println("Veuillez choisir le niveau du groupe");
		System.out.println("==================================");
		System.out.println("1. Debutant");
		System.out.println("2. Confirme");
		System.out.println("3. Expert");
		System.out.println("==================================");
		traitementChoixNiveauGroupe(newGroupe);
	}

	private static void traitementChoixNiveauGroupe(Groupe newGroupe) {
		switch (scanner.nextInt()) {
		case 1:
			newGroupe.setNiveau("Debutant");
			break;
		case 2:
			newGroupe.setNiveau("Confirme");
			break;
		case 3:
			newGroupe.setNiveau("Expert");
			break;
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			gererChoixNiveauGroupe(newGroupe);
			break;
		}

	}

	private static void ajouterGroupeStagiaires() {
		try {
			/*
			 * Connection à la base de donnees
			 */
			Connection con = ConnexionDB.getConnection();

			/*
			 * Constructeur du nouveau groupe à ajouter
			 */
			Groupe newGroupe = new Groupe();
			gererChoixNiveauGroupe(newGroupe);

			/*
			 * On crée la table ListeActivité lié
			 */
			PreparedStatement requeteAjouterGroupe = con
					.prepareStatement("INSERT INTO Groupe (idGroupe, niveau, idCentre) VALUES (id_groupe_sequence.nextval, ? , "+myCentreID+")");
			requeteAjouterGroupe.setObject(1, newGroupe.getNiveau());
			requeteAjouterGroupe.executeQuery();
			

			System.out.println("Groupe ajouté.");

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private static void supprimerGroupeStagiaires() {
		try {
			/*
			 * Connection à la base de donnees
			 */
			Connection con = ConnexionDB.getConnection();

			/*
			 * Affichage des groupes
			 */
			executerEtAfficherSelect(con, "SELECT * FROM Groupe WHERE idCentre = "+myCentreID);
			int idGroupe = scanner.nextInt();

			/*
			 * On supprime l'AffectGroupe entre le groupe et les stagiaires
			 */
			PreparedStatement requeteSupprimerAffectGroupe = con.prepareStatement("DELETE FROM AffectGroupe WHERE idGroupe=?");
			requeteSupprimerAffectGroupe.setObject(1, idGroupe);
			requeteSupprimerAffectGroupe.executeQuery();
			
			
			/*
			 * On supprime le tuple qui correspond
			 */
			PreparedStatement requeteSupprimerGroupe = con.prepareStatement("DELETE FROM Groupe WHERE idGroupe=?");
			requeteSupprimerGroupe.setObject(1, idGroupe);
			requeteSupprimerGroupe.executeQuery();

			System.out.println("Groupe "+idGroupe+" supprime.");

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private static void gererMateriel() {
		// TODO SQL
		System.out.flush();
		System.out.println("==================================");
		System.out.println("1. Ajouter du matériel");
		System.out.println("2. Supprimer du matériel");
		System.out.println("3. Afficher le matériel");
		System.out.println("4. Retourner au menu principal");
		System.out.println("==================================");
		traitementChoixMenuGererMateriel();
	}

	private static void traitementChoixMenuGererMateriel() {

		switch (scanner.nextInt()) {
		case 1:
			ajouterMateriel();
			break;
		case 2:
			supprimerMateriel();
			break;
		case 3:
			Connection con;
			try {
				con = ConnexionDB.getConnection();
				executerEtAfficherSelect(con , "SELECT DISTINCT * FROM Materiel WHERE idCentre = "+ myCentreID );
				 
			} catch (SQLException e) {
				e.printStackTrace();
			}
			break;
		case 4:
			UIResponsable();
			break;
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			gererMateriel();
			break;
		}

	}

	/**
	 * Permet d'ajouter du matériel au centre
	 */
	static void ajouterMateriel() {
		try {
			Connection con = ConnexionDB.getConnection();

			Materiel materielAjoute = new Materiel();
			PreparedStatement requeteAjouterMateriel = con.prepareStatement(
					"INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, ?, ?, ?, ?, ?, ?)");
			requeteAjouterMateriel.setObject(1, materielAjoute.getType());
			requeteAjouterMateriel.setObject(2, materielAjoute.getMarque());
			requeteAjouterMateriel.setObject(3, materielAjoute.getModele());
			requeteAjouterMateriel.setObject(4, materielAjoute.getNiveauPratique());
			requeteAjouterMateriel.setObject(5, materielAjoute.getQuantite());
			requeteAjouterMateriel.setObject(6, myCentreID);
			requeteAjouterMateriel.executeQuery();

			System.out.println("Matériel ajouté.");
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
		}
	}

	/**
	 * On ne supprime pas le tuple de la table matériel, mais on met juste la
	 * quantité de matériel sélectionné à 0.
	 */
	private static void supprimerMateriel() {
		try {
			Connection con = ConnexionDB.getConnection();

			System.out.println("Quel matériel voulez-vous supprimer ?");
			executerEtAfficherSelect(con, "SELECT * FROM Materiel WHERE idCentre =" + myCentreID);
			int idMaterielASupprimer = scanner.nextInt();

			/**
			 * On met la quantité de matériel à 0.
			 */
			PreparedStatement requeteUpdateMateriel = con
					.prepareStatement("UPDATE Materiel SET quantite = 0 WHERE idMateriel = " + idMaterielASupprimer);
			requeteUpdateMateriel.executeQuery();

			System.out.println("Matériel mis à 0.");
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
		}
	}

	/**
	 * Permet au responsable d'inscrire un nouveau stagiaire dans le centre.
	 */
	private static void inscrireStagiaireCentre() {
		try {
			Connection con = ConnexionDB.getConnection();

			/*
			 * On demande où habite le stagiaire
			 */
			Adresse adresseStagiaire = new Adresse();
			PreparedStatement requeteInsertAdresse = con.prepareStatement("INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, "+adresseStagiaire.getNumRue()+", '"+adresseStagiaire.getRue()+"', '"+adresseStagiaire.getVille()+"', '"+adresseStagiaire.getDepartement()+"', '"+adresseStagiaire.getPays()+"')");
			ResultSet resultrequeteInsertAdresse = requeteInsertAdresse.executeQuery();
			
			
			/*
			 * On récupère l'ID de l'adresse.
			 */
			PreparedStatement requeteStagiaireIDAdresse = con.prepareStatement("SELECT DISTINCT idAdresse FROM Adresse WHERE numrue = "+adresseStagiaire.getNumRue()+" AND rue = '"+adresseStagiaire.getRue()+"' AND ville = '"+adresseStagiaire.getVille()+"' AND departement = '"+adresseStagiaire.getDepartement()+"' AND pays = '"+adresseStagiaire.getPays()+"'");
			ResultSet requeteIDAdresse = requeteStagiaireIDAdresse.executeQuery();
			int idAdresseStagiaire = 0;
			while (requeteIDAdresse.next()) {
				idAdresseStagiaire = requeteIDAdresse.getInt("idAdresse");
			}
			
			
			/*
			 * Création d'un stagiaire
			 */
			Stagiaire stagiaireAInscrire = new Stagiaire();
			PreparedStatement requeteInsertPersonne = con.prepareStatement("INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, '"+stagiaireAInscrire.getNom()+"', '"+stagiaireAInscrire.getPrenom()+"', '"+stagiaireAInscrire.getMail()+"', to_date('"+stagiaireAInscrire.getDateDeNaissance()+"', 'YYYY-MM-DD'), "+stagiaireAInscrire.getTel()+", "+idAdresseStagiaire+")");
			ResultSet resultrequeteInsertPersonne = requeteInsertPersonne.executeQuery();
			System.out.println("|- Personne créée.");
			
			PreparedStatement requeteSelectIdPersonne = con.prepareStatement("SELECT DISTINCT idPersonne FROM Personne WHERE nom = '" +stagiaireAInscrire.getNom() +"' "
					+ "AND prenom = '" + stagiaireAInscrire.getPrenom() + "' "
					+ "AND mail = '" + stagiaireAInscrire.getMail() + "' "
					+ "AND telephone = " + stagiaireAInscrire.getTel() +"");
			
			ResultSet resultIDStagiairePersonne = requeteSelectIdPersonne.executeQuery();
			int idPersonne = 0;
			while (resultIDStagiairePersonne.next()) {
				idPersonne = resultIDStagiairePersonne.getInt("idPersonne");
			}
			
			PreparedStatement requeteInscrireStagiaire = con.prepareStatement(
					"INSERT INTO Stagiaire (idStagiaire, dateDebut, dateFin, idPersonne) VALUES (id_stagiaire_sequence.nextval, ?, ?, ?)");
			requeteInscrireStagiaire.setObject(1, stagiaireAInscrire.getDateEntree());
			requeteInscrireStagiaire.setObject(2, stagiaireAInscrire.getDateSortie());
			requeteInscrireStagiaire.setObject(3, idPersonne);
			requeteInscrireStagiaire.executeQuery();
			System.out.println("|- Stagiaire créé.");

			/*
			 * On récupère l'idStagiaire qui vient d'être inséré.
			 */
			PreparedStatement requeteSelectIdStagiaire = con.prepareStatement("SELECT idStagiaire FROM Stagiaire"
					+ " WHERE dateDebut = TO_DATE('" + stagiaireAInscrire.getDateEntree() + "', 'YYYY-MM-DD')"
					+ " AND dateFin =  TO_DATE('" + stagiaireAInscrire.getDateSortie() + "', 'YYYY-MM-DD')");
			// TODO : Faire en sorte que le stagiaire ne soit pas identifié qu'avec ses date
			// de début et de fin
			// mais également avec son nom, prénom, mail ... etc

			ResultSet resultIDStagiaire = requeteSelectIdStagiaire.executeQuery();
			int idStagiaire = 0;
			while (resultIDStagiaire.next()) {
				idStagiaire = resultIDStagiaire.getInt("idStagiaire");
			}

			PreparedStatement requeteCreateInscription = con
					.prepareStatement("INSERT INTO Inscription (idStagiaire, idCentre) VALUES (?, ?)");
			requeteCreateInscription.setObject(1, idStagiaire);
			requeteCreateInscription.setObject(2, myCentreID);
			requeteCreateInscription.executeQuery();
			System.out.println("|_ Stagiaire inscrit dans le centre " + myCentreID);
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	/**
	 * Menu d'affichage principal du responsable.
	 */
	private static void afficherMenuResponsable() {
		System.out.flush();
		System.out.println("================================");
		System.out.println("| Menu Principal - Responsable |");
		System.out.println("================================");

		System.out.println("1. Gérer materiel");
		System.out.println("2. Gérer habilitation");
		System.out.println("3. Gérer activite");
		System.out.println("4. Gérer seance");
		System.out.println("5. Gérer moniteur");
		System.out.println("6. Gérer groupe de stagiaires");
		System.out.println("7. Inscrire un stagiaire dans un centre");
		System.out.println("8. Afficher les stagiaires");

		System.out.println("9. Quitter");
	}

	private static void traitementChoixMenuResponsable() {

		switch (scanner.nextInt()) {
		case 1:
			gererMateriel();
			break;
		case 2:
			gererHabilitation();
			break;
		case 3:
			gererActivite();
			break;
		case 4:
			gererSeance();
			break;
		case 5:
			gererMoniteur();
			break;
		case 6:
			gererGroupeStagiaires();
			break;
		case 7:
			inscrireStagiaireCentre();
			break;
		case 8:
			Connection con;
			try {
				con = ConnexionDB.getConnection();
				executerEtAfficherSelect(con , "SELECT DISTINCT * FROM Stagiaire WHERE idStagiaire IN "
						+ "(SELECT DISTINCT idStagiaire FROM Inscription WHERE idCentre = "+ myCentreID +")");
				 
			} catch (SQLException e) {
				e.printStackTrace();
			}
			break;
		case 9:
			System.out.println("A bientôt sur l'application! :)");
			System.exit(0);
			break;
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			UIResponsable();
			break;
		}
	}

	/**
	 * @return the centreGere
	 */
	public Centre getCentreGere() {
		return centreGere;
	}

	/**
	 * @param centreGere
	 *            the centreGere to set
	 */
	public void setCentreGere(Centre centreGere) {
		this.centreGere = centreGere;
	}

}