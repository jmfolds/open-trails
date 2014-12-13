//off canvas pure css nav

$(function () {
	'use strict';
	jmf.NavTrigger = Marionette.ItemView.extend({
		initialize: function () {
			console.log('NavTrigger Initialized!');
		},

		el: '.nav-trigger',

		show: function () {
			if (!$(this.el)[0].checked) {
				$(this.el).click();
			}
		},

		hide: function () {
			if ($(this.el)[0].checked) {
				$(this.el).click();
			}
		}
	});

	jmf.NavView = Marionette.ItemView.extend({
		initialize: function (opts) {
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			opts = opts || {};
			console.log('NavView Initialized!');
			this.trigger = new jmf.NavTrigger();
		},

		events: {
			'click .update': 'update',
			'click .remove-control': 'remove',
			'click .add-control': 'add'			
		},

		el: '.navigation',

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