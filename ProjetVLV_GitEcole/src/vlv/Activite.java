package vlv;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

public class Activite {
	
	/**
	 * Attribut statique permettant de récupérer les choix 
	 * saisis par l'administrateur.
	 * Cet attribut est purement lié à l'application, pas du tout à la modélisation.
	 */
	private static Scanner scanner = new Scanner(System.in);

	public Activite() throws SQLException {
	
		System.out.println("============");
		System.out.println("| Activite |");
		System.out.println("============");
		
		System.out.println("Nom :");
		this.nom = scanner.nextLine();
		
		System.out.println("Catégorie :");
		this.categorie = scanner.nextLine();
		
		System.out.println("Nombre de stagiaires minimum :");
		this.nbStagiaire = scanner.nextInt();
		scanner.nextLine();
		
		System.out.println("Nombre de moniteurs nécessaires pour "+this.getNbStagiaire()+" stagiaires :");
		this.nbMoniteurs = scanner.nextInt();
		scanner.nextLine();
	}

	private String nom;
	private String categorie;
	private int nbStagiaire;
	private int nbMoniteurs;
	private Set<Materiel> materielNecessaire;
	private int idHabilitation;





	/**
	 * @return the nom
	 */
	public String getNom() {
		return nom;
	}





	/**
	 * @param nom the nom to set
	 */
	public void setNom(String nom) {
		this.nom = nom;
	}


	/**
	 * @return the description
	 */
	public String getCategorie() {
		return categorie;
	}

	
	/**
	 * @param description the description to set
	 */
	public void setCategorie(String categorie) {
		this.categorie = categorie;
	}


	/**
	 * @return the nbStagiaire
	 */
	public int getNbStagiaire() {
		return nbStagiaire;
	}


	/**
	 * @param nbStagiaire the nbStagiaire to set
	 */
	public void setNbStagiaire(int nbStagiaire) {
		this.nbStagiaire = nbStagiaire;
	}


	/**
	 * @return the nbMoniteurs
	 */
	public int getNbMoniteurs() {
		return nbMoniteurs;
	}


	/**
	 * @param nbMoniteurs the nbMoniteurs to set
	 */
	public void setNbMoniteurs(int nbMoniteurs) {
		this.nbMoniteurs = nbMoniteurs;
	}


	/**
	 * @return the habilitationRequise
	 */
	public int getHabilitationRequise() {
		return idHabilitation;
	}


	/**
	 * @param habilitationRequise the habilitationRequise to set
	 */
	public void setHabilitationRequise(int habilitationRequise) {
		this.idHabilitation = habilitationRequise;
	}





	public Set<Materiel> getMaterielNecessaire() {
		return materielNecessaire;
	}





	public void setMaterielNecessaire(Set<Materiel> materielNecessaire) {
		this.materielNecessaire = materielNecessaire;
	}


}