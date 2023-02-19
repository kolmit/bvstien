package com;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.swing.*;
import java.awt.*;
import java.net.URL;

@Component
public class MySystemTray extends TrayIcon {
    private static final String IMAGE_PATH = "/icon.png";
    private static final String TOOLTIP = "Télécommande";

    private PopupMenu popup;
    private final SystemTray tray;

    public MySystemTray(){
        super(createImage(),TOOLTIP);
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
        m.addActionListener(e -> System.exit(0));
        popup.add(m);
    }


    protected static Image createImage(){
        URL imageURL = MySystemTray.class.getResource(MySystemTray.IMAGE_PATH);
        if (imageURL == null) {
            System.err.println("Problème pour récupérer l'image: "+ MySystemTray.IMAGE_PATH);
            return null;
        } else {
            return new ImageIcon(imageURL, MySystemTray.TOOLTIP).getImage();
        }
    }
}