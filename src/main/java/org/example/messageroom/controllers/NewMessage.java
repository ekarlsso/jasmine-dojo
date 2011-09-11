package org.example.messageroom.controllers;

public class NewMessage {

    private String user;
    private String message;

    public NewMessage(String user, String message) {
        this.user = user;
        this.message = message;
    }

    public NewMessage() {
        this("", "");
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
