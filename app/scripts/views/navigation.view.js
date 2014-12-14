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
			fileInput: '#upload-input'
		},

		events: {
			'click .update': 'update',
			'click .remove-control': 'remove',
			'click .add-control': 'add',
			'change #file-input': 'uploadKml'
		},

		el: '#nav-region',

		uploadKml: function (evt) {
			var file = evt.target.files[0],
				$this = this;
			jmf.filereader.getTrail(file, function (result) {
				// var geojson = JSON.parse(result);
				$this.update(result);
			});
		},



		update: function (geojson) {
			jmf.app.vent.trigger('map:updateElevation', geojson[0]);
		},

		remove: function () {
			jmf.app.vent.trigger('map:removeElevation');
		},

		add: function () {
			jmf.app.vent.trigger('map:addElevation');
		}

	});
});