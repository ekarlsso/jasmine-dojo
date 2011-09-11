describe('Given MessageController', function() {

    var controller = null;
    var ajax = null;

    beforeEach(function() {

        ajax = new MessagesAjaxAPI();
        controller = new MessagesController(ajax);
        
        spyOn(ajax, 'getAJAX');
        spyOn(ajax, 'postAJAX');
    });

    it('should post new message', function() {

        controller.newMessage('jaska', 'miten menee');
        expect(ajax.postAJAX).toHaveBeenCalled();
    });

    it('should do long poll to get new messages', function() {
        throw "Undefined test"
    });
});