package org.example.messageroom.model;

public class Message {

    private final Integer id;
    private final String user;
    private final String message;

    public Message(Integer id, String user, String message) {
        this.id = id;
        this.user = user;
        this.message = message;
    }

    public Integer getId() {
        return id;
    }

    public String getUser() {
        return user;
    }

    public String getMessage() {
        return message;
    }
}
