package fr.esisar.calculatrice;

import java.text.DecimalFormat;
import java.util.ArrayList;

public class Calculatrice {
	

	/**
	 * Exercice 1 & 2
	 */
	public void ajouter(int operande1, int operande2) {
		System.out.println(operande1 + " + " + operande2 + " = " + (operande1+operande2) );
	}
	
	
	public void soustraire(int operande1, int operande2) {
		System.out.println(operande1 + " - " + operande2 + " = " + (operande1-operande2));
	}
	
	
	public void multiplier(int operande1, int operande2) {
		System.out.println(operande1 + " * " + operande2 + " = " + (operande1*operande2) );
	}
	
	
	public void diviser(int operande1, int operande2) throws OperationInvalide {
		if (operande2 == 0) {
			throw new OperationInvalide("Division par Z E R O");
		}
		System.out.println(operande1 + " / " + operande2 + " = " +  (float)operande1/operande2 );
	}
	
	/**
	 * Exercice 3
	 */
	private ArrayList<Operation> listeOp = new ArrayList<>();

	public Calculatrice (ArrayList<Operation> listeOp) {
		this.listeOp = listeOp;
	}
	
	public Operation chercherOperation(String nom) {
		if (nom.equals("+")) return new Ajouter(); 
		if (nom.equals("-")) return new Retrancher(); 
		if (nom.equals("*")) return new Multiplier(); 
		if (nom.equals("/")) return new Diviser(); 
		if (nom.equals("max")) return new Max();
		if (nom.equals("min")) return new Min(); 
		if (nom.equals("cos")) return new Cosinus(); 
		if (nom.equals("sin")) return new Sinus(); 
		else return null;
	}
	
	public double calculer(String nom, double[] parametres) throws OperationInvalide {
		return chercherOperation(nom).calculer(parametres);
	}
	
	public void ajouterOperation(Operation o) {
		listeOp.add(o);
	}
	
	public void enleverOperation(Operation o) {
		listeOp.remove(o);
	}
}
