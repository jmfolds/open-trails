$(function () {
    'use strict';
    jmf.filereader = {
        getFile: function (file, callback) {
            // Read selected file using HTML5 File API
            var reader = new FileReader();
            reader.onload = function (evt) {
                callback(evt.target.result);
            };
            reader.readAsText(file);
        },

        getTrail: function (file, callback) {
            var ext = file.name.split('.').pop(),
                reader = new FileReader();
            if (ext === 'geojson') {
                reader.onload = function (evt) {
                    var geojson = JSON.parse(evt.target.result);
                    callback(jmf.filereader._getLineStrings(geojson));
                };
                reader.readAsText(file);
            }
            if (ext === 'kml' || ext === 'gpx') {
                reader.onload = function (evt) {
                    var parser = new DOMParser(),
                        data = parser.parseFromString(evt.target.result, "text/xml"),
                        geojson;
                    if (ext === 'kml') {
                        geojson = toGeoJSON.kml(data);
                    } else {
                        geojson = toGeoJSON.gpx(data);
                    }
                    callback(jmf.filereader._getLineStrings(geojson));
                };
                reader.readAsText(file);

            }
        },

        _getLineStrings: function (geojson) {
            if (geojson.type === 'FeatureCollection') {
                return jmf.filereader._parseFeatureCollection(geojson);
            }
        },

        _parseFeatureCollection: function (fc) {
            var lines = [];
            for (var i = 0; i < fc.features.length; i++) {
                if (fc.features[i].geometry.type === 'LineString') {
                    lines.push(fc.features[i]);
                }
            }
            return lines;
        }
    };
});