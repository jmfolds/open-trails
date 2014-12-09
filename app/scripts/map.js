$(function () {
	'use strict';
	jmf.MapView = Backbone.View.extend({
		initialize: function (opts) {
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			
			//TODO: separate refactor this into modules

			opts = opts || {};
			console.log('Initialized!');

			//fix temp path data missing z values
			jmf.interpolateGeojson(window.geojsondata);

			this.elevation = L.control.elevation();
			this.initMap();

		},

		initMap: function () {
			this.map = L.map('map');
			this.elevation.addTo(this.map);

			this.map.setView(L.latLng([39.060800, -105.503862]), 7);

			L.tileLayer('http://a.tiles.mapbox.com/v3/jmfolds.hjcp971d/{z}/{x}/{y}.png', {
				// maxZoom: 18,
				attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>',
			}).addTo(this.map);

			var $this = this;




			// this.fullDaysLayer = L.geoJson().addTo(this.map);
			this.trail = L.geoJson(window.geojsondata.features[1],{
			    onEachFeature: $this.elevation.addData.bind($this.elevation) //working on a better solution
			}).addTo(this.map);
		}
	});
});