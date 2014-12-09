//temporary fix for linestrings missing elevation data at points
jmf.interpolateGeojson = function (geojson) {
	'use strict';
	//nothing passed in, get out
	if (!geojson) { return; }
	//if its a featurecollection, find the linestrings
	if (geojson.type === 'FeatureCollection') {
		_.each(geojson.features, function (feature) {
			if (feature.geometry.type === 'LineString') {
				var nodeCount = 0;
				for (var i = 0; i < feature.geometry.coordinates.length; i++) {
					if (feature.geometry.coordinates[i].length !== 3) {
						nodeCount++;
						if (i > 2) {
							feature.geometry.coordinates[i].push(feature.geometry.coordinates[i - 1][2]);
						} else {
							feature.geometry.coordinates[i].push(feature.geometry.coordinates[i + 1][2]);
						}
					}
				}
				//log it
				if (nodeCount > 0) {
					console.log('Interpolated ' + nodeCount + ' nodes.');
				}
			}
		});
	}
};