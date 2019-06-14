// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
require("crux");
// Alloy.Globals.fonts = ["ArialMT", "Angelina", "Aldine721BT-BoldCondensed", "Alternity", "AmerTypewriterITCbyBT-Medium", "ArialRoundedMTBold", "Archistico-Simple", "Chalkduster", "Cochin", "ComicZineOT", "LafayetScripts-Medium", "FrenchScriptMT", "FuturaBlackBT-Regular", "Harabara", "HollywoodHills", "Journal", "Jrhand", "LabtopSuperwideBoldish", "LansburyFG", "LithosPro-Regular", "ParchmentMF", "Schoolbully", "Swiss921BT-RegularA", "TwCenMT-Bold", "Verticalization","Cancel"];

Alloy.Globals.fonts = [{
	title : "Arial",
	style : ["Arial-BoldMT", "ArialMT", "Arial-ItalicMT"]
}, {
	title : "Angelina",
	style : ["Angelina"]
}, {
	title : "Aldine",
	style : ["Aldine721BT-BoldCondensed"]
}, {
	title : "American Typewriter",
	style : ["AmerTypewriterITCbyBT-Medium"]
}, {
	title : "Archistico",
	style : ["Archistico-Simple"]
}, {
	title : "Cancel"
}];
Alloy.Globals.fontStyle = {
	"Arial" : ["Bold", "Regular", "Italic", "Cancel"],
	"Angelina" : ["Regular", "Cancel"],
	"Aldine" : ["Bold", "Cancel"],
	"American Typewriter" : ["Regular", "Cancel"],
	"Archistico" : ["Regular", "Cancel"]
};
if (!Ti.App.Properties.hasProperty("cards")) {
	Ti.App.Properties.setList("cards", []);
}
Alloy.Globals.cards =Ti.App.Properties.getList("cards");