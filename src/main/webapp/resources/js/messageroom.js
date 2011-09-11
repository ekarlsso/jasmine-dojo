// initialization point for the doc.

var MessageApp = {
    Controllers: {},
    Views: {},
    Models: {},
    Tools: {},
    init: function() {

        this.Views.Messages = new MessagesView();
        this.Models.Messages = new MessagesModel();
        this.Tools.MessagesAjaxAPI = new MessagesAjaxAPI();

        this.Controllers.Messages =
            new MessagesController(this.Tools.MessagesAjaxAPI);

        this.Views.Messages.init(this.Models.Messages);

        this.Controllers.Messages.init(this.Models.Messages);
    }
};

