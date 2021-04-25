package com.rest.controller;

import com.runner.CommandeRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.awt.event.KeyEvent;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class KeyboardController {

    @Autowired
    private CommandeRunner commandRunner;


    @PostMapping(value="/pressKeyboardKey")
    public boolean pressKeyboardKey(@RequestBody String key) throws NoSuchFieldException, IllegalAccessException {

        List<Integer> keyToPress = new ArrayList<>();

        // Si c'est une majuscule, on va devoir appuyer sur SHIFT.
        if (this.isUppercase(key) || key.matches("[0-9]")) {
            keyToPress.add(KeyEvent.VK_SHIFT);
        }

        Field f = KeyEvent.class.getField( getKeyEventConstant(key) ); // On récupère l'attribut grace à la Reflection.
        keyToPress.add(f.getInt(null));

        return commandRunner.pressCombination(keyToPress);
    }

    private String getKeyEventConstant(String key) {
        String keyCode = "VK_";

        if (key.matches("[A-Z]|[a-z]|[0-9]")) {
            keyCode = keyCode.concat(key);
        } else if (key.matches(" ")){
            keyCode = keyCode.concat("SPACE");
        } else if (key.matches("Enter")) {
            keyCode = keyCode.concat("ENTER");
        } else if (key.matches("Backspace")) {
            keyCode = keyCode.concat("BACK_SPACE");
        } else {
            keyCode = keyCode.concat("UNDEFINED");
        }

        return keyCode.toUpperCase();
    }

    private boolean isUppercase(String key) {
        return key.matches("[A-Z]");
    }
}