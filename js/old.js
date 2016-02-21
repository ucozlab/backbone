//1
var Controller = Backbone.Router.extend({
    routes: {
        "": "start", // Пустой hash-тэг
        "!/": "start", // Начальная страница
        "!/success": "success", // Блок удачи
        "!/error": "error" // Блок ошибки
    },

    start: function () {
        "use strict";
        $(".block").hide(); // Прячем все блоки
        $("#start").show(); // Показываем нужный
    },

    success: function () {
        "use strict";
        $(".block").hide();
        $("#success").show();
    },

    error: function () {
        "use strict";
        $(".block").hide();
        $("#error").show();
    }
});

var controller = new Controller(); // Создаём контроллер

Backbone.history.start(); // Запускаем HTML5 History push

//2
var Start = Backbone.View.extend({
    el: $("#start"), // DOM элемент widget'а
    events: {
        "click input:button": "check" // Обработчик клика на кнопке "Проверить"
    },
    check: function () {
        "use strict";
        var temp = this.el;
        if ($(temp).find("input:text").val() === "test") { // Проверка текста
            console.log('true');
            controller.navigate("success", true); // переход на страницу success
        } else {
            console.log('false');
            controller.navigate("error", true); // переход на страницу error
        }
    }
});

var start = new Start();







/******************************************* workable *************************************/

//1 view
var AppState = {
    username: ""
};
var Family = ["Саша", "Юля", "Елизар"];
var Views = {};

var Start = Backbone.View.extend({
    el: $("#block"), // DOM элемент widget'а

    template: _.template($('#start').html()),

    events: {
        "click input:button": "check" // Обработчик клика на кнопке "Проверить"
    },

    check: function () {
        var temp = this.el;
        AppState.username = $(temp).find("input:text").val(); // Сохранение имени пользователя
        if (_.detect(Family, function(elem){ return elem == AppState.username; })){ // Проверка имени пользователя
            controller.navigate("success", true); // переход на страницу success
        } else {
            controller.navigate("error", true); // переход на страницу error
        };
    },

    render: function () {
        var temp = this.el;
        $(temp).html(this.template());
    }
});

var Success = Backbone.View.extend({
    el: $("#block"), // DOM элемент widget'а

    template: _.template($('#success').html()),

    render: function () {
        var temp = this.el;
        $(temp).html(this.template(AppState));
    }
});

var Error = Backbone.View.extend({
    el: $("#block"), // DOM элемент widget'а

    template: _.template($('#error').html()),

    render: function () {
        var temp = this.el;
        $(temp).html(this.template(AppState));
    }
});

Views = {
    start: new Start(),
    success: new Success(),
    error: new Error()
};

//2 controller

var Controller = Backbone.Router.extend({
    routes: {
        "": "start", // Начальная страница
        "success": "success", // Блок удачи
        "error": "error" // Блок ошибки
    },

    start: function () {
        if (Views.start != null) {
            Views.start.render();
        }
    },

    success: function () {
        if (Views.success != null) {
            Views.success.render();
        }
    },

    error: function () {
        if (Views.error != null) {
            Views.error.render();
        }
    }
});

var controller = new Controller(); // Создаём контроллер
Backbone.history.start(); // Запускаем HTML5 History push
