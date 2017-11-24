package tdm8;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;

import org.xml.sax.SAXException;

public class GetGoogleXML {
		private final String APIkey_Distance = "AIzaSyBS5XHeudFLZrk7krk-h_k260mmKkYW6NU";
		private final String APIkey_HighestPoint = "AIzaSyBS5XHeudFLZrk7krk-h_k260mmKkYW6NU";
		private final String format = "xml";


		
		public static void main(String [] args) throws IOException, XPathExpressionException, ParserConfigurationException, SAXException {
			new GetGoogleXML().execute();
		}


		private void execute() throws IOException, XPathExpressionException, ParserConfigurationException, SAXException {
			//getDistanceBetweenCities("Valence", "Varadero");
			getHighestPointBetweenCities("Valence", "Sarre-Union");

		}
		
		private void getHighestPointBetweenCities(String depart, String destination) throws IOException, XPathExpressionException, ParserConfigurationException, SAXException {

			String URLToSend = "https://maps.googleapis.com/maps/api/elevation/xml?locations=39.7391536,-104.9847034&key="+APIkey_HighestPoint;
			System.out.println(URLToSend);
			// https://maps.googleapis.com/maps/api/directions/xml?origin=Valence&destination=Paris&key=AIzaSyBS5XHeudFLZrk7krk-h_k260mmKkYW6NU
			
			/* 
			 * On envoie un GET à l'URL 
			 */
			URL url = new URL(URLToSend);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			
			/*
			 * On lit la réponse renvoyée par Google
			 */
			BufferedReader in = new BufferedReader(
			new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer contentToPrint = new StringBuffer();
			StringBuffer contentToParse = new StringBuffer();

			while ((inputLine = in.readLine()) != null) {
				contentToPrint.append(inputLine + "\n");
				contentToParse.append(inputLine);
			}
			
			/*
			 * On écrit la réponse dans un fichier 
			 */
			String URIofXML = "src\\tdm8\\XmlFromGoogle.xml";
			FileOutputStream fos = new FileOutputStream(new File(URIofXML));
			fos.write(contentToPrint.toString().getBytes(), 0, contentToPrint.length());
			
			
			/*
			 * On appelle le parser 
			 */
			ParserXPath parserXML = new ParserXPath(URIofXML);
			System.out.print("Distance totale entre "+depart+ " et "+destination+" : ");
			parserXML.execute("//route/leg/distance/text/text()");

			in.close();
		}

			
		


		private void getDistanceBetweenCities(String depart, String destination) throws IOException, XPathExpressionException, ParserConfigurationException, SAXException {
			String URLToSend = "https://maps.googleapis.com/maps/api/directions/"+format
					+"?origin="+depart
					+"&destination="+destination
					+"&key="+APIkey_Distance;
			
			// https://maps.googleapis.com/maps/api/directions/xml?origin=Valence&destination=Paris&key=AIzaSyBS5XHeudFLZrk7krk-h_k260mmKkYW6NU
			
			/* 
			 * On envoie un GET à l'URL 
			 */
			URL url = new URL(URLToSend);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			
			/*
			 * On lit la réponse renvoyée par Google
			 */
			BufferedReader in = new BufferedReader(
			new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer contentToPrint = new StringBuffer();
			StringBuffer contentToParse = new StringBuffer();

			while ((inputLine = in.readLine()) != null) {
				contentToPrint.append(inputLine + "\n");
				contentToParse.append(inputLine);
			}
			
			/*
			 * On écrit la réponse dans un fichier 
			 */
			String URIofXML = "src\\tdm8\\XmlFromGoogle.xml";
			FileOutputStream fos = new FileOutputStream(new File(URIofXML));
			fos.write(contentToPrint.toString().getBytes(), 0, contentToPrint.length());
			
			
			/*
			 * On appelle le parser 
			 */
			ParserXPath parserXML = new ParserXPath(URIofXML);
			System.out.print("Distance totale entre "+depart+ " et "+destination+" : ");
			parserXML.execute("//route/leg/distance/text/text()");

			in.close();
		}
}
