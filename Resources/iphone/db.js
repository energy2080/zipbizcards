exports.db = function () {

	var api = {};
	var conn;
	api.open = function () {
		conn = Ti.Database.open('zipbizcards');
	};
	api.close = function () {
		conn.close();
		conn = null;
	};
	api.init = function () {
		api.open();
		conn.execute('CREATE TABLE IF NOT EXISTS mycards (card_id TEXT, jsondata TEXT)');
		api.close();
	};


	api.addCard = function (card_id, jsondata) {
		var resultSet = conn.execute("SELECT * FROM mycards WHERE card_id=?", card_id);
		if (resultSet.isValidRow()) {
			Ti.API.info("<<<<<<<<< UPDATED");
			conn.execute('UPDATE mycards set jsondata=? WHERE card_id=?', jsondata, card_id);
		} else {
			Ti.API.info("<<<<<<<<< ADDED");
			conn.execute('INSERT INTO mycards (card_id, jsondata) VALUES(?, ?)', card_id, jsondata);
		}
	};

	api.deleteCard = function (card_id) {
		var resultSet = conn.execute("DELETE FROM mycards WHERE card_id=?", card_id);
	};

	api.getAllCards = function () {
		var results = [];
		api.open();
		var resultSet = conn.execute("SELECT * FROM mycards");
		while (resultSet.isValidRow()) {
			results.push({
				id: resultSet.fieldByName('card_id')
			});
			resultSet.next();
		}
		resultSet.close();
		api.close();
		return results;
	};

	api.getCard = function (card_id) {
		var results;
		api.open();
		var resultSet = conn.execute("SELECT * FROM mycards WHERE card_id=?", card_id);

		while (resultSet.isValidRow()) {
			results = resultSet.fieldByName('jsondata');

			resultSet.next();
		}
		resultSet.close();
		api.open();
		return results;
	};

	return api;
};