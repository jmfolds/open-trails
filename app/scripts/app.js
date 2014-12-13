(function () {
    'use strict';

    jmf.app = new Backbone.Marionette.Application();

    jmf.app.addInitializer(function (options) {
        options = options || {};
        new jmf.NavView();
        new jmf.MapModel();
    });

    //debugging
    jmf.app.vent.on('all', function (evt, data) {
        console.log('app:event: ' + evt, data);
    });
})();