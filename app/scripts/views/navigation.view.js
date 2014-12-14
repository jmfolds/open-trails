//off canvas pure css nav

$(function () {
	'use strict';
	jmf.NavView = Marionette.ItemView.extend({
		initialize: function (opts) {
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			opts = opts || {};
			console.log('NavView Initialized!');
			//initialize offcanvas nav
			offcanvas.init();
		},

		ui: {
			//
		},

		events: {
			'click .update': 'update',
			'click .remove-control': 'remove',
			'click .add-control': 'add',
		},

		el: '#nav-region',

		update: function () {
			jmf.app.vent.trigger('map:updateElevation');
		},

		remove: function () {
			jmf.app.vent.trigger('map:removeElevation');
		},

		add: function () {
			jmf.app.vent.trigger('map:addElevation');
		}

	});
});