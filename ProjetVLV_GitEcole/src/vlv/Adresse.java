package vlv;
import java.util.*;

public class Adresse {
	/**
	 * Attribut statique permettant de récupérer les choix 
	 * saisis par l'administrateur.
	 * Cet attribut est purement lié à l'application, pas du tout à la modélisation.
	 */
	private Scanner scanner = new Scanner(System.in);
	
	/**
	 * Attribut d'une adresse.
	 */
	private int numRue;
	private String rue;
	private String ville;
	private String departement;
	private String pays;
	
	
	public Adresse() {
		try {
			System.out.println("===========");
			System.out.println("| Adresse |");
			System.out.println("===========");
			System.out.println("Numéro de la rue :");
			this.numRue = scanner.nextInt();
			scanner .nextLine();
			
			System.out.println("Nom de la rue :");
			this.rue = scanner.nextLine();
			
			System.out.println("Ville :");
			this.ville = scanner.nextLine();
			
			System.out.println("Departement :");
			this.departement = scanner.nextLine();
			
			System.out.println("Pays :");
			this.pays = scanner.nextLine();
		}
		catch (InputMismatchException e){ 
			System.err.println("Vous venez de faire une erreur de frappe !"); 
		}
	}





	/**
	 * @return the numRue
	 */
	public int getNumRue() {
		return numRue;
	}

	/**
	 * @param numRue the numRue to set
	 */
	public void setNumRue(int numRue) {
		this.numRue = numRue;
	}

	/**
	 * @return the rue
	 */
	public String getRue() {
		return rue;
	}

	/**
	 * @param rue the rue to set
	 */
	public void setRue(String rue) {
		this.rue = rue;
	}

	/**
	 * @return the departement
	 */
	public String getDepartement() {
		return departement;
	}

	/**
	 * @param departement the departement to set
	 */
	public void setDepartement(String codePostal) {
		this.departement = codePostal;
	}

	/**
	 * @return the ville
	 */
	public String getVille() {
		return ville;
	}

	/**
	 * @param ville the ville to set
	 */
	public void setVille(String ville) {
		this.ville = ville;
	}

	/**
	 * @return the pays
	 */
	public String getPays() {
		return pays;
	}

	/**
	 * @param pays the pays to set
	 */
	public void setPays(String pays) {
		this.pays = pays;
	}



}