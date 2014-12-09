(function () {
    'use strict';

    jmf.app = new Backbone.Marionette.Application();

    //Add an initializer to the app to expose a property
    //we can check in the rest of the code to decide if
    //we are in the Mobile app or not.
    jmf.app.addInitializer(function (options) {
        options = options || {};
        new jmf.MapView();
    });


    //debugging so we can see events flying around
    jmf.app.vent.on('all', function (evt, model) {
        console.log('app:event: ' + evt, model);
    });

})();