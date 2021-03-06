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
	this.__controllerPath = 'navMenu';
	this.args = arguments[0] || {};

	if (arguments[0]) {
		var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
		var $model = __processArg(arguments[0], '$model');
		var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
	}
	var $ = this;
	var exports = {};
	var __defers = {};







	$.__views.navMenu = Ti.UI.createView(
	{ backgroundColor: "#fff", width: Ti.UI.FILL, height: Ti.UI.FILL, id: "navMenu" });

	$.__views.navMenu && $.addTopLevelView($.__views.navMenu);
	exports.destroy = function () {};




	_.extend($, $.__views);



	var args = $.args;










	_.extend($, exports);
}

module.exports = Controller;