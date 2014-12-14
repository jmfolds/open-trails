$(function () {
	'use strict';
	window.offcanvas = {
		init: function (opts) {
			this.opts = opts || this._options;
			console.log('offcanvas init...');
			this.container = document.getElementsByClassName(this.opts.containerClass)[0];
			this.trigger = document.getElementsByClassName(this.opts.triggerClass)[0];
			this._wireEvents();
		},

		_options: {
			containerClass: 'row-offcanvas',
			triggerClass: 'offcanvas-trigger',
			openIcon: 'icon-arrow-left',
			closedIcon: 'icon-arrow-right'
		},

		_wireEvents: function () {
			this.trigger.addEventListener('click', this.toggle.bind(this));		
		},

		toggle: function () {
			var _isActive = this.container.classList.contains('active');
			if (_isActive) {
            	this.hide();
			} else {
				this.show();
			}
		},
		
		show: function () {
			this.container.classList.add('active');
			this.trigger.classList.remove(this.opts.closedIcon);
			this.trigger.classList.add(this.opts.openIcon);
		},

		hide: function () {
			this.container.classList.remove('active');
			this.trigger.classList.add(this.opts.closedIcon);
			this.trigger.classList.remove(this.opts.openIcon);
		}
	};
});