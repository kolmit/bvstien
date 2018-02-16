package cours;

import java.util.ArrayList;

public class Base extends Thread{
	private final static int k = 100000000;
	private final static int nbThread = 4;
	
	private double debut;
	private double fin;
	private double resultat;
	
	public static void main (String[] args) throws InterruptedException {
		ArrayList<Base> listeThread = new ArrayList<>();
		long start = System.currentTimeMillis();
		
		for (int i = 0; i < nbThread ; i++) {
			listeThread.add(new Base(i*(k/nbThread), (i+1)*(k/nbThread)-1 ));
			listeThread.get(i).start();
		}
		
		
		double resultatFinal = 1 / ((4*k + 1)*(4*k + 3));
		for (int i = 0; i < nbThread ; i++) {
			listeThread.get(i).join();
			resultatFinal += listeThread.get(i).getResultat();
		}
		
		System.out.println("resultatFinal "+resultatFinal*8+ " calculé en "+ (System.currentTimeMillis() - start) +" ms");
		
	}
	
	
	public Base(double debut, double fin) {
		this.debut = debut;
		this.fin = fin;
	}
	
	@Override
	public void run() {
		System.out.println("debut : " + this.debut + "fin : " + this.fin);

		double resultat = 0;
		for (double i = debut ; i < fin ; i++) {
			resultat += 1 / ((4*i + 1)*(4*i + 3));
		}
		setResultat(resultat);
	}
	
	
	
	public double getResultat() {
		return this.resultat;
	}
	
	public void setResultat(double res) {
		this.resultat = res;
	}
}
