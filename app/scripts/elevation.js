jmf.elevationView = function () {
	'use strict';
	var elevation = L.control.elevation({
	    position: 'topright',
	    theme: 'steelblue-theme', //default: lime-theme
	    width: 600,
	    height: 125,
	    margins: {
	        top: 10,
	        right: 20,
	        bottom: 30,
	        left: 50
	    },
	    useHeightIndicator: true, //if false a marker is drawn at map position
	    interpolation: 'linear', //see https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area_interpolate
	    hoverNumber: {
	        decimalsX: 3, //decimals on distance (always in km)
	        decimalsY: 0, //deciamls on height (always in m)
	        formatter: undefined //custom formatter function may be injected
	    },
	    xTicks: undefined, //number of ticks in x axis, calculated by default according to width
	    yTicks: undefined, //number of ticks on y axis, calculated by default according to height
	    collapsed: false    //collapsed mode, show chart on click or mouseover
	});

	return elevation;
};
