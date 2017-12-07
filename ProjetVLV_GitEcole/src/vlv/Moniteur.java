package vlv;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.*;

public class Moniteur extends Personnel {

	private static int myLoginID;
	/**
	 * Attribut statique permettant de récupérer les choix 
	 * saisis par le responsable.
	 * Cet attribut est purement lié à l'application, pas du tout à la modélisation.
	 */
	private static Scanner scanner = new Scanner(System.in);
	
	
	public Moniteur() {
		try {
			System.out.println("===============");
			System.out.println("| Moniteur |");
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
		}
		catch (InputMismatchException e){ System.err.println("Vous venez de faire une erreur de frappe !"); }
	}
	



	/**
	 * Fonction appelée en premier, permettant au moniteur de se log.
	 */
	static void LoginMoniteur() {
		demanderIdMoniteur();
		UIMoniteur();
	}
	
	/**
	 * Fonction principale gérant l'interface du moniteur
	 */
	static void UIMoniteur() {
		while (true) {
			afficherMenuMoniteur();
			traitementChoixMenuPrincipal();
		}
	}
	
	
	private static void demanderIdMoniteur() {
		try {
			Connection con = ConnexionDB.getConnection();
			System.out.println("Bonjour Moniteur, quel est votre identifiant ?");
			executerEtAfficherSelect(con, "SELECT * FROM Moniteur");
			myLoginID = scanner.nextInt();
			// TODO : Gérer le range du scan
			
			/*
			 * On récupère le nom et le prénom du moniteur, juste pour le côté user-friendly
			 */
			PreparedStatement selectListe = con.prepareStatement("select distinct p.nom, p.prenom from personne p where p.idPersonne = (select idpersonne from personnel where idpersonnel = (select idpersonnel from moniteur where idmoniteur = "+ myLoginID +"))");
			ResultSet resultatSelect = selectListe.executeQuery();
			System.out.println("Vous êtes : ");
			
			while (resultatSelect.next()) {
				for (int i = 1; i <= 2; i++) {
			        if (i > 1) System.out.print(" ");
			        String columnValue = resultatSelect.getString(i);
			        System.out.print(columnValue);
			    }
				System.out.println("");
			}
			
		} catch (SQLException e) {
			System.err.println("Connexion à la BDD impossible");
			e.printStackTrace();
		}
	}
	
	


	/**
	 * Le constructeur avec paramètres permet d'instancier un Moniteur
	 * dans le but de l'ajouter à l'application et à la BDD.
	 */






	private Set<Habilitation> habilitation;

	private Set<Seance> seancesEncadrees;

	private static void visualiserSeance() {
		try {
			Connection con = ConnexionDB.getConnection();
			System.out.println("Vos séances prévues : ");
			executerEtAfficherSelect(con, "SELECT * FROM Encadre WHERE idMoniteur = "+myLoginID +"");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	private static void afficherMenuMoniteur() {
	    System.out.flush();
		System.out.println("==================================");
		System.out.println("| Menu Principal - Moniteur |");
		System.out.println("==================================");	
		System.out.println("1. Visualiser mes séances");
		System.out.println("2. Quitter");	
		
	}

	private static void traitementChoixMenuPrincipal() {
		
		switch(scanner.nextInt()) {
		case 1:
			visualiserSeance();
			break;
		case 2:
			System.out.println("A bientôt sur l'application! :)");
			System.exit(0);
			break;
		default:
			System.err.println("Veuillez faire un choix valide.\n");
			UIMoniteur();
			break;
		}
	}

	/**
	 * @return the habilitation
	 */
	public Set<Habilitation> getHabilitation() {
		return habilitation;
	}

	/**
	 * @param habilitation the habilitation to set
	 */
	public void setHabilitation(Set<Habilitation> habilitation) {
		this.habilitation = habilitation;
	}

	/**
	 * @return the seancesEncadrees
	 */
	public Set<Seance> getSeancesEncadrees() {
		return seancesEncadrees;
	}

	/**
	 * @param seancesEncadrees the seancesEncadrees to set
	 */
	public void setSeancesEncadrees(Set<Seance> seancesEncadrees) {
		this.seancesEncadrees = seancesEncadrees;
	}
}