package cours;

public class Compteur {
	int nbTotal;
	
	/*public void add(int nb) {*/
	synchronized public void add(int nb) {
		nbTotal += nb;
	}
	
	public int getNbPieces() { return nbTotal; }
}
