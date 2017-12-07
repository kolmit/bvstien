package vlv;
import java.util.*;

public class Materiel {
	
	/**
	 * Attribut statique permettant de récupérer les choix 
	 * saisis par l'administrateur.
	 * Cet attribut est purement lié à l'application, pas du tout à la modélisation.
	 */
	private Scanner scanner = new Scanner(System.in);
	
	
	public Materiel() {
		try {
			System.out.println("============");
			System.out.println("| Materiel |");
			System.out.println("============");
			
			System.out.println("Type :");
			this.type = scanner.nextLine();
			
			System.out.println("Marque :");
			this.marque = scanner.nextLine();
			
			System.out.println("Modele :");
			this.modele = scanner.nextLine();
			
			System.out.println("Niveau de pratique :");
			System.out.println("|-- 1. Debutant");
			System.out.println("|-- 2. Confirme");
			System.out.println("|-- 3. Expert");
			
			switch(scanner.nextInt()) {
				case 1: this.niveauPratique = "Debutant"; break;
				case 2: this.niveauPratique = "Confirme"; break;
				case 3: this.niveauPratique = "Expert"; break;
			}
			scanner.nextLine();
			
			System.out.println("Quantité :");
			this.quantite = scanner.nextInt();
			scanner.nextLine();
		}
		catch (InputMismatchException e){ System.err.println("Vous venez de faire une erreur de frappe !"); }
	}

	private String type;
	private String marque;
	private String modele;
	private String niveauPratique;
	private int quantite;
	private int idCentre;

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the marque
	 */
	public String getMarque() {
		return marque;
	}

	/**
	 * @param marque the marque to set
	 */
	public void setMarque(String marque) {
		this.marque = marque;
	}

	/**
	 * @return the modele
	 */
	public String getModele() {
		return modele;
	}

	/**
	 * @param modele the modele to set
	 */
	public void setModele(String modele) {
		this.modele = modele;
	}

	/**
	 * @return the niveauPratique
	 */
	public String getNiveauPratique() {
		return niveauPratique;
	}

	/**
	 * @param niveauPratique the niveauPratique to set
	 */
	public void setNiveauPratique(String niveauPratique) {
		this.niveauPratique = niveauPratique;
	}

	/**
	 * @return the quantite
	 */
	public int getQuantite() {
		return quantite;
	}

	/**
	 * @param quantite the quantite to set
	 */
	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}




}