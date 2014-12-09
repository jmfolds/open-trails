$(function () {
	'use strict';
	jmf.MapModel = Backbone.Model.extend({
		initialize: function (opts) {
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			
			//TODO: separate refactor this into modules

			opts = opts || {};
			console.log('MapModel Initialized!');

			//fix temp path data missing z values
			jmf.interpolateGeojson(window.geojsondata);
			// jmf.interpolateGeojson(window.geojsondata2);

			this.elevation = L.control.elevation();
			this.initMap();

			$('.update').on('click', this.updateTrail);
			$('.add-control').on('click', _.partial(this.addControl, this.elevation));
			$('.remove-control').on('click', _.partial(this.removeControl, this.elevation));

		},

		initMap: function () {
			this.map = L.map('map');

			this.map.setView(L.latLng([39.060800, -105.503862]), 7);

			L.tileLayer('http://a.tiles.mapbox.com/v3/jmfolds.hjcp971d/{z}/{x}/{y}.png', {
				// maxZoom: 18,
				attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>',
			}).addTo(this.map);

			var $this = this;

			// this.fullDaysLayer = L.geoJson().addTo(this.map);
			this.trail = L.geoJson(window.geojsondata.features[1],{
			    onEachFeature: $this.elevation.addData.bind($this.elevation)
			}).addTo(this.map);

			this.map.fitBounds(this.trail.getBounds());
		},

		updateTrail: function () {
			var geojson = window.geojsondata2.features[1];
			this.elevation.clear();
			this.trail.clearLayers();
			this.trail.addData(geojson);
			this.map.fitBounds(this.trail.getBounds());
		},

		removeControl: function (control) {
			control.removeFrom(this.map);
		},
		
		addControl: function (control) {
			control.addTo(this.map);
		}


	});
});