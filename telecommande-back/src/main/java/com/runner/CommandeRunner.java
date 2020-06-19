package com.runner;

import java.awt.AWTException;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.model.Commande;

@Service
public class CommandeRunner {
	
	Robot robot;
	
	@PostConstruct
	public void init() {
	    System.setProperty("java.awt.headless", "false");

		try {
			this.robot = new Robot();
		} catch (AWTException e) {
			e.printStackTrace();
		}
	}
	
	
	public boolean execute(String[] cmdArgs) {

		try {
			ProcessBuilder pb = new ProcessBuilder(cmdArgs);
			pb.redirectErrorStream(true);
			Process process;
			process = pb.start();
			new BufferedReader(new InputStreamReader(process.getInputStream()) ); 
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


	/**
	 * pour CTRL + SHIFT + A, on fait :
	 * 
	 * this.robot.keyPress(keyEvent.get(0));
				this.robot.keyPress(keyEvent.get(1));
					this.robot.keyPress(keyEvent.get(2));
					this.robot.keyRelease(keyEvent.get(2));
				this.robot.keyRelease(keyEvent.get(1));
			this.robot.keyRelease(keyEvent.get(0));
			
	 * @param keyEvent
	 */
	public boolean pressCombination(List<Integer> keyEvent) {
		try {
			for (int integer : keyEvent) {
				this.robot.keyPress(integer);
			}
			
			Collections.reverse(keyEvent);
			
			for (int integer : keyEvent) {
				this.robot.keyRelease(integer);
			}
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	
	public boolean closeChromeTab() {
		try {		
			this.pressCombination(Arrays.asList(KeyEvent.VK_CONTROL, KeyEvent.VK_W));
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	


	public void runFullScreenBfm() {
		try {
			this.pressCombination(Arrays.asList(KeyEvent.VK_CONTROL, KeyEvent.VK_SHIFT, KeyEvent.VK_J));
			Thread.sleep(500);
			
			String text = "document.querySelector(\".vjs-fullscreen-control\").click()";
			StringSelection stringSelection = new StringSelection(text);
			Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
			clipboard.setContents(stringSelection, stringSelection);
			
			Thread.sleep(500);
			
			
			this.pressCombination(Arrays.asList(KeyEvent.VK_CONTROL, KeyEvent.VK_V));
	
			
			Thread.sleep(500);
			
			
			this.robot.keyPress(KeyEvent.VK_ENTER);		
			this.robot.keyRelease(KeyEvent.VK_ENTER);
			
			Thread.sleep(500);
			
			this.robot.keyPress(KeyEvent.VK_F12);		
			this.robot.keyRelease(KeyEvent.VK_F12);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}


	public void doLeftClick(int x, int y) {
		this.robot.mouseMove(x, y);
		try {
			Thread.sleep(200);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		this.robot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
		this.robot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);
		
	}


	public BufferedImage generateScreenshot() {
		return this.robot.createScreenCapture(new Rectangle(3840, 1080));
	}
}