// initialization point for the doc.

var MessageApp = {
    Controllers: {},
    Views: {},
    Models: {},
    Tools: {},
    init: function() {
        this.Views.Messages.init(this.Models.Messages);

        this.Controllers.Messages.init(this.Models.Messages);
    }
};

