package com;

import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.URL;

@Component
public class MySystemTray extends TrayIcon {
    private static final String IMAGE_PATH = "/icon.png";
    private static final String TOOLTIP = "Télécommande";

    private PopupMenu popup;
    private SystemTray tray;

    public MySystemTray(){
        super(createImage(IMAGE_PATH,TOOLTIP),TOOLTIP);
        tray = SystemTray.getSystemTray();
    }

    @PostConstruct
    private void setup() throws AWTException{
        initMenu();
        setPopupMenu(popup);
        tray.add(this);
    }

    private void initMenu(){
        popup = new PopupMenu();
        MenuItem m = new MenuItem("Quitter");
        m.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.exit(0);
            }
        });
        popup.add(m);
    }


    protected static Image createImage(String path, String description){
        URL imageURL = MySystemTray.class.getResource(path);
        if (imageURL == null) {
            System.err.println("Problème pour récupérer l'image: "+path);
            return null;
        } else {
            return new ImageIcon(imageURL,description).getImage();
        }
    }
}