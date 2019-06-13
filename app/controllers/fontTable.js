var args = arguments[0] || {};
var fontRows = [];
var fontName,
    selectedFontName,
    fonts = [];

var alertFont,
    selectedRow;
exports.showFonts = function(f_name) {
	if (f_name) {
		selectedFontName = f_name;
	}
	if (!alertFont) {
		for (var i = 0; i < Alloy.Globals.fonts.length; i++) {
			fonts[i] = Alloy.Globals.fonts[i].title;
		}
		alertFont = Ti.UI.createOptionDialog({
			options : fonts,
			cancel : fonts.length - 1,
			title : "Select Font"
		});
		alertFont.addEventListener('click', function(e) {
			if (e.index != (fonts.length - 1)) {
				selectedFontName = fonts[e.index];
				$.trigger("setFont", {
					index : e.index,
					title : fonts[e.index]
				});
			}

		});
	}

	alertFont.show();
};
