package fr.esisar.calculatrice;

public class OperationInvalide extends Exception {
	private String message;
	
	public OperationInvalide(String message) {
		this.message = message;
	}

	public String toString() {
		return this.message;
	}

}
