




var Alloy = require('/alloy'),
_ = Alloy._,
Backbone = Alloy.Backbone;












Alloy.Globals.db = require('db').db();
Alloy.Globals.db.init();

require("crux");


Alloy.Globals.fonts = [{
	title: "Arial",
	style: ["Arial-BoldMT", "ArialMT", "Arial-ItalicMT"] },
{
	title: "Angelina",
	style: ["Angelina"] },
{
	title: "Aldine",
	style: ["Aldine721BT-BoldCondensed"] },
{
	title: "American Typewriter",
	style: ["AmerTypewriterITCbyBT-Medium"] },
{
	title: "Archistico",
	style: ["Archistico-Simple"] },
{
	title: "Cancel" }];

Alloy.Globals.fontStyle = {
	"Arial": ["Bold", "Regular", "Italic", "Cancel"],
	"Angelina": ["Regular", "Cancel"],
	"Aldine": ["Bold", "Cancel"],
	"American Typewriter": ["Regular", "Cancel"],
	"Archistico": ["Regular", "Cancel"] };

if (!Ti.App.Properties.hasProperty("cards")) {
	Ti.App.Properties.setList("cards", []);
}
Alloy.Globals.cards = Ti.App.Properties.getList("cards");
Alloy.createController('index');