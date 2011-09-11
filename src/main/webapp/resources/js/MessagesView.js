/**
 * View updating the message view
 */
var MessagesView = function(){

    var messageElement = null;
    var model = null;

    function messageHtml(msg) {
        return "<div><div><strong>"+msg.user+"</strong></div><div>"+msg.message+"</div></div>";
    }

    function refresh() {

        messageElement.empty();

        var htmlToAdd = [];

        var messages = model.getMessages();

        for (var i=0; i < messages.length; i++) {
            var message = messages[i];
            htmlToAdd.push(messageHtml(message));
        }

        messageElement.html(htmlToAdd.join(''));
    }

    function init(mdl) {
        messageElement = $('#chatMessages');
        model = mdl;
        model.addListener(this);
    }

    return {
        init: init,
        refresh: refresh,
    };
};