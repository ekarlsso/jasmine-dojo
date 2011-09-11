package org.example.messageroom.controllers;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.example.messageroom.model.ChatRoom;
import org.example.messageroom.model.RoomSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import org.example.messageroom.model.Message;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Collection;
import java.util.logging.Logger;

@Controller
public class MessageController {

    private static final Log LOG = LogFactory.getLog(MessageController.class);

    private ChatRoom chatRoom;

    @Autowired
    public MessageController(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
    }

    @RequestMapping(value="/messages", method = RequestMethod.GET)
    public @ResponseBody Collection<Message> newSession(
            HttpSession httpSession,
            HttpServletResponse response) {

        if (httpSession.getAttribute(RoomSession.SESSION_ID) == null) {

            LOG.info("New session created");
            RoomSession session = new RoomSession();
            chatRoom.registerSession(session);

            httpSession.setAttribute(RoomSession.SESSION_ID, session);
        }

        response.setContentType("application/json");
        return chatRoom.getMessages(); //Not thread safe way to get the messages! :)
    }

    @RequestMapping(value="/newmessages", method = RequestMethod.GET)
    public @ResponseBody Collection<Message> newMessages(
            HttpSession httpSession,
            HttpServletResponse response) {

        response.setContentType("application/json");
        RoomSession session =
                (RoomSession)httpSession.getAttribute(RoomSession.SESSION_ID);

        if (session == null) {
            LOG.info("No session existed!");
            return null;
        }

        return session.listenForMessages();
    }

    @RequestMapping(value="/messages", method = RequestMethod.POST)
    public @ResponseBody String newMessage(@RequestBody NewMessage message,
                                           HttpServletResponse response) {
        response.setContentType("application/json");
        chatRoom.addMessage(message.getUser(), message.getMessage());
        return "";
    }
}
