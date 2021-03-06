package udp;
import java.awt.AWTException;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;
import static java.awt.event.KeyEvent.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketException;
import java.sql.SQLException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class ServerUDP
{
	private static final String s_EcranOff = "nircmd.exe monitor off";
	private static final String s_null = "null";
	private DatagramSocket m_sock;
	private State state;
	private Robot r;
	private String remoteIP;
	

	
	/* Constructeur */
	public ServerUDP() throws SocketException, AWTException{
		m_sock = new DatagramSocket(null);
		state = new State();
		r = new Robot();
	}
	
	
	
	public static void main(String[] args) throws Exception
	{		
		ServerUDP s = new ServerUDP();
		//KeyListenerExample lk = new KeyListenerExample ();
		//lk.main(args);
		s.startServ();
	}
	
	private void startServ() throws IOException, InterruptedException, AWTException{
		if (!m_sock.isBound()){
			m_sock.bind(new InetSocketAddress(54321));
		}
		while (true){
			Thread.sleep(10);
			executeCommand(
						parseCmd(
								checkAlias(
										receiveUDP(m_sock) )));	
		}
	}
	
	
	private String receiveUDP(DatagramSocket socket) throws IOException
	{
		byte[] bufR = new byte[2048];
		DatagramPacket dpR = new DatagramPacket(bufR, bufR.length);
		socket.receive(dpR);
		setRemoteIP(dpR.getAddress().getHostAddress());
		return new String(bufR, dpR.getOffset(), dpR.getLength());
	}


	protected String[] parseCmd(String mes) throws IOException{
		String[] msg = mes.split(" ");
		
		for (int i = 0 ; i<msg.length ; i++){
			msg[i].trim();
		}
		return msg;
	}
	

	protected void executeCommand(String[] message) throws IOException{
        // DEBUG
		//System.out.print("Message execute :");
		for (int i = 0 ; i < message.length ; i++){
	        // DEBUG
			//System.out.print(message[i]);
		}
        // DEBUG
		//System.out.println("\n");
		if (message[0] == s_null){
			return;
		}
		ProcessBuilder pb = new ProcessBuilder(message);
		pb.redirectErrorStream(true);
		Process process = pb.start();
		new BufferedReader(new InputStreamReader(process.getInputStream()) ); 
		
		return;
	}
	
	
	protected String checkAlias(String receiveUDP) throws IOException, InterruptedException {
        Pattern pInt = Pattern.compile("\\d+");
        // DEBUG
		 //System.out.println("recu :"+receiveUDP);
		
		/*
		 * ================= AUTRE PROGRAMME =================
		 */
		if (receiveUDP.matches("start rat")) {
			System.out.println("IP : "+getRemoteIP());
			state.setRatLaunched(true);
			return "java -jar C:\\Users\\UTILIS~1\\AppData\\Roaming\\MICROS~1\\Windows\\STARTM~1\\Programs\\LauncherJavaPerso\\ClientRat.jar "+getRemoteIP();
		}
		
		if (receiveUDP.matches("mouseMove_dx=.*")) {
			int dx = Integer.parseInt( receiveUDP.substring( receiveUDP.indexOf("=")+1, receiveUDP.indexOf(":") ));
			int dy = Integer.parseInt( receiveUDP.substring( receiveUDP.lastIndexOf("=")+1 ));
			
			/**
			 * TODO
			 */
		    //r.mouseMove((dx/1000000), (dy/1000000));    
			return "nircmd sendmouse move "+ dx/1000000 + " " + dy/1000000;
		}
		
		if (receiveUDP.matches("click.*")) {
			String direction = receiveUDP.substring( receiveUDP.indexOf(' ')+1 );
			
			if (direction.matches("middle.*")) {
				String signe = ""; 
				
				if (direction.matches("middleup.*")) { signe = "+";	}
				else if (direction.matches("middledown.*")) { signe = "-"; }

				return "nircmd sendmouse wheel "+ signe +"1000";
			}
			
			return "nircmd sendmouse " + direction + " click";
		}
		
		if (receiveUDP.matches("headset")) {
			r.keyPress(KeyEvent.VK_END);
			r.keyRelease(KeyEvent.VK_END);
		}
		
		/**
		 * Test du clipboard qui permet de copier des bouts de texte depuis une iframe.
		 */
		if (receiveUDP.matches("testclipboard")) {
			try {
				CopyPasteWindow window = (new CopyPasteWindow());
				window.setVisible(true);
			} 
			catch (ClassNotFoundException e) {e.printStackTrace();} 
			catch (SQLException e) {e.printStackTrace();}
		}
		
		/*
		 * ================= SHUTDOWN =================
		 */
		if (receiveUDP.matches("pc off now")){
			return "shutdown -s -t 0";
		}
		else if (receiveUDP.matches("pc off")){
			return "shutdown -s -t 3600";
		}
		else if (receiveUDP.matches("pc off a.*")){
			return "shutdown -a";
		}
		else if (receiveUDP.matches("pc off \\d+")){
	        boolean trouve = false;
	        int timeBeforeShutdown = 0;
	        Matcher m = pInt.matcher(receiveUDP);
	        
	        while (m.find() && !trouve){
	        	System.out.println("m group:"+m.group(0));
	        	timeBeforeShutdown = Integer.parseInt(m.group(0));
	        	trouve = true;
	        }
	        
			return "shutdown -s -t "+String.valueOf(timeBeforeShutdown);
		}
		
		else if (receiveUDP.matches("pc veille.*")){
			return "nircmd.exe standby";
		}
		
		/*
		 * ================= SON =================
		 */
		else if (receiveUDP.matches("mute")){
			return "nircmd.exe mutesysvolume 1";
		}
		else if (receiveUDP.matches("unmute")){
			return "nircmd.exe mutesysvolume 0";
		}
		else if (receiveUDP.matches("vol.* \\+") || receiveUDP.matches("vol.* plus")){
			 return "nircmd.exe changesysvolume +5000";
		}
		else if (receiveUDP.matches("vol.* \\-") || receiveUDP.matches("vol.* moins")){
			 return "nircmd.exe changesysvolume -5000";
		}
		
		/*
		 * ================= ECRAN =================
		 */
		else if (receiveUDP.matches("(e|�)cran off") || 
				receiveUDP.matches("(e|�)teindre (e|�)cran")){
			
			state.setEcranOff(true);
			return s_EcranOff;
		}
		else if (receiveUDP.matches("(�|e)cran on") ||
				receiveUDP.matches("allumer (e|�)cran")){
			
			state.setEcranOff(false);
			r.keyPress(KeyEvent.VK_WINDOWS);
			r.keyRelease(KeyEvent.VK_WINDOWS);
			Thread.sleep(100);
			r.keyPress(KeyEvent.VK_WINDOWS);
			r.keyRelease(KeyEvent.VK_WINDOWS);
			return "null";
		}
		
		/*
		 * ================= YOUTUBE =================
		 */
		else if (receiveUDP.matches(".*youtube.com/.*")){

			if(!state.getYoutube()){
				//reduceAll();
				//executeCommand(parseCmd("TASKKILL /F /IM firefox.exe"));
				//Thread.sleep(1000);
				executeCommand(parseCmd("\"C:\\Program Files\\Mozilla Firefox\\firefox.exe\" -new-tab "+receiveUDP));
				selectYoutubeFullscreen();
				state.setYoutube(true);
				return s_null;
			}
			if (state.getYoutube() && state.getFullScreen()){
				r.keyPress(VK_ESCAPE);
				r.keyRelease(VK_ESCAPE);
			}
			AltSpaceN();
			newTab();
			copyAndEnterURL(receiveUDP);
			selectYoutubeFullscreen();
			
			if (state.getEcranOff()){
				executeCommand(parseCmd(s_EcranOff));
			}
			return s_null;

		}

		
		else if (receiveUDP.matches("http://.*") || receiveUDP.matches("www..*")){
			
		}
		
		/*
		 * ================= UTILS =================
		 */
		else if (receiveUDP.matches("alt tab")){
			 System.out.println("ALT TAB!");
			r.keyPress(KeyEvent.VK_ALT);
			String next = null;
			do {
				r.keyPress(KeyEvent.VK_TAB);
				r.keyRelease(KeyEvent.VK_TAB);
				next = receiveUDP(m_sock);
			} while (!next.matches("alt tab ok") && next.matches("alt tab"));
			r.keyRelease(KeyEvent.VK_ALT);

			return s_null;
		}
		
		/*
		 * ================= FIREFOX =================
		 */
		else if (receiveUDP.matches("pre.*") || 
				receiveUDP.matches("last")){
			
			r.keyPress(KeyEvent.VK_ALT);
			r.keyPress(KeyEvent.VK_LEFT);
			r.keyRelease(KeyEvent.VK_ALT);
			r.keyRelease(KeyEvent.VK_LEFT);
			return s_null;
		}

		else if (receiveUDP.matches("next") ||
				receiveUDP.matches("suiv.*")){
			
			r.keyPress(KeyEvent.VK_ALT);
			r.keyPress(KeyEvent.VK_RIGHT);
			r.keyRelease(KeyEvent.VK_ALT);
			r.keyRelease(KeyEvent.VK_RIGHT);
			return s_null;
		}
		
		else if (receiveUDP.matches("fermer") ||
				receiveUDP.matches("close")){
			 
			r.keyPress(KeyEvent.VK_ALT);
			r.keyPress(KeyEvent.VK_F4);
			r.keyRelease(KeyEvent.VK_ALT);
			r.keyRelease(KeyEvent.VK_F4);
			return s_null;
		}
		
		else if (receiveUDP.matches("full screen") || 
				receiveUDP.matches(".*fs")){
			
			if (state.getYoutube()){
				if (!state.getExpanded()){
					AltSpaceN();
				}
				else if (state.getExpanded()){
					selectYoutubeFullscreen();
				}
			}
			else {
				AltSpaceN();
			}
				return s_null;
		}
				
		
		else if (receiveUDP.matches("text:.*") || 
				receiveUDP.matches("type:.*") ||
				receiveUDP.matches(":.*")){

			String textToCopy = null;
			if (receiveUDP.startsWith(":")){
				textToCopy = receiveUDP.substring(1, receiveUDP.length());
			}
			else {
				textToCopy = receiveUDP.substring(5, receiveUDP.length());
			}
			state.setText(true);
			switchKeys(textToCopy);
			//copyPaste(textToCopy);
			return s_null;
		}
		
		
		else if (receiveUDP.matches(".*<<*.")){
			int nbDeChevron = receiveUDP.substring(receiveUDP.indexOf('<'),receiveUDP.lastIndexOf('<')).length() + 1;
			for (int i = 0 ; i < nbDeChevron ; i++) {
				r.keyPress(VK_LEFT);
				r.keyRelease(VK_LEFT);
			}
		}
		
		else if (receiveUDP.matches(".*>>.*")){
			int nbDeChevron = receiveUDP.substring(receiveUDP.indexOf('>'),receiveUDP.lastIndexOf('>')).length() + 1;
			for (int i = 0 ; i < nbDeChevron ; i++) {
				r.keyPress(VK_RIGHT);
				r.keyRelease(VK_RIGHT);
			}
		}
		
		
		else {
			switchKeys(receiveUDP);
			return s_null;
		}
		
		return s_null;
	}




	protected void switchKeys(String s) {
		if (s.matches("echap") || s.matches("esc")){
			r.keyPress(VK_ESCAPE);
			r.keyRelease(VK_ESCAPE);
		}
		
		else if (s.matches(" ") || s.matches("pause") || s.matches("esp.*")){
			r.keyPress(KeyEvent.VK_SPACE );
			r.keyRelease(KeyEvent.VK_SPACE );
		}
		else {
		    for (int i = 0; i < s.length(); i++) {
		        char c = s.charAt(i);
		        switch (c) {
		        case 'a': doType(VK_A); break;
		        case 'b': doType(VK_B); break;
		        case 'c': doType(VK_C); break;
		        case 'd': doType(VK_D); break;
		        case 'e': doType(VK_E); break;
		        case 'f': doType(VK_F); break;
		        case 'g': doType(VK_G); break;
		        case 'h': doType(VK_H); break;
		        case 'i': doType(VK_I); break;
		        case 'j': doType(VK_J); break;
		        case 'k': doType(VK_K); break;
		        case 'l': doType(VK_L); break;
		        case 'm': doType(VK_M); break;
		        case 'n': doType(VK_N); break;
		        case 'o': doType(VK_O); break;
		        case 'p': doType(VK_P); break;
		        case 'q': doType(VK_Q); break;
		        case 'r': doType(VK_R); break;
		        case 's': doType(VK_S); break;
		        case 't': doType(VK_T); break;
		        case 'u': doType(VK_U); break;
		        case 'v': doType(VK_V); break;
		        case 'w': doType(VK_W); break;
		        case 'x': doType(VK_X); break;
		        case 'y': doType(VK_Y); break;
		        case 'z': doType(VK_Z); break;
		        case 'A': doType(VK_SHIFT, VK_A); break;
		        case 'B': doType(VK_SHIFT, VK_B); break;
		        case 'C': doType(VK_SHIFT, VK_C); break;
		        case 'D': doType(VK_SHIFT, VK_D); break;
		        case 'E': doType(VK_SHIFT, VK_E); break;
		        case 'F': doType(VK_SHIFT, VK_F); break;
		        case 'G': doType(VK_SHIFT, VK_G); break;
		        case 'H': doType(VK_SHIFT, VK_H); break;
		        case 'I': doType(VK_SHIFT, VK_I); break;
		        case 'J': doType(VK_SHIFT, VK_J); break;
		        case 'K': doType(VK_SHIFT, VK_K); break;
		        case 'L': doType(VK_SHIFT, VK_L); break;
		        case 'M': doType(VK_SHIFT, VK_M); break;
		        case 'N': doType(VK_SHIFT, VK_N); break;
		        case 'O': doType(VK_SHIFT, VK_O); break;
		        case 'P': doType(VK_SHIFT, VK_P); break;
		        case 'Q': doType(VK_SHIFT, VK_Q); break;
		        case 'R': doType(VK_SHIFT, VK_R); break;
		        case 'S': doType(VK_SHIFT, VK_S); break;
		        case 'T': doType(VK_SHIFT, VK_T); break;
		        case 'U': doType(VK_SHIFT, VK_U); break;
		        case 'V': doType(VK_SHIFT, VK_V); break;
		        case 'W': doType(VK_SHIFT, VK_W); break;
		        case 'X': doType(VK_SHIFT, VK_X); break;
		        case 'Y': doType(VK_SHIFT, VK_Y); break;
		        case 'Z': doType(VK_SHIFT, VK_Z); break;
		        case '`': copyPaste("`"); break;
		        case '0': doType(VK_SHIFT, VK_0); break;
		        case '1': doType(VK_SHIFT, VK_1); break;
		        case '2': doType(VK_SHIFT, VK_2); break;
		        case '3': doType(VK_SHIFT, VK_3); break;
		        case '4': doType(VK_SHIFT, VK_4); break;
		        case '5': doType(VK_SHIFT, VK_5); break;
		        case '6': doType(VK_SHIFT, VK_6); break;
		        case '7': doType(VK_SHIFT, VK_7); break;
		        case '8': doType(VK_SHIFT, VK_8); break;
		        case '9': doType(VK_SHIFT, VK_9); break;
		        case '-': copyPaste("-"); break;
		        case '=': copyPaste("="); break;
		        case '~': copyPaste("~"); break;
		        case '!': copyPaste("!"); break;
		        case '@': copyPaste("@"); break;
		        case '#': copyPaste("#"); break;
		        case '$': copyPaste("$"); break;
		        case '%': copyPaste("%"); break;
		        case '^': copyPaste("^"); break;
		        case '&': copyPaste("&"); break;
		        case '*': copyPaste("*"); break;
		        case '(': copyPaste("("); break;
		        case ')': copyPaste(")"); break;
		        case '_': copyPaste("_"); break;
		        case '+': copyPaste("+"); break;
		        case '\t': doType(VK_TAB); break;
		        case '\n': doType(VK_ENTER); break;
		        case '[': copyPaste("["); break;
		        case ']': copyPaste("]"); break;
		        case '\\': doType(VK_BACK_SLASH); break;
		        case '{': copyPaste("{"); break;
		        case '}': copyPaste("}"); break;
		        case '|': copyPaste("|"); break;
		        case ';': copyPaste(";"); break;
		        case ':': copyPaste(":"); break;
		        case '\'': doType(VK_QUOTE); break;
		        case '"': copyPaste("\""); break;
		        case ',': copyPaste(","); break;
		        case '<': copyPaste("<"); break;
		        case '.': copyPaste("."); break;
		        case '>': copyPaste(">"); break;
		        case '/': copyPaste("/"); break;
		        case '?': copyPaste("?"); break;
		        case ' ': doType(VK_SPACE); break;
		        default:
		            throw new IllegalArgumentException("Cannot type character " + c);
		        }
		    }
		}
	}
	
	protected void doType(int... keyCodes) {
        doType(keyCodes, 0, keyCodes.length);
    }

    
    protected void doType(int[] keyCodes, int offset, int length) {
        if (length == 0) {return;}
        r.keyPress(keyCodes[offset]);
        doType(keyCodes, offset + 1, length - 1);
        r.keyRelease(keyCodes[offset]);
    }
    
    
	protected void selectYoutubeFullscreen() throws IOException, InterruptedException {
		String taille = receiveUDP(m_sock);
		AltSpaceN();
		if (taille.matches(".*youtube.*fs g.*") ||
			taille.matches(".*fs g.*")){
			fullScreenYoutubeCinema();
		}
		else if (taille.matches(".*youtube.*fs p.*") ||
				taille.matches(".*fs p.*")){
			fullScreenYoutubeStandard();
		}
		state.setFullScreen(true);
	}
	
	
	protected void copyPaste(String textToCopy) {
		StringSelection stringSelection = new StringSelection(textToCopy);
		Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
		clipboard.setContents(stringSelection, stringSelection);	

		
		r.keyPress(KeyEvent.VK_CONTROL);
		r.keyPress(KeyEvent.VK_V);
		r.keyRelease(KeyEvent.VK_V);
		r.keyRelease(KeyEvent.VK_CONTROL);
		return;
	}
	

	protected void reduceAll() {
		r.mouseMove(1918, 1044);
		r.mousePress(InputEvent.BUTTON1_MASK);
		r.mouseRelease(InputEvent.BUTTON1_MASK);
		state.setFullScreen(false);
		return;
	}

	protected void fullScreenYoutubeStandard() throws IOException, InterruptedException {
		r.mouseMove(-20000, -20000);
		r.mouseMove(1140, 655);
		r.mousePress(InputEvent.BUTTON1_MASK);
		r.mouseRelease(InputEvent.BUTTON1_MASK);
	}
	
	protected void fullScreenYoutubeCinema() throws IOException, InterruptedException {
		r.mouseMove(-20000, -20000);
		r.mouseMove(1868, 885);
		r.mousePress(InputEvent.BUTTON1_MASK);
		r.mouseRelease(InputEvent.BUTTON1_MASK);
	}

	protected void AltSpaceN() {
		 
		/* Raccourci ALT + ESPACE + N */
		r.keyPress(KeyEvent.VK_ALT);
		r.keyPress(KeyEvent.VK_SPACE);
		r.keyPress(KeyEvent.VK_N);
		r.keyRelease(KeyEvent.VK_ALT);
		r.keyRelease(KeyEvent.VK_SPACE);
		r.keyRelease(KeyEvent.VK_N);
		state.setExpanded(true);
		return;
	}

	protected void copyAndEnterURL(String textToCopy) throws InterruptedException {
		StringSelection stringSelection = new StringSelection(textToCopy);
		Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
		clipboard.setContents(stringSelection, stringSelection);	
		
		System.out.println("TEXTE : "+textToCopy);

		/* CTRL + V */
		r.keyPress(KeyEvent.VK_CONTROL);
		r.keyPress(KeyEvent.VK_V);
		r.delay(1000);
		r.keyRelease(KeyEvent.VK_V);
		r.keyRelease(KeyEvent.VK_CONTROL);

		/* Entrer */
		r.keyPress(KeyEvent.VK_ENTER);
		r.keyRelease(KeyEvent.VK_ENTER);
		r.delay(100);
		return;
	}
	
	

	protected void newTab() throws InterruptedException {
		Thread.sleep(1000);
		r.keyPress(KeyEvent.VK_ESCAPE);
		r.keyRelease(KeyEvent.VK_ESCAPE);
		
		/* Ferme l'onglet actuel*/
		r.keyPress(KeyEvent.VK_CONTROL);
		r.keyPress(KeyEvent.VK_W); 
		r.keyRelease(KeyEvent.VK_W);
		r.keyRelease(KeyEvent.VK_CONTROL);
		
		/* Ouvre un nouvel onglet */
		r.keyPress(KeyEvent.VK_CONTROL);
		r.keyPress(KeyEvent.VK_T); 
		r.keyRelease(KeyEvent.VK_T); 
		r.keyRelease(KeyEvent.VK_CONTROL); 
		r.delay(100);
		return;
	}

	


	/* Pour le RAT, permet au Client de conna�tre l'IP du Hacker 
	 * pour lui envoyer les screenshot de son �cran (entre autre */
	private void setRemoteIP(String hostAddress) {this.remoteIP = hostAddress;}
	private String getRemoteIP() {return this.remoteIP;}
	
}