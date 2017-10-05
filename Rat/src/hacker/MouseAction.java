package hacker;

import java.io.Serializable;

public class MouseAction implements Serializable {
	public enum typeMouseAction{ Click, Move; };
	private int CoordX;
	private int CoordY;
	private typeMouseAction typeChoice;
	
	public MouseAction(typeMouseAction type, int x, int y){
		typeChoice = type;
		CoordX = x;
		CoordY = y;
	}
	
	
	public int getCoordX() {return CoordX;}
	public void setCoordX(int coordX) {CoordX = coordX;}
	public int getCoordY() {return CoordY;}
	public void setCoordY(int coordY) {CoordY = coordY;}
}
