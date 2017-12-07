package vlv;
import java.util.*;

public class Centre {
	
	/**
	 * Attribut statique permettant de récupérer les choix 
	 * saisis par l'administrateur.
	 * Cet attribut est purement lié à l'application, pas du tout à la modélisation.
	 */
	private static Scanner scanner = new Scanner(System.in);

	
	
	public Centre() {
		try {
			System.out.println("=========");
			System.out.println("| Centre |");
			System.out.println("=========");
			
			System.out.println("Nom du centre :");
			this.nomCentre = scanner.nextLine();
		}
		catch (InputMismatchException e){ System.err.println("Vous venez de faire une erreur de frappe !"); }
	}

	private int identifiant;
	private Set<Activite> activiteProposee;
	private Set<Materiel> materielADisposition;
	private Responsable responsableDuCentre;
	private String nomCentre; 
	private Adresse adresse;

	
	/**
	 * @return the identifiant
	 */
	public int getIdentifiant() {
		return identifiant;
	}

	/**
	 * @param identifiant the identifiant to set
	 */
	public void setIdentifiant(int identifiant) {
		this.identifiant = identifiant;
	}

	/**
	 * @return the activiteProposee
	 */
	public Set<Activite> getActiviteProposee() {
		return activiteProposee;
	}

	/**
	 * @param activiteProposee the activiteProposee to set
	 */
	public void setActiviteProposee(Set<Activite> activiteProposee) {
		this.activiteProposee = activiteProposee;
	}

	/**
	 * @return the materielADisposition
	 */
	public Set<Materiel> getMaterielADisposition() {
		return materielADisposition;
	}

	/**
	 * @param materielADisposition the materielADisposition to set
	 */
	public void setMaterielADisposition(Set<Materiel> materielADisposition) {
		this.materielADisposition = materielADisposition;
	}

	/**
	 * @return the responsableDuCentre
	 */
	public Responsable getResponsableDuCentre() {
		return responsableDuCentre;
	}

	/**
	 * @param responsableDuCentre the responsableDuCentre to set
	 */
	public void setResponsableDuCentre(Responsable responsableDuCentre) {
		this.responsableDuCentre = responsableDuCentre;
	}

	/**
	 * @return the adresse
	 */
	public Adresse getAdresse() {
		return adresse;
	}

	/**
	 * @param adresse the adresse to set
	 */
	public void setAdresse(Adresse adresse) {
		this.adresse = adresse;
	}

	/**
	 * @return the nomCentre
	 */
	public String getNomCentre() {
		return nomCentre;
	}

	/**
	 * @param nomCentre the nomCentre to set
	 */
	public void setNomCentre(String nomCentre) {
		this.nomCentre = nomCentre;
	}

}