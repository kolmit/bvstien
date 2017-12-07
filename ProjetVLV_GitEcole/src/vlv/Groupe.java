package vlv;
import java.util.*;

public class Groupe {

	public Groupe() {
	}

	public String niveau;

	private Set<Seance> seancePrevue;

	private Set<Stagiaire> listeStagiaires;

	/**
	 * @return the niveau
	 */
	public String getNiveau() {
		return niveau;
	}

	/**
	 * @param niveau the niveau to set
	 */
	public void setNiveau(String niveau) {
		this.niveau = niveau;
	}

	/**
	 * @return the seancePrevue
	 */
	public Set<Seance> getSeancePrevue() {
		return seancePrevue;
	}

	/**
	 * @param seancePrevue the seancePrevue to set
	 */
	public void setSeancePrevue(Set<Seance> seancePrevue) {
		this.seancePrevue = seancePrevue;
	}

	/**
	 * @return the listeStagiaires
	 */
	public Set<Stagiaire> getListeStagiaires() {
		return listeStagiaires;
	}

	/**
	 * @param listeStagiaires the listeStagiaires to set
	 */
	public void setListeStagiaires(Set<Stagiaire> listeStagiaires) {
		this.listeStagiaires = listeStagiaires;
	}

}