exports.createWindow = function (args) {
	return Ti.UI[true ? 'createWindow' : 'createView'](args);
};