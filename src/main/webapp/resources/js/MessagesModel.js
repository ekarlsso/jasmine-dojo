var MessagesModel = function() {

    var messages = [];
    var listeners = [];

    function notifyListeners() {
        for (var i=0; i < listeners.length; i++) {
            listeners[i].refresh();
        }
    }

    function update(newMessages) {

        for (var i = 0; i < newMessages.length; i++) {
            messages.push(newMessages[i]);
        }

        notifyListeners();
    }

    function addListener(listener) {
        listeners.push(listener);
    }

    function getMessages() {
        return messages;
    }

    return {
        update: update,
        addListener: addListener,
        getMessages: getMessages
    }

};