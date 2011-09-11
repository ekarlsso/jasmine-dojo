// initialization point for the doc.

var MessageApp = {
    Controllers: {},
    Views: {},
    Models: {},
    init: function() {
        this.Views.Messages.addModel(this.Models.Messages);
        this.Models.Messages.fetch();
    }
};

MessageApp.Views.Messages = {
    model: null,
    messageElement: null,
    refresh: function(model) {

        this.messageElement = $('#chatMessages');

        this.messageElement.empty();

        var htmlToAdd = [];

        for (var i=0; i < this.model.messages.length; i++) {
            var message = model.messages[i];
            htmlToAdd.push(this.messageHtml(message));
        }

        this.messageElement.html(htmlToAdd.join(''));
    },
    messageHtml: function(msg) {
        return "<div><div><strong>"+msg.user+"</strong></div><div>"+msg.message+"</div></div>";
    },
    addModel: function(model) {
        this.model = model;
        this.model.addListener(this);
    }
};

function Message(user, msg) {
    this.id = -1;
    this.user = user;
    this.message = msg;
}

MessageApp.Models.Messages = {
    messages: [],
    listeners: [],
    url: 'api/messages',
    addMessage: function(message) {
        this.messages.push(message);
    },
    fetch: function() {

        var self = this;

        $.ajax({
            url: this.url,
            type: 'GET',
            data: '',
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                self.messages = data;
                self.notifyRefresh();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // do something...
            }
        });
    },
    notifyRefresh: function() {
        for (var i=0; i < this.listeners.length; i++) {
            this.listeners[i].refresh(this);
        }
    },
    addListener: function(listener) {
        this.listeners.push(listener);
    }
};

MessageApp.Controllers.Messages = {
    model: MessageApp.Models.Messages,

    newMessage: function(user, message) {

        $.ajax({
            url: 'api/messages',
            type: 'POST',
            data: '{"user": "'+user+'", "message": "'+message+'"}',
            dataType: 'json',
            contentType: 'application/json',
        });
    },
};
