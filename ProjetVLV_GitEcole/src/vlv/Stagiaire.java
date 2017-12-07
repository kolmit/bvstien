package vlv;
import java.security.Timestamp;
import java.sql.Date;
import java.util.*;

public class Stagiaire extends Personne {

	/**
	 * Attribut statique permettant de récupérer les choix 
	 * saisis par le responsable.
	 * Cet attribut est purement lié à l'application, pas du tout à la modélisation.
	 */
	private static Scanner scanner = new Scanner(System.in);

	public Stagiaire() {
		try {
			System.out.println("===============");
			System.out.println("| Stagiaire |");
			System.out.println("===============");
			
			System.out.println("Nom :");
			this.nom = scanner.nextLine();
			
			System.out.println("Prénom :");
			this.prenom = scanner.nextLine();
			
			System.out.println("Mail :");
			this.mail = scanner.nextLine();
			
			System.out.println("Date de Naissance (yyyy-[m]m-[d]d) :");
			this.dateDeNaissance = java.sql.Date.valueOf(scanner.nextLine());
			
			
			System.out.println("Telephone (format 0466691231) :");
			this.tel = scanner.nextInt();
			scanner.nextLine();
			
			System.out.println("Date de début : (yyyy-[m]m-[d]d)");
			this.dateEntree = java.sql.Date.valueOf(scanner.nextLine());
			
			System.out.println("Date de fin : (yyyy-[m]m-[d]d)");
			this.dateSortie = java.sql.Date.valueOf(scanner.nextLine());		
		}
		catch (InputMismatchException e){ System.err.println("Vous venez de faire une erreur de frappe !"); }
	}



	public Date dateEntree;
	public Date dateSortie;
	private Set<Groupe> monGroupe;


	/**
	 * @return the dateEntree
	 */
	public Date getDateEntree() {
		return dateEntree;
	}

	/**
	 * @param dateEntree the dateEntree to set
	 */
	public void setDateEntree(Date dateEntree) {
		this.dateEntree = dateEntree;
	}

	/**
	 * @return the dateSortie
	 */
	public Date getDateSortie() {
		return dateSortie;
	}

	/**
	 * @param dateSortie the dateSortie to set
	 */
	public void setDateSortie(Date dateSortie) {
		this.dateSortie = dateSortie;
	}

	/**
	 * @return the monGroupe
	 */
	public Set<Groupe> getMonGroupe() {
		return monGroupe;
	}

	/**
	 * @param monGroupe the monGroupe to set
	 */
	public void setMonGroupe(Set<Groupe> monGroupe) {
		this.monGroupe = monGroupe;
	}

}