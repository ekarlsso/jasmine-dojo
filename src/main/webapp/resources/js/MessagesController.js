MessageApp.Controllers.Messages = (function() {

    var model = null;
    var self = this;

    function init(m) {
        model = m;

        if(model === null) {
            throw "Initialized with null values";
        }

        refreshMessages();
    }

    function listenForNewMessages() {

        var self = this;

        MessageApp.Tools.MessagesAjaxAPI.getAJAX(
            'api/newmessages',
            '',
            function (data, textStatus, jqXHR) {
                callBackNewMessages(data, textStatus, jqXHR);
            },
            function (jqXHR, textStatus, errorThrown) {});
    }

    function refreshMessages() {

        MessageApp.Tools.MessagesAjaxAPI.getAJAX(
            'api/messages',
            '',
            function(data, textStatus, jqXHR) {
                model.update(data);
            },
            function (jqXHR, textStatus, errorThrown) {});

         listenForNewMessages();
    }

    function newMessage(user, msg) {

        var dataStr = "{\"user\": \""+user+"\", \"message\": \""+msg+"\"}";

        MessageApp.Tools.MessagesAjaxAPI.postAJAX(
            'api/messages',
            dataStr,
            function (data, textStatus, jqXHR) {},
            function (jqXHR, textStatus, errorThrown) {});
    }

    function callBackNewMessages(data, textStatus, jqXHR) {

        if (data !== null) {
            model.update(data);
        }

        listenForNewMessages();
    }

    return {
        init: init,
        newMessage: newMessage,
        refreshMessages: refreshMessages
    }

})();