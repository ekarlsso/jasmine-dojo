var MessagesController = function(ajaxApiObj) {

    var model = null;
    var self = this;
    var ajaxAPI = ajaxApiObj;

    function init(m) {
        model = m;

        if(model === null) {
            throw "Initialized with null values";
        }

        refreshMessages();
        listenForNewMessages();
    }

    function listenForNewMessages() {

        var self = this;

        ajaxAPI.getAJAX(
            'api/newmessages',
            '',
            function (data, textStatus, jqXHR) {
                callBackNewMessages(data, textStatus, jqXHR);
            },
            function (jqXHR, textStatus, errorThrown) {});
    }

    function refreshMessages() {

        ajaxAPI.getAJAX(
            'api/messages',
            '',
            function(data, textStatus, jqXHR) {
                model.update(data);
            },
            function (jqXHR, textStatus, errorThrown) {});
    }

    function newMessage(user, msg) {

        var dataStr = "{\"user\": \""+user+"\", \"message\": \""+msg+"\"}";

        ajaxAPI.postAJAX(
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
        newMessage: newMessage
    }

};