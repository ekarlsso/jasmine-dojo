package org.example.messageroom.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class ChatRoom {

    private final List<Message> messages;
    private final List<RoomSession> sessions;

    public ChatRoom() {
        messages = Collections.synchronizedList(new ArrayList<Message>());
        sessions = Collections.synchronizedList(new ArrayList<RoomSession>());
        
        addMessage("Gubbe", "Hi hello!");
        addMessage("Zorro", "zzz");
    }

    public synchronized Integer addMessage(String user, String msg) {
        Integer id = Integer.valueOf(messages.size() + 1);

        Message message = new Message(id, user, msg);
        messages.add(message);

        notifySessions(message);

        return id;
    }

    public synchronized void registerSession(RoomSession session) {
        sessions.add(session);
    }

    public Collection<Message> getMessages() {
        return Collections.unmodifiableList(messages);
    }

    private void notifySessions(Message msg) {
        for (RoomSession session : sessions) {
            session.onNewMessage(msg);
        }
    }
}
