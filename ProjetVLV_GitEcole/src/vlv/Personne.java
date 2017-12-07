package vlv;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;


public abstract class Personne {

	protected String nom;
	protected String prenom;
	protected String mail;
	protected Date dateDeNaissance;
	protected int tel;
	protected Adresse adressePersonne;

	public Personne() {	}
	
	public Personne(String nom, String prenom, String mail, Date dateDeNaissance, int tel, Adresse adressePersonne) {
		this.nom = nom;
		this.prenom = prenom;
		this.mail = mail;
		this.dateDeNaissance = dateDeNaissance;
		this.tel = tel;
		this.adressePersonne = adressePersonne;
	}

	/**
	 * @return the nom
	 */
	protected String getNom() {
		return nom;
	}

	/**
	 * @param nom the nom to set
	 */
	protected void setNom(String nom) {
		this.nom = nom;
	}

	/**
	 * @return the prenom
	 */
	protected String getPrenom() {
		return prenom;
	}

	/**
	 * @param prenom the prenom to set
	 */
	protected void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	/**
	 * @return the mail
	 */
	protected String getMail() {
		return mail;
	}

	/**
	 * @param mail the mail to set
	 */
	protected void setMail(String mail) {
		this.mail = mail;
	}

	/**
	 * @return the dateDeNaissance
	 */
	protected Date getDateDeNaissance() {
		return dateDeNaissance;
	}

	/**
	 * @param dateDeNaissance the dateDeNaissance to set
	 */
	protected void setDateDeNaissance(Date dateDeNaissance) {
		this.dateDeNaissance = dateDeNaissance;
	}

	/**
	 * @return the tel
	 */
	protected int getTel() {
		return tel;
	}

	/**
	 * @param tel the tel to set
	 */
	protected void setTel(int tel) {
		this.tel = tel;
	}

	/**
	 * @return the adressePersonne
	 */
	protected Adresse getAdressePersonne() {
		return adressePersonne;
	}

	/**
	 * @param adressePersonne the adressePersonne to set
	 */
	protected void setAdressePersonne(Adresse adressePersonne) {
		this.adressePersonne = adressePersonne;
	}
	
	
	protected static void supprimerPersonne(Connection con, int idPersonne) {
		try {

			PreparedStatement requeteDeletePersonne = con.prepareStatement("DELETE FROM Personne WHERE idPersonne = "+idPersonne);
			requeteDeletePersonne.executeQuery();
			System.out.println("|- La personne (id: "+ idPersonne +") a été supprimée");			
			
		} catch (SQLException e) { 
			e.printStackTrace();
		}
	}

}