package vlv;
import java.util.*;

public class Habilitation {
	/*
	 * Attribut d'une adresse.
	 */
	private String habilitation;
	/**
	 * Attribut statique permettant de récupérer les choix 
	 * saisis par l'administrateur.
	 * Cet attribut est purement lié à l'application, pas du tout à la modélisation.
	 */
	private Scanner scanner = new Scanner(System.in);
	
	/**
	 * Constructeur d'une habilitation
	 */
	public Habilitation() {
		try {
			System.out.println("================");
			System.out.println("| Habilitation |");
			System.out.println("================");
			System.out.println("Description de l'habilitation :");
			this.habilitation = scanner.nextLine();
		}
		catch (InputMismatchException e){ 
			System.err.println("Vous venez de faire une erreur de frappe !"); 
		}
	}

	/**
	 * @return the habilitation
	 */
	public String getHabilitation() {
		return habilitation;
	}
	/**
	 * @param habilitation the habilitation to set
	 */
	public void setHabilitation(String habilitation) {
		this.habilitation = habilitation;
	}
}