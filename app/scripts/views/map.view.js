$(function () {
	'use strict';
	jmf.MapView = Marionette.ItemView.extend({
		initialize: function (opts) {
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			
			opts = opts || {};
			console.log('MapView Initialized!');

			// $('.update').on('click', this.updateTrail);
			// $('.add-control').on('click', _.partial(this.addControl, this.elevation));
			// $('.remove-control').on('click', _.partial(this.removeControl, this.elevation));

			this.model = new jmf.MapModel();

		},

		events: {
			'click': 'hideNav'//if nav is shown, hide on map click
		},

		el: '#map',

		hideNav: function () {
			if ($('#nav-trigger')[0].checked) {
				$('#nav-trigger').click();
			}
		}

	});
});