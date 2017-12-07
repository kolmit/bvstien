package vlv;
import java.sql.Timestamp;
import java.util.*;


public class Seance {

	public Seance() {
	}

	private Date date;

	private Timestamp heureDebut;

	private Timestamp heureFin;

	private Activite activiteDeLaSeance;

	private Moniteur moniteurEncadrant;

	private Groupe groupeParticipantALaSeance;

	/**
	 * @return the date
	 */
	public Date getDate() {
		return date;
	}

	/**
	 * @param date the date to set
	 */
	public void setDate(Date date) {
		this.date = date;
	}

	/**
	 * @return the heureDebut
	 */
	public Timestamp getHeureDebut() {
		return heureDebut;
	}

	/**
	 * @param heureDebut the heureDebut to set
	 */
	public void setHeureDebut(Timestamp heureDebut) {
		this.heureDebut = heureDebut;
	}

	/**
	 * @return the heureFin
	 */
	public Timestamp getHeureFin() {
		return heureFin;
	}

	/**
	 * @param heureFin the heureFin to set
	 */
	public void setHeureFin(Timestamp heureFin) {
		this.heureFin = heureFin;
	}

	/**
	 * @return the activiteDeLaSeance
	 */
	public Activite getActiviteDeLaSeance() {
		return activiteDeLaSeance;
	}

	/**
	 * @param activiteDeLaSeance the activiteDeLaSeance to set
	 */
	public void setActiviteDeLaSeance(Activite activiteDeLaSeance) {
		this.activiteDeLaSeance = activiteDeLaSeance;
	}

	/**
	 * @return the moniteurEncadrant
	 */
	public Moniteur getMoniteurEncadrant() {
		return moniteurEncadrant;
	}

	/**
	 * @param moniteurEncadrant the moniteurEncadrant to set
	 */
	public void setMoniteurEncadrant(Moniteur moniteurEncadrant) {
		this.moniteurEncadrant = moniteurEncadrant;
	}

	/**
	 * @return the groupeParticipantALaSeance
	 */
	public Groupe getGroupeParticipantALaSeance() {
		return groupeParticipantALaSeance;
	}

	/**
	 * @param groupeParticipantALaSeance the groupeParticipantALaSeance to set
	 */
	public void setGroupeParticipantALaSeance(Groupe groupeParticipantALaSeance) {
		this.groupeParticipantALaSeance = groupeParticipantALaSeance;
	}

}