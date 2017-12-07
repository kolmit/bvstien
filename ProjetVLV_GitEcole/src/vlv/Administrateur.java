package vlv;
import java.lang.reflect.Field;
import java.sql.*;
import java.util.*;

public class Administrateur extends Personnel {
	
	/**
	 * Attribut statique permettant de récupérer les choix 
	 * saisis par l'administrateur.
	 * Cet attribut est purement lié à l'application, pas du tout à la modélisation.
	 */
	private static Scanner scanner = new Scanner(System.in);
	
	
	
	/**
	 * Constructeur 
	 */
	public Administrateur() {
	}
	
	
	
	/**
	 * Fonction statique correspondant à l'interface de l'administrateur.
	 */
	static void UIAdministrateur() {
		while(true) {
			afficherMenuAdministrateur();
			traitementChoixMenuPrincipal();
		}
	}
	

	/**
	 * Gerer un centre
	 */
	private static void gererCentre() {
		// TODO : SQL Liste des centres de vacances
		
		System.out.flush();
		System.out.println("==================================");
		System.out.println("1. Ajouter un centre de vacance");
		System.out.println("2. Supprimer un centre de vacance");
		System.out.println("3. Afficher les centres de vacances");
		System.out.println("4. Retourner au menu principal");
		System.out.println("==================================");
		traitementChoixMenuGererCentre();
	}

	private static void traitementChoixMenuGererCentre() {
		switch (scanner.nextInt()) {
		case 1:
			ajouterCentre();
			break;
		case 2: 
			supprimerCentre();
			break;			
		case 3:
			Connection con;
			try {
				con = ConnexionDB.getConnection();
				executerEtAfficherSelect(con , "SELECT DISTINCT * FROM Centre");
				 
			} catch (SQLException e) {
				e.printStackTrace();
			}
		case 4:
			UIAdministrateur();
			break;
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			gererCentre();
			break;
		}		
	}

	/**
	 * Fonction pour ajouter un centre de vacances
	 */
	private static void ajouterCentre() {
		try {
			Connection con = ConnexionDB.getConnection();
			
			/*
			 * Le constructeur fait appel à un scanner pour remplir les champs de l'adresse.			
			 */
			Adresse adresseCentre = new Adresse();
			
			/*
			 * On insère l'adresse du centre dans la BDD
			 */
			PreparedStatement insertAdresse = con.prepareStatement("INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, ?, ?, ?, ?, ?)");
			insertAdresse.setObject(1, adresseCentre.getNumRue());
			insertAdresse.setObject(2, adresseCentre.getRue());
			insertAdresse.setObject(3, adresseCentre.getDepartement());
			insertAdresse.setObject(4, adresseCentre.getVille());
			insertAdresse.setObject(5, adresseCentre.getPays()); 
			insertAdresse.executeQuery();	
			System.out.println("Adresse ajoutée.");
			
			
			/*
			 * Il faut récupérer l'idAdresse précédemment créée pour la requête de la création du Centre.
			 */
			PreparedStatement selectidAdresse = con.prepareStatement("SELECT DISTINCT idAdresse FROM Adresse WHERE "
					+ "numRue = "+ adresseCentre.getNumRue()
					+ " AND rue = '"+ adresseCentre.getRue() +"'"
					+ " AND ville = '"+ adresseCentre.getDepartement() +"'"
					+ " AND departement = '"+ adresseCentre.getVille() +"'"
					+ " AND pays = '"+ adresseCentre.getPays() +"'");
			ResultSet resultatSelectIdAdresse = selectidAdresse.executeQuery();

			int idAdresse = 0;
			while (resultatSelectIdAdresse.next()) {
				idAdresse = resultatSelectIdAdresse.getInt("idAdresse");
			}
			
			/*
			 * On crée l'objet centre pour lui attribuer son nom.
			 */
			Centre centreAjoute = new Centre();
			centreAjoute.setAdresse(adresseCentre);
			
			/*
			 * On crée le centre en BDD.
			 */
			PreparedStatement insertCentre = con.prepareStatement("INSERT INTO Centre (idCentre, idAdresse, nomCentre) VALUES (id_adresse_sequence.nextval, "+ idAdresse +", ?)");
			insertCentre.setObject(1, centreAjoute.getNomCentre());
			insertCentre.executeQuery();
			System.out.println("Centre ajouté.");	
			

			
			/*
			 * On récupère l'id du Centre qui vient d'être ajouté
			 */
			PreparedStatement selectidCentre = con.prepareStatement("SELECT DISTINCT idCentre FROM Centre WHERE "
					+ "nomCentre = '"+ centreAjoute.getNomCentre() +"'");
			ResultSet resultatSelectidCentre = selectidCentre.executeQuery();

			int idCentre = 0;
			while (resultatSelectidCentre.next()) {
				idCentre = resultatSelectidCentre.getInt("idCentre");
			}			
		}
		catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
			afficherMenuAdministrateur();
			//e.printStackTrace();
		}
	}
	



	
	private static void ajouterMaterielAuCentre(Connection con, int idCentre) throws SQLException {
		//TODO : Faire en sorte de pouvoir choisir plusieurs materiel à la suite.

		
		/*
		 * On propose à l'utilisateur d'ajouter du materiel à son centre.
		 * On ne récupère que le materiel qui n'est pas dans la liste du materiel déjà proposé par le centre.
		 */
		System.out.println("Entrez l'ID du matériel à ajouter :");
		System.out.println("1. Bottes - PassionCheval - Modele enfant - Debutant - 10 paires");
		System.out.println("2. Ballon - Fifa - World Cup 2006 - Confirme - 5 ");
		System.out.println("3. Palmes - Decathlon - Quechua - Expert - 10 paires ");
		System.out.println("4. Raquette - Artengo - Modele adulte - Confirme - 4 ");
		int idMateriel = scanner.nextInt();
		String insertMateriel = "";
		
		
		switch(idMateriel) {
		case 1:
			insertMateriel = "INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Bottes', 'PassionCheval', 'Modele Enfant', 'Debutant', 10";
			break;
		case 2:
			insertMateriel = "INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Ballon', 'Fifa', 'World Cup 2006', 'Confirme', 5";
			break;
		case 3:
			insertMateriel = "INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Palmes', 'Decathlon', 'Quechua', 'Confirme', 10";
			break;
		case 4:
			insertMateriel = "INSERT INTO Materiel (idMateriel, type, marque, modele, niveau, quantite, idCentre) VALUES (id_materiel_sequence.nextval, 'Raquette', 'Artengo', 'Modele adulte', 'Confirme', 4";
			break;
		default:
			System.err.println("Erreur. Veuillez faire un choix correct!");	
			return;
		}
		
		/*
		 * On crée la table ListeActivité lié
		 */
		
		System.out.println("idcentre = "+idCentre);
		executerEtAfficherSelect(con, "SELECT * FROM Materiel");
		PreparedStatement addActivite = con.prepareStatement(insertMateriel + ", "+ idCentre +")");
		addActivite.executeQuery();
		System.out.println("Materiel ajouté.");		
		
	}

	
	/**
	 * Fonction pour supprimer un centre de vacances
	 */
	private static void supprimerCentre() {
		try {
			Connection con = ConnexionDB.getConnection();

			/**
			 * On affiche tous les centres
			 */
			executerEtAfficherSelect(con, "SELECT * FROM Centre");

			/**
			 * Choix de l'id du centre pour le supprimer dans la base de données
			 */
			System.out.println("Veuillez choisir l'id du centre à supprimer");
			int idCentreASupprimer = scanner.nextInt();

			/**
			 * On recupere l'idAdresse du centre
			 * On supprime l'attribut d'adresse du centre 
			 * pour éviter de violer la contrainte avec la requête suivante (suppression adresse)
			 */
			String requete = "SELECT idAdresse FROM Centre WHERE idCentre="+idCentreASupprimer;
            try {
                Statement stmt = con.createStatement();
                ResultSet resultats = stmt.executeQuery(requete);
                while(resultats.next()) {
    				int idAdresse = resultats.getInt(1);
    			}
            } catch (SQLException e) {
                System.out.println("Anomalie lors de l'execution de la requête : "+requete);
            }
            
			/**
			 * On supprime l'attribut d'adresse du centre 
			 * pour éviter de violer la contrainte avec la requête suivante (suppression adresse)
			 */
			PreparedStatement requeteUpdateAdresseCentre = con
					.prepareStatement("UPDATE Centre SET idAdresse = null WHERE idCentre ="+idCentreASupprimer);
			requeteUpdateAdresseCentre.executeQuery();
			System.out.println("|- Adresse du centre supprimée.");
			
			
			/**
			 * On supprime l'adresse du centre
			 */
			PreparedStatement requeteDeleteAdresseDuCentre = con
					.prepareStatement("DELETE FROM Adresse WHERE idAdresse = "
							+ "(SELECT idAdresse FROM Centre WHERE idCentre = "+idCentreASupprimer+")");
			requeteDeleteAdresseDuCentre.executeQuery();
			System.out.println("|_ Adresse supprimée.\n");

			
			/*****************************************
			 * Suppression successives de : 
			 * [Stage] <-- [Encadre] <-- [Seance] <-- [Moniteur - idCentre]
			 *****************************************/
			
			/**
			 * On supprime les stages
			 */
			PreparedStatement requeteDeleteStage = con
					.prepareStatement("DELETE FROM Stage WHERE idSeance IN "
							+ "(SELECT idSeance FROM Encadre WHERE idMoniteur IN "
							+ "(SELECT idMoniteur FROM Moniteur WHERE idCentre = "+idCentreASupprimer+"))");
			requeteDeleteStage.executeQuery();
			System.out.println("|- Stages supprimés.");
			
			/**
			 * On supprime les tables Encadre des moniteurs du centre
			 */
			PreparedStatement requeteDeleteEncadre = con
					.prepareStatement("DELETE FROM Encadre WHERE idMoniteur = "
							+ "(SELECT idMoniteur FROM Moniteur WHERE idCentre = "+idCentreASupprimer+")");
			requeteDeleteEncadre.executeQuery();
			System.out.println("|- Encadre supprimés.");
			
			/**
			 * On supprime les séances
			 */
			PreparedStatement requeteDeleteFromSeance = con
					.prepareStatement("DELETE FROM Seance WHERE idSeance = "
							+ "(SELECT idSeance FROM Encadre WHERE idMoniteur = "
							+ "(SELECT idMoniteur FROM Moniteur WHERE idCentre = "+idCentreASupprimer+"))");
			requeteDeleteFromSeance.executeQuery();
			System.out.println("|- Séances supprimés.");


			
			/**
			 * On supprime les affectations des moniteurs
			 */
			PreparedStatement requeteUpdateMoniteurDuCentre = con
					.prepareStatement("UPDATE Moniteur SET idCentre = null WHERE idCentre = "+idCentreASupprimer);
			requeteUpdateMoniteurDuCentre.executeQuery();
			System.out.println("|_ Moniteur désaffecté\n");

			
			/*****************************************
			 * Suppression  de : 
			 * [Responsable]
			 *****************************************/
			/**
			 * On supprime les affectations des responsables
			 */
			PreparedStatement requeteUpdateResponsableDuCentre = con
					.prepareStatement("UPDATE Responsable SET idCentre = null WHERE idCentre = "+idCentreASupprimer);
			requeteUpdateResponsableDuCentre.executeQuery();
			System.out.println("|_ Responsable désaffecté\n");
			
			
			
			/***************************************************************
			 * Suppression successives de : 
			 * [Inscription] <-- [Stagiaire] <-- [AffectGroupe] <-- [Groupe] 
			 ***************************************************************/

			/**
			 * On supprime les inscriptions des stagiaires du centre
			 */
			PreparedStatement requeteDeleteInscription = con
					.prepareStatement("DELETE FROM Inscription WHERE idCentre="+idCentreASupprimer);
			requeteDeleteInscription.executeQuery();
			System.out.println("|_ Inscriptions du centre supprimées.\n");
			
			/**
			 * On supprime les Stagiaires du centre
			 */
			PreparedStatement requeteDeleteStagiaires = con
					.prepareStatement("DELETE FROM Stagiaire WHERE idStagiaire IN "
							+ "(SELECT idStagiaire FROM Inscription WHERE idCentre ="+idCentreASupprimer+")");
			requeteDeleteStagiaires.executeQuery();
			System.out.println("|- Stagiaires du centre supprimés.");
			
			
			/**
			 * On supprime les AffectGroupe du centre
			 */
			PreparedStatement requeteDeleteAffectGroupe = con
					.prepareStatement("DELETE FROM AffectGroupe WHERE idStagiaire IN "
							+ "(SELECT idStagiaire FROM Stagiaire WHERE idStagiaire IN "
							+ "(SELECT idStagiaire FROM Inscription WHERE idCentre ="+idCentreASupprimer+"))");
			requeteDeleteAffectGroupe.executeQuery();
			System.out.println("|- AffectGroupe du centre supprimés.");
			
			
			/**
			 * On supprime les groupes du centre
			 */
			PreparedStatement requeteDeleteGroupe = con
					.prepareStatement("DELETE FROM Groupe WHERE idGroupe IN "
							+ "(SELECT idGroupe FROM AffectGroupe WHERE idStagiaire IN "
							+ "(SELECT idStagiaire FROM Stagiaire WHERE idStagiaire IN "
							+ "(SELECT idStagiaire FROM Inscription WHERE idCentre ="+idCentreASupprimer+")))");
			requeteDeleteGroupe.executeQuery();
			System.out.println("|- Groupe du centre supprimés.");
			
			
			

			
			
			/***************************************************************
			 * Suppression successives de : 
			 * [MaterielNecessaire] & [AffectMateriel] <-- [Materiel]
			 ***************************************************************/
			/**
			 * On supprime les tables MaterielNecessaire du centre
			 */
			PreparedStatement requeteDeleteMaterielNecessaire = con
					.prepareStatement("DELETE FROM MaterielNecessaire WHERE idMateriel IN "
							+ "(SELECT idMateriel FROM Materiel WHERE idCentre = "+idCentreASupprimer+")");
			requeteDeleteMaterielNecessaire.executeQuery().close();
			System.out.println("|- MaterielNecessaire du centre supprimé.");
			
			
			/**
			 * On supprime les tables AffectMateriel du centre
			 */
			PreparedStatement requeteDeleteAffectMateriel = con
					.prepareStatement("DELETE FROM AffectMateriel WHERE idMateriel IN "
							+ "(SELECT idMateriel FROM Materiel WHERE idCentre = "+idCentreASupprimer+")");
			requeteDeleteAffectMateriel.executeQuery().close();
			System.out.println("|- AffectMatériel du centre supprimé.");
			
			
			/**
			 * On supprime le matériel du centre
			 */
			PreparedStatement requeteDeleteMateriel = con
					.prepareStatement("DELETE FROM Materiel WHERE idCentre = "+idCentreASupprimer+"");
			requeteDeleteMateriel.executeQuery().close();
			System.out.println("|_ Matériel du centre supprimé.\n");

			
			/***************************************************************
			 * Suppression successives de : 
			 * [ListeActivité] <-- [Centre]
			 ***************************************************************/
			/**
			 * On supprime la ListeActivité liée au centre
			 */
			PreparedStatement requeteDeleteListeActivite = con
					.prepareStatement("DELETE FROM ListeActivite WHERE idCentre = "+idCentreASupprimer+"");
			requeteDeleteListeActivite.executeQuery().close();
			System.out.println("|_ ListeActivite du centre supprimé.\n");
			
			
			/**
			 * On supprime le centre.
			 */
			PreparedStatement requeteDeleteCentre = con
					.prepareStatement("DELETE FROM Centre WHERE idCentre = "+idCentreASupprimer+"");
			requeteDeleteCentre.executeQuery().close();
			System.out.println("|_ Centre supprimé.");
			
		} 
		catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
			UIAdministrateur();
		}
	}

	
	/**
	 * Gerer un responsable
	 */
	private static void gererResponsable() {
		// TODO : SQL Liste des responsables

		System.out.flush();
		System.out.println("==================================");
		System.out.println("1. Ajouter un responsable");
		System.out.println("2. Supprimer un responsable");
		System.out.println("3. Affecter un responsable a un centre");
		System.out.println("4. Désaffecter un responsable un centre");
		System.out.println("5. Afficher les responsables");
		System.out.println("6. Retourner au menu principal");
		System.out.println("==================================");
		traitementChoixMenuGererResponsable();
	}
	
	private static void traitementChoixMenuGererResponsable() {
		switch (scanner.nextInt()) {
		case 1:
			ajouterResponsable();
			break;
		case 2: 
			supprimerResponsable();
			break;
		case 3:
			affecterResponsable();
			break;
		case 4:
			desaffecterResponsable();
			break;
		case 5:
			Connection con;
			try {
				con = ConnexionDB.getConnection();
				executerEtAfficherSelect(con , "SELECT DISTINCT * FROM Responsable");
				 
			} catch (SQLException e) {
				e.printStackTrace();
			}
		case 6:
			UIAdministrateur();
			break;

		default:
			System.err.println("Veuillez faire un choix valide.\n");
			gererResponsable();
			break;
		}
	}
	
	
	/** Ordre de création des tables : </br>
	 * [Adresse] --> [Personne] --> [Personnel] --> [Responsable]
	 */
	private static void ajouterResponsable() {
		
		try {
			Connection con = ConnexionDB.getConnection();
			
			/*
			 * Le constructeur fait appel à un scanner pour remplir les champs de l'adresse.			
			 */
			Adresse adresseResponsable = new Adresse();
			
			/*
			 * On insère l'adresse du responsable dans la BDD
			 */
			PreparedStatement insertAdresse = con.prepareStatement("INSERT INTO Adresse (idAdresse, numRue, rue, ville, departement, pays) VALUES (id_adresse_sequence.nextval, ?, ?, ?, ?, ?)");
			insertAdresse.setObject(1, adresseResponsable.getNumRue());
			insertAdresse.setObject(2, adresseResponsable.getRue());
			insertAdresse.setObject(3, adresseResponsable.getDepartement());
			insertAdresse.setObject(4, adresseResponsable.getVille());
			insertAdresse.setObject(5, adresseResponsable.getPays());
			insertAdresse.executeQuery();
			System.out.println("Adresse ajoutée.");
			
			
			/*
			 * Il faut récupérer l'idAdresse précédemment créée pour la requête de la création de la Personne.
			 */
			PreparedStatement selectidAdresse = con.prepareStatement("SELECT DISTINCT idAdresse FROM Adresse WHERE "
					+ "numRue = "+ adresseResponsable.getNumRue()
					+ " AND rue = '"+ adresseResponsable.getRue() +"'"
					+ " AND ville = '"+ adresseResponsable.getDepartement() +"'"
					+ " AND departement = '"+ adresseResponsable.getVille() +"'"
					+ " AND pays = '"+ adresseResponsable.getPays() +"'");
			ResultSet resultatSelectIdAdresse = selectidAdresse.executeQuery();

			int idAdresse = 0;
			while (resultatSelectIdAdresse.next()) {
				idAdresse = resultatSelectIdAdresse.getInt("idAdresse");
			}
		
			
			/*
			 * Le constructeur fait appel à un scanner pour remplir les champs Personne du responsable.			
			 */
			Responsable responsable = new Responsable();
		
			PreparedStatement requeteSQLPersonne = con.prepareStatement("INSERT INTO Personne (idPersonne, nom, prenom, mail, dateNaissance, telephone, idAdresse) VALUES (id_personne_sequence.nextval, ?, ?, ?, ?, ?, ?)");
			requeteSQLPersonne.setObject(1, responsable.getNom());
			requeteSQLPersonne.setObject(2, responsable.getPrenom());
			requeteSQLPersonne.setObject(3, responsable.getMail());
			requeteSQLPersonne.setObject(4, responsable.getDateDeNaissance());
			requeteSQLPersonne.setObject(5, responsable.getTel());
			requeteSQLPersonne.setObject(6, idAdresse);
			requeteSQLPersonne.executeQuery();
			System.out.println("Personne ajoutée.");

			
			/*
			 * Il faut récupérer l'idPersonne pour la requête qui suit (celle de la création du Personnel)
			 */
			PreparedStatement selectIdPersonne = con.prepareStatement("SELECT DISTINCT idPersonne FROM Personne WHERE nom = '"+responsable.getNom()+"'"/*+" AND prenom = '"+rue*/);
			ResultSet resultatSelectIdPersonne = selectIdPersonne.executeQuery();

			int idPersonne = 0;
			while (resultatSelectIdPersonne.next()) {
				idPersonne = resultatSelectIdPersonne.getInt("idPersonne");
			}


			PreparedStatement insertPersonnel = con.prepareStatement("INSERT INTO Personnel (idPersonnel, numBadge, idPersonne) VALUES (id_personnel_sequence.nextval, id_numbadge_sequence.nextval, "+ idPersonne +")");
			insertPersonnel.executeQuery();
			System.out.println("Personnel ajouté.");
			
			
			/*
			 * Il faut récupérer l'idPersonnel pour la requête qui suit (celle de la création du Responsable)
			 */
			PreparedStatement selectIdPersonnel = con.prepareStatement("SELECT DISTINCT idPersonnel FROM Personnel WHERE idPersonne = "+ idPersonne);
			ResultSet resultatSelectIdPersonnel = selectIdPersonnel.executeQuery();
			
			int idPersonnel = 0;
			while (resultatSelectIdPersonnel.next()) {
				idPersonnel = resultatSelectIdPersonnel.getInt("idPersonnel");
			}

			/*
			 * NB : L'attribut "IdCentre" de la table Responsable n'est pas remplit ici puisqu'il s'agit d'un 
			 * autre usecase de l'Administrateur.
			 */
			PreparedStatement insertResponsable = con.prepareStatement("INSERT INTO Responsable (idResponsable, idPersonnel) VALUES (id_responsable_sequence.nextval, "+ idPersonnel +")");
			insertResponsable.executeQuery();
			System.out.println("Responsable ajouté.");
			
			con.commit();
			
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Erreur SQL : Retour au menu.");
			gererResponsable();
		}
	}



	
	private static void supprimerResponsable() {
		try {
			Connection con = ConnexionDB.getConnection();
			System.out.println("Quel responsable voulez-vous supprimer ?");
			executerEtAfficherSelect(con, "SELECT DISTINCT idResponsable, idCentre FROM Responsable");
			int idResponsableASupprimer = scanner.nextInt();
			
			desaffecterResponsable(idResponsableASupprimer);
			
			
			PreparedStatement requeteIdPersonnel = con.prepareStatement("SELECT idPersonnel FROM Responsable WHERE idResponsable = "+ idResponsableASupprimer);
			ResultSet resultIdPersonnel = requeteIdPersonnel.executeQuery();
			
			int idPersonnel = 0;
			while (resultIdPersonnel.next()) {
				idPersonnel = resultIdPersonnel.getInt("idPersonnel");
			}
			
			
			/*
			 * On supprimer le tuple du responsable dans la table Responsable
			 */
			PreparedStatement requeteDeleteResponsable = con.prepareStatement("DELETE FROM Responsable WHERE idResponsable = "+idResponsableASupprimer);
			requeteDeleteResponsable.executeQuery();
			System.out.println("|- Le responsable (id: "+ idResponsableASupprimer +") a été supprimé");	

			if (idPersonnel != 0) supprimerPersonnel(con, idPersonnel);
			else throw new SQLException("idPersonne introuvable");
			
		}
		catch (SQLException e) { 
			e.printStackTrace();
		}
		
	}

	private static void affecterResponsable() {
		try {
			Connection con = ConnexionDB.getConnection();
			
			/**
			 * On affiche tous les responsables sans affectation.
			 */
			System.out.println("\nLequel de ces responsables sans affectation voulez-vous affecter :");
			executerEtAfficherSelect(con, "SELECT * FROM Responsable WHERE idCentre IS NULL");
			
			int idResponsableAAffecter = scanner.nextInt();
			// TODO : Vérifier saisie;

			
			/**
			 * On affiche tous les centres sans responsable attitré.
			 */
			System.out.println("\nPour lequel de ces centres sans responsable voulez-vous un responsable :");
			executerEtAfficherSelect(con, "(SELECT DISTINCT idCentre, nomCentre FROM Centre) MINUS (SELECT idCentre, nomCentre FROM Centre WHERE IDCENTRE IN (SELECT idCentre FROM responsable))");
		
			int idCentreAvecNouveauResponsable = scanner.nextInt();
			// TODO : Vérifier saisie;

			/**
			 * Requête de mise à jour
			 */
			PreparedStatement requeteAffectResponsable = con.prepareStatement("UPDATE Responsable SET idCentre = "+idCentreAvecNouveauResponsable +" WHERE idResponsable = "+idResponsableAAffecter);
			requeteAffectResponsable.executeQuery();
			
			System.out.println("Le responsable (id: "+ idResponsableAAffecter+ ") a été affecté au centre "+ idCentreAvecNouveauResponsable +".");
		} catch (SQLException e) { 
			e.printStackTrace();
		}
	}



	private static void desaffecterResponsable() {
		try {
			Connection con = ConnexionDB.getConnection();
			
			/**
			 * On affiche tous les responsables sans affectation.
			 */
			System.out.println("\nLes responsables affectés :");
			executerEtAfficherSelect(con, "SELECT DISTINCT idResponsable, idCentre FROM Responsable WHERE idCentre IS NOT NULL ");
			
			int idResponsableADesaffecter = scanner.nextInt();
			PreparedStatement requeteDesaffect = con.prepareStatement("UPDATE Responsable SET idCentre = null WHERE idResponsable = "+idResponsableADesaffecter);
			requeteDesaffect.executeQuery();
			System.out.println("Le responsable (id: "+ idResponsableADesaffecter +") a été désaffecté de son centre.");			
			
		} catch (SQLException e) { 
			e.printStackTrace();
		}
	}
	
	// Overload
	private static void desaffecterResponsable(int idResponsable) {
		try {
			Connection con = ConnexionDB.getConnection();

			PreparedStatement requeteDesaffect = con.prepareStatement("UPDATE Responsable SET idCentre = null WHERE idResponsable = "+idResponsable);
			requeteDesaffect.executeQuery();
			System.out.println("|- Le responsable (id: "+ idResponsable +") a été désaffecté de son centre.");			
			
		} catch (SQLException e) { 
			e.printStackTrace();
		}
	}
	
	
	/** ------------------------------------
	 *              Application
	 *  ------------------------------------ */
	private static void afficherMenuAdministrateur() {
	    System.out.flush();
		System.out.println("==================================");
		System.out.println("| Menu Principal - Administrateur |");
		System.out.println("==================================");	
		System.out.println("1. Gerer un centre");
		System.out.println("2. Gerer un responsable");
		System.out.println("3. Quitter");	
	}
	
	private static void traitementChoixMenuPrincipal() {
		
		switch (scanner.nextInt()) {
		case 1:
			gererCentre();
			break;
			
		case 2: 
			gererResponsable();
			break;
			
		case 3:
			System.out.println("A bientôt sur l'application! :)");
			System.exit(0);
			break;
			
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			UIAdministrateur();
			break;
		}
	}
}