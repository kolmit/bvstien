package tdm7;

import java.io.*;
import java.net.ServerSocket;
import java.util.regex.*;
import java.net.InetSocketAddress;
import java.net.Socket;


/**
 * echo -e "GET / HTTP/1.1\nHost:127.0.0.1\n\n" | netcat 127.0.0.1 8080
 * echo -e "GET /index.html HTTP/1.1\nHost:127.0.0.1\n\n" | netcat 127.0.0.1 8080
 * Navigateur : 127.0.0.1:8080/index.html
 */

public class HttpServeur extends Thread
{
    private InputStream in; // input stream de la connexion avec le client
    private OutputStream out; // output stream de la connexion avec le client
    private Socket sock; // socket de la connexion avec le client
    private int ID; // de manière à repérer chaque session

    public HttpServeur(Socket sock,InputStream in, OutputStream out, int ID) // Constructeur du serveur (de la session)
    {
        this.sock = sock;
        this.in = in;
        this.out = out;
        this.ID = ID;
    }

    @Override
    public void run()
    {
        System.out.println("Gestion d'un nouveau client lancée (ID " + this.ID + ")");
        for (int dummy = 1; dummy < 999999; dummy++)
        {
            try
            {
                //Pattern p = Pattern.compile("(GET (/.*) HTTP/[0-9]\\.[0-9][\\s\\S].*\r\n\r\n)[\\s\\S]*"); // Requête de fichier, il faut laisser passer les différentes versions de HTTP

                Pattern p = Pattern.compile("(GET (/.*) HTTP/([0-9]\\.[0-9])[\\s\\S]*\r\n\r\n)[\\s\\S]*");
                String requete = ""; // Ne pas faire attention au nom des variables des 10 lignes suivantes, ça vient de vieux TD :D
                Matcher m = p.matcher(requete); //la chaîne de caractères correspond-t-elle au regex ?
                
                
                while (!m.matches()) // tant qu'elle ne correspond pas
                {
                    byte[] bufR = new byte[2048];
                    int lenBufR = in.read(bufR);
                    if (lenBufR == -1)
                    {
                        System.out.println("Connection d'ID " + this.ID + " fermée");
                        this.sock.close();
                        return;
                    }
                    String reponse = new String(bufR, 0, lenBufR); // récupération du fragment de données reçu
                    requete += reponse; // ajout à notre chaîne de caractères d'accumulation
                    System.out.println(requete);
                    m = p.matcher(requete); // On revérifie la chaîne
                    System.out.println("Matches ??? " + m.matches());
                }

                System.out.println("Requête du client (version HTTP : " + m.group(3) + ":\n\n" + m.group(1) + "--- FIN REQUÊTE ---");

                String filename = "." + m.group(2);
                if (filename.equals("./"))filename = "./index.html";
                System.out.println("Requête du fichier " + filename);
                byte[] buffer = new byte[1000000];
                int len;
                try
                {
                    FileInputStream file = new FileInputStream(filename); // On met le fichier dans un buffer classique
                    len = file.read(buffer);
                } catch (Exception e)
                {
                    String reponse = "HTTP/1.0 404 Not Found\r\nConnection: Keep-Alive\r\n\r\n";
                    out.write(reponse.getBytes());
                    System.out.println("Une erreur de lecture a été détectée");
                    e.printStackTrace();
                    //sock.close();
                    continue;
                }
                Pattern html = Pattern.compile(".*\\.html");
                Matcher ishtml = html.matcher(filename);
                if (ishtml.matches()) // S'il s'agit d'une page HTML
                {
                    String reponse = "HTTP/1.0 200 OK\r\nConnection: Keep-Alive\r\nContent-length: " + len + "\r\nContent-Type: text/html\r\n\r\n";
                    out.write(reponse.getBytes());
                    out.write(buffer, 0, len);
                } else
                {
                    String reponse = "HTTP/1.0 200 OK\r\nConnection: Keep-Alive\r\nContent-length: " + len + "\r\n\r\n";
                    out.write(reponse.getBytes());
                    out.write(buffer, 0, len);
                }
            } catch (Exception exception)
            {
                System.out.println("Un client a déclenché une erreur d'entrée/sortie");
                try
                {
                    sock.close();
                } catch (IOException e)
                {
                    e.printStackTrace();
                }
            }
        }
    }
    public static void main(String[] args) throws Exception
    {
        System.out.println("Demarrage du serveur ...");

        ServerSocket socketEcoute = new ServerSocket();
        socketEcoute.bind(new InetSocketAddress(8080)); // Ecoute sur le port HTTP

        for (int dummy = 1; dummy < 1000000; dummy++)
        {
            Socket socketConnexion = socketEcoute.accept();
            System.out.println("Ouverture de la connexion n°" + dummy);
            HttpServeur s = new HttpServeur(socketConnexion,socketConnexion.getInputStream(), socketConnexion.getOutputStream(), dummy);
            s.start(); // On envoie le client sur un nouveau thread
        }
    }
}
