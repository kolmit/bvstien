package tdm4;

import java.io.*;
import java.util.regex.*;
import java.net.InetSocketAddress;
import java.net.Socket;

public class camera
{
    public static void main(String[] args) throws Exception
    {
        //
        System.out.println("Demarrage du client ...");
        //Creation de la socket
        Socket socket = new Socket();
        // Connexion au serveur
        InetSocketAddress adrDest = new InetSocketAddress("127.0.0.1", 8080);
        socket.connect(adrDest);
        // Envoi de la requete
        OutputStream os = socket.getOutputStream();
        InputStream is = new BufferedInputStream(socket.getInputStream()); // Un BufferedInputStream nous permet de marquer une position dans le buffer et d'y revenir

        // La requête est copiée collée de celle qu'envoie google chrome

        String request = "GET /videostream.cgi?user=userir&pwd=userir&rate=14 HTTP/1.1\r\n" +
                "Host: 127.0.0.1:8080\r\n" +
                "Connection: keep-alive\r\n" +
                "Cache-Control: max-age=0\r\n" +
                "Upgrade-Insecure-Requests: 1\r\n" +
                "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36\r\n" +
                "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8\r\n" +
                "Accept-Encoding: gzip, deflate, br\r\n" +
                "Accept-Language: fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4\r\n" +
                "\r\n";
        os.write(request.getBytes());

        Pattern p = Pattern.compile("([\\s\\S]*--ipcamera\r\nContent-Type: image/jpeg\r\nContent-Length: ([0-9]*)\r\n\r\n)[\\s\\S]*"); // On recherche le chunk "ipcamera" ainsi que ses attributs

        for (int dummy = 0;dummy < 99999; dummy++)
        {
            String question = "";

            is.mark(999999); // On marque la position

            Matcher m = p.matcher(question); //la chaîne de caractères correspond-t-elle au regex ?
            while (!m.matches()) // tant qu'elle ne correspond pas
            {
                byte[] bufR = new byte[4096];
                int lenBufR = is.read(bufR, 0 , 4096);
                if (lenBufR <= 0)return;
                String reponse = new String(bufR, 0, lenBufR); // récupération du fragment de données reçu
                question += reponse; // ajout à notre chaîne de caractères d'accumulation
                m = p.matcher(question); // On revérifie la chaîne
            }

            int len = Integer.parseInt(m.group(2)); // On récupère le content length : ce sera la taille du body lié à l'image jpeg

            System.out.println("Reception d'une image de taille : " + len);

            is.reset(); // On revient à la position marquée
            System.out.println(m.group(1) +"\n" + m.group(1).length());
            is.skip(m.group(1).length()); // On skip les headers, pour placer la lecture sur le début du body

            FileOutputStream newfile = new FileOutputStream("img" + (dummy + 1) + ".jpg"); // On stocke ce body dans un fichier jpeg

            if (len <= 0)
            {
                System.out.println("Erreur : fichier inexistant ou taille nulle");
                return;
            }

            byte[] buffer = new byte[len];

            for (int i = 0; i < len; ) // On reçoit juste ce qu'il faut
            {
                int buflen = is.read(buffer, i,len - i); // Donc pas plus que ce qu'il nous reste du body (len - i), et à la bonne place dans le buffer (i)
                if (buflen == -1)return;
                i += buflen;
            }
            newfile.write(buffer, 0, len); // On écrit le body vers le fichier, et on recommence
            newfile.close();
        }
        socket.close();
        System.out.println("Arret du client .");
    }
}
