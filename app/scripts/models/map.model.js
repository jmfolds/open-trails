$(function () {
	'use strict';
	jmf.MapModel = Backbone.Model.extend({
		initialize: function (opts) {
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			opts = opts || {};
			console.log('MapModel Initialized!');

			//fix temp path data missing z values
			jmf.interpolateGeojson(window.geojsondata);

			this.initMap();

			jmf.app.vent.on('map:addElevation', this.addElevation);
			jmf.app.vent.on('map:removeElevation', this.removeElevation);
			jmf.app.vent.on('map:updateElevation', this.updateElevation);

		},

		initMap: function () {
			this.map = L.map('map');
			//listen for map events
			this.map.on('click', this.onMapClick);
			this.map.on('load', this.onMapLoad);

			//set map default view
			this.map.setView(L.latLng([39.060800, -105.503862]), 7);

			//add basemap
			L.tileLayer('http://a.tiles.mapbox.com/v3/jmfolds.hjcp971d/{z}/{x}/{y}.png', {
				// maxZoom: 18,
				attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox © OpenStreetMap</a>',
			}).addTo(this.map);

			//create map controls
			var $this = this;
			this.elevationControl = L.control.elevation();
			//elevation layer for the control
			this.elevationLayer = L.geoJson(window.geojsondata.features[1],{
			    onEachFeature: $this.elevationControl.addData.bind($this.elevationControl)
			}).addTo(this.map);
			//set bounds to initial trail
			this.map.fitBounds(this.elevationLayer.getBounds());
		},

		onMapLoad: function () {
			console.log('Map loaded...');
		},

		onMapClick: function (evt) {
			jmf.app.vent.trigger('map:clicked', evt);
			jmf.app.vent.trigger('nav:hide');
		},

		updateElevation: function () {
			var geojson = window.geojsondata2.features[1];
			this.elevationControl.clear();
			this.elevationLayer.clearLayers();
			this.elevationLayer.addData(geojson);
			this.map.fitBounds(this.elevationLayer.getBounds());
		},

		removeElevation: function () {
			this.elevationControl.removeFrom(this.map);
		},
		
		addElevation: function () {
			this.elevationControl.addTo(this.map);
		}
	});
});