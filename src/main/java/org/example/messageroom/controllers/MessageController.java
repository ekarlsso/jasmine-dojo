package org.example.messageroom.controllers;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.example.messageroom.model.ChatRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import org.example.messageroom.model.Message;

import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

@Controller
public class MessageController {

    private static final Log logger = LogFactory.getLog(MessageController.class);

    private ChatRoom chatRoom;

    @Autowired
    public MessageController(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
    }

    @RequestMapping(value="/messages", method = RequestMethod.GET)
    public @ResponseBody Collection<Message> getMessages(
            HttpServletResponse response) {

        response.setContentType("application/json");
        return chatRoom.getMessages();
    }

    @RequestMapping(value="/messages", method = RequestMethod.POST)
    public @ResponseBody String newMessage(@RequestBody NewMessage message,
                                           HttpServletResponse response) {
        response.setContentType("application/json");
        chatRoom.addMessage(message.getUser(), message.getMessage());
        return "";
    }
}
