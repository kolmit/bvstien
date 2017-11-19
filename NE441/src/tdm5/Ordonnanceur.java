package tdm5;

import java.util.ArrayList;

public class Ordonnanceur {
	
	
	private static final int N = 4000000;
	private static int nbThread = 32;
	private static ArrayList<CalculPi> listeCalculateur;
	
	
	public static void main (String[] args) throws InterruptedException {
		listeCalculateur = new ArrayList<>();
		
		for (int i = 0 ; i < nbThread  ; i++) {
			System.out.println(i*N/nbThread+1 +" - "+ ((((i+1)*N)/nbThread)) );
			listeCalculateur.add(new CalculPi(i*N/nbThread+1, (((i+1)*N)/nbThread  )));
			listeCalculateur.get(i).start();
		}
		
		
		double PiConstant = 0; 
		for (int i = 0 ; i<nbThread ; i++) {
			listeCalculateur.get(i).join();
			PiConstant += listeCalculateur.get(i).getResult();
		}
		
		/* Pour k = 0 */
		PiConstant += 1;
		
		PiConstant *= 4;
		System.out.println("PI = " + PiConstant);

	}
}
