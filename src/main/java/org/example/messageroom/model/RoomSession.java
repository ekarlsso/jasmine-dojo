package org.example.messageroom.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class RoomSession{

    public static final String SESSION_ID = "RoomSessionID";

    private BlockingQueue<Message> messages;

    public RoomSession() {
        messages = new LinkedBlockingQueue<Message>();
    }

    public void onNewMessage(Message msg)  {
        try {
            messages.put(msg);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public synchronized Collection<Message> listenForMessages() {

        Collection<Message> msg = new ArrayList<Message>();

        if (messages.size() > 0) {
            messages.drainTo(msg);
        } else {
            try {
                Message message = messages.take();
                msg.add(message);

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        return msg;
    }
}
