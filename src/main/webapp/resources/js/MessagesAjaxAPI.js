var MessagesAjaxAPI = function() {

    function ajaxMethod(method, url, data, succFun, errorFun) {

        $.ajax({
            url: url,
            type: method,
            data: data,
            cache: false,
            dataType: 'json',
            contentType: 'application/json',
            success: succFun,
            error: errorFun
        });
    }

    function getAJAX(url, data, succFun, errorFun) {
        ajaxMethod('GET', url, data, succFun, errorFun);
    }

    function postAJAX(url, data, succFun, errorFun) {
        ajaxMethod('POST', url, data, succFun, errorFun);
    }

    return {
        postAJAX:postAJAX,
        getAJAX:getAJAX
    }

};
