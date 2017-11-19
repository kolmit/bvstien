package tdm6;

public class Philosophe extends Thread {
	
	private int numPhilosophe;
	private Arbitre a;

	/*
	 * Constructeur
	 */
	public Philosophe(Arbitre a, int num) {
		this.a = a;
		this.numPhilosophe = num;
	}

	/* 
	 * Main
	 */
	public void run() {
		while (true) {
			discuter();
			askFourchette();
		}
	}
	
	
	private void askFourchette() {
		try {
			if (a.getBaguette(numPhilosophe)) {
				
				int time = (int) (Math.random() * (10));
				System.out.println(numPhilosophe + " : Miam pendant "+time+" secondes.");
				Thread.sleep(time*1000);
				a.freeBaguette(numPhilosophe);
			}
			else {
				System.out.println(numPhilosophe + " : Raté!");
				Thread.sleep(1000);
				askFourchette();
			}
		} catch (InterruptedException e) { e.printStackTrace();	}

	}


	private void discuter() {
		try {
			int time = (int) (Math.random() * (10));
			System.out.println(numPhilosophe+" : Je parle pendant "+time+" secondes.");
			Thread.sleep(time*1000);
			
		} 
		catch (InterruptedException e) { e.printStackTrace(); }
	}	
}
