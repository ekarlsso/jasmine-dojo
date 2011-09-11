package org.example.messageroom.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class ChatRoom {

    private final List<Message> messages;

    public ChatRoom() {
        messages = Collections.synchronizedList(new ArrayList<Message>());
        addMessage("Gubbe", "Hi hello!");
        addMessage("Zorro", "zzz");
    }

    public synchronized Integer addMessage(String user, String msg) {
        Integer id = Integer.valueOf(messages.size() + 1);
        messages.add(new Message(id, user, msg));
        return id;
    }

    public Collection<Message> getMessages() {
        return Collections.unmodifiableList(messages);
    }
}
