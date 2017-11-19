package tdm6;

import java.util.ArrayList;

public class Main {
	
	private final static int nbPhilosophe = 5;
	private ArrayList<Philosophe> losPhilos;
	
	
	public static void main(String[] args) {
		new Main().execute();
	}

	private void execute() {
		Arbitre a = new Arbitre();
		a.execute();
		losPhilos = new ArrayList<>();
		
		for (int i = 0; i < nbPhilosophe ; i++) {
			losPhilos.add(new Philosophe(a, i));
			losPhilos.get(i).start();
		}		
	}
}
