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




var app = app || {};
$(function(){
    app.Myobject = Backbone.Model.extend({
        defaults: {
            gender: "man"
        },
        initialize: function(){
            console.log('obj created');
            this.on('change', function(){
                console.log('obj changed');
                var json = app.Myobject.changedAttributes();
                console.log(json);
            });
        },
        increasesize: function(){
            app.Myobject.set({
                size: this.get('size')+100
            }, {
                validate: true
            });
        },
        validate: function(attrs){
            if(attrs.size > 500){
                console.log('incorrect size');
                return 'cant validate! the size is too big';
            }
        }
    });
    app.Myobject = new app.Myobject({
        name: "Artem",
        height: "187",
        weight: "75",
        size: 200
    });
    app.Myobject.set({
        height: "200",
        type: "active"
    });
    console.log(app.Myobject.get('name'));
});
