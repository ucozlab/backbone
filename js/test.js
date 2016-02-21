// model test

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


//template test
$(function(){
    var compiled = _.template($('#secure').html());
    var obj = {
        login: "Ace",
        password: "ptu827",
        nice: true
    };
    $('#block').append(compiled(obj));
});
