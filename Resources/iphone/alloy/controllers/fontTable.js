var Alloy = require('/alloy'),
Backbone = Alloy.Backbone,
_ = Alloy._;




function __processArg(obj, key) {
		var arg = null;
		if (obj) {
				arg = obj[key] || null;
		}
		return arg;
}

function Controller() {

		require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
		this.__controllerPath = 'fontTable';
		this.args = arguments[0] || {};

		if (arguments[0]) {
				var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
				var $model = __processArg(arguments[0], '$model');
				var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
		}
		var $ = this;
		var exports = {};
		var __defers = {};







		exports.destroy = function () {};




		_.extend($, $.__views);


		var args = arguments[0] || {};
		var fontRows = [];
		var fontName,
		selectedFontName,
		fonts = [];

		var alertFont, selectedRow;
		exports.showFonts = function (f_name) {
				if (f_name) {
						selectedFontName = f_name;
				}
				if (!alertFont) {
						for (var i = 0; i < Alloy.Globals.fonts.length; i++) {
								fonts[i] = Alloy.Globals.fonts[i].title;
						}
						alertFont = Ti.UI.createOptionDialog({
								options: fonts,
								cancel: fonts.length - 1,
								title: "Select Font" });

						alertFont.addEventListener('click', function (e) {
								if (e.index != fonts.length - 1) {
										selectedFontName = fonts[e.index];
										$.trigger("setFont", {
												index: e.index,
												title: fonts[e.index] });

								}
						});
				}

				alertFont.show();
		};









		_.extend($, exports);
}

module.exports = Controller;