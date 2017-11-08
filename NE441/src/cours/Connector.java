package cours;

public class Connector extends Thread {
	private Compteur cpt;
	private int numAutomate;
	
	public Connector (Compteur cpt, int numAutomate) {
		this.cpt = cpt;
		this.numAutomate = numAutomate;
		
	}
	
	public void run() {
		while (true) {
			int nb = cpt.getNbPieces();
			cpt.add(1);
		}
	}
	
	public static void main (String[] args) {
		/*
		Compteur cpt = new Compteur();
		Connector c1 = new Connector(cpt, 1);
		Connector c2 = new Connector(cpt, 2);
		Connector c3 = new Connector(cpt, 3);
		Connector c4 = new Connector(cpt, 4);
		*/
		Compteur cpt1 = new Compteur();
		Compteur cpt2 = new Compteur();
		Compteur cpt3 = new Compteur();
		Compteur cpt4 = new Compteur();

		Connector c1 = new Connector(cpt1, 1);
		Connector c2 = new Connector(cpt2, 2);
		Connector c3 = new Connector(cpt3, 3);
		Connector c4 = new Connector(cpt4, 4);
		c1.start();
		c2.start();
		c3.start();
		c4.start();
		
		while(true) {
			System.out.println("Nb piece : "+cpt1.getNbPieces()+"+"+cpt2.getNbPieces()+"+"+cpt3.getNbPieces()+"+"+cpt4.getNbPieces());
		}
	}
}
