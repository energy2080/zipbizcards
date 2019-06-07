var args = arguments[0] || {};
var fontRows = [];
var fontName,
    selectedFontName;

var alertFont,
    selectedRow;
exports.showFonts = function(f_name) {
	if (f_name) {
		selectedFontName = f_name;
	}
	if (!alertFont) {
		alertFont = Ti.UI.createOptionDialog({
			options : Alloy.Globals.fonts,
			cancel : Alloy.Globals.fonts.length - 1,
			title : "Select Font"
		});
		alertFont.addEventListener('click', function(e) {
			if (e.index != (Alloy.Globals.fonts.length - 1)) {
				selectedFontName = Alloy.Globals.fonts[e.index];
				$.trigger("setFont", Alloy.Globals.fonts[e.index]);
			}

		});
	}

	alertFont.show();
};
