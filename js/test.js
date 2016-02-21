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
