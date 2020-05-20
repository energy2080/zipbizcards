module.exports = [];function WPATH(s) {
	var index = s.lastIndexOf('/');
	var path = index === -1 ? 'nl.fokkezb.drawer/' + s : s.substring(0, index) + '/nl.fokkezb.drawer/' + s.substring(index + 1);

	return path.indexOf('/') !== 0 ? '/' + path : path;
}