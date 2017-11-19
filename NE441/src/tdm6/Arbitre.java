package tdm6;

import java.util.ArrayList;

public class Arbitre {
	private ArrayList<Boolean> fourchettes;
	private final int nbPhilosophe = 5;

	void execute() {
		fourchettes = new ArrayList<>();
		
		for (int i = 0 ; i < nbPhilosophe ; i++) {
			fourchettes.add(true);
		}
	}

	public boolean getBaguette(int numPhilosophe) {
		if ( fourchettes.get(numPhilosophe) && fourchettes.get( (numPhilosophe+1)%nbPhilosophe) ) {
			fourchettes.set(numPhilosophe, false);
			fourchettes.set( (numPhilosophe+1)%nbPhilosophe, false);
			return true;
		}
		else {
			return false;
		}
	}
	
	public void freeBaguette(int numPhilosophe) {
		fourchettes.set(numPhilosophe, true);
		fourchettes.set( (numPhilosophe+1)%nbPhilosophe, true);
	}
}
