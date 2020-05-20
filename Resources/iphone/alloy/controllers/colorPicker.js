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
  this.__controllerPath = 'colorPicker';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.overlay = Ti.UI.createView(
  { width: "100%", height: "100%", id: "overlay" });

  $.__views.overlay && $.addTopLevelView($.__views.overlay);
  $.__views.mainColor = Ti.UI.createView(
  { backgroundImage: "/images/Tile-Colors.png", bottom: 0, width: "100%", height: "30%", id: "mainColor" });

  $.__views.overlay.add($.__views.mainColor);
  updateColors ? $.addListener($.__views.mainColor, 'click', updateColors) : __defers['$.__views.mainColor!click!updateColors'] = true;updateColors ? $.addListener($.__views.mainColor, 'touchmove', updateColors) : __defers['$.__views.mainColor!touchmove!updateColors'] = true;$.__views.colorMix = Ti.UI.createView(
  { backgroundColor: "#fff", top: 0, width: "100%", bottom: "30%", id: "colorMix" });

  $.__views.overlay.add($.__views.colorMix);
  $.__views.whiteGradient = Ti.UI.createView(
  { backgroundImage: "/images/Tile-White.png", top: 0, width: "100%", bottom: "30%", id: "whiteGradient" });

  $.__views.overlay.add($.__views.whiteGradient);
  $.__views.blackGradient = Ti.UI.createView(
  { backgroundImage: "/images/Tile-Black.png", top: 0, width: "100%", bottom: "30%", id: "blackGradient" });

  $.__views.overlay.add($.__views.blackGradient);
  blackGradientClick ? $.addListener($.__views.blackGradient, 'click', blackGradientClick) : __defers['$.__views.blackGradient!click!blackGradientClick'] = true;exports.destroy = function () {};




  _.extend($, $.__views);


  var args = arguments[0] || {};
  var cb;
  exports.setCallback = function (callback) {
    cb = callback;
  };
  var mainColors = [[255, 0, 0], [255, 0, 255], [0, 0, 255], [0, 255, 255], [0, 255, 0], [255, 255, 0], [255, 0, 0]];
  function updateColors(evt) {
    Ti.API.info('X : ' + evt.x / 2 + ' , W : ' + evt.source.size.width);
    try {

      var ratio = evt.x / evt.source.size.width;

      var scaledRatio = ratio * (mainColors.length - 1);

      var f = parseInt(Math.floor(scaledRatio), 10);

      var percent = scaledRatio - f;

      var newColor = 0;



      for (var i = 0; i < 3; i++) {





        newColor += mainColors[f][i] - (mainColors[f][i] - mainColors[f + 1][i]) * percent << (2 - i) * 8;
      }

      var color = newColor.toString(16);

      for (var j = color.length; j < 6; j++) {
        color = '0' + color;
      }

      $.colorMix.backgroundColor = '#' + color;

    } catch (e) {}
  }

  function blackGradientClick(evt) {
    var whiteRatio = 1 - evt.x / evt.source.size.width;
    var blackRatio = evt.y / evt.source.size.height;
    var base = $.colorMix.backgroundColor.substring(1);
    var splitColor = [];
    if (base.length == 3) {
      splitColor = [parseInt(base[0] + base[0], 16), parseInt(base[1] + base[1], 16), parseInt(base[2] + base[2], 16)];
    } else {
      splitColor = [parseInt(base[0] + base[1], 16), parseInt(base[2] + base[3], 16), parseInt(base[4] + base[5], 16)];
    }

    for (var i = 0; i < 3; i++) {
      splitColor[i] = 255 - (255 - splitColor[i]) * (1 - whiteRatio);
    }

    var newColor = 0;
    for (var j = 0; j < 3; j++) {
      newColor += 0 - (0 - splitColor[j]) * (1 - blackRatio) << (2 - j) * 8;
    }

    var color = newColor.toString(16);

    for (var k = color.length; k < 6; k++) {
      color = '0' + color;
    }

    cb.success('#' + color);
  }

  $.setBackColor = function (color) {
    $.colorMix.backgroundColor = color;
  };





  __defers['$.__views.mainColor!click!updateColors'] && $.addListener($.__views.mainColor, 'click', updateColors);__defers['$.__views.mainColor!touchmove!updateColors'] && $.addListener($.__views.mainColor, 'touchmove', updateColors);__defers['$.__views.blackGradient!click!blackGradientClick'] && $.addListener($.__views.blackGradient, 'click', blackGradientClick);



  _.extend($, exports);
}

module.exports = Controller;