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
  this.__controllerPath = 'root';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.__alloyId22 = (require("xp.ui").createWindow || Ti.UI.createWindow)(
  { role: "leftWindow", id: "__alloyId22" });

  $.__views.__alloyId23 = Alloy.createController('navMenu', { id: "__alloyId23", __parentSymbol: $.__views.__alloyId22 });
  $.__views.__alloyId23.setParent($.__views.__alloyId22);
  if (true) {
    $.__views.mainWindow = Ti.UI.createWindow(
    { backgroundColor: "white", barColor: "#4389d0", id: "mainWindow" });

    $.__views.leftMenuButton = Ti.UI.createButton(
    { id: "leftMenuButton", width: 30, height: 30, backgroundImage: "/images/menu.png" });

    showLeftMenu ? $.addListener($.__views.leftMenuButton, 'click', showLeftMenu) : __defers['$.__views.leftMenuButton!click!showLeftMenu'] = true;$.__views.mainWindow.leftNavButton = $.__views.leftMenuButton;$.__views.rightMenuButton = Ti.UI.createButton(
    { id: "rightMenuButton", width: 30, height: 30, backgroundImage: "/images/plus.png" });

    openEditor ? $.addListener($.__views.rightMenuButton, 'click', openEditor) : __defers['$.__views.rightMenuButton!click!openEditor'] = true;$.__views.mainWindow.rightNavButton = $.__views.rightMenuButton;$.__views.__alloyId27 = Ti.UI.createView(
    { width: Ti.UI.FILL, id: "__alloyId27" });

    $.__views.__alloyId28 = Ti.UI.createImageView(
    { height: "90%", width: Ti.UI.SIZE, image: "/images/logo.png", id: "__alloyId28" });

    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.mainWindow.titleControl = $.__views.__alloyId27;$.__views.tblView = Ti.UI.createTableView(
    { id: "tblView", editable: true });

    $.__views.mainWindow.add($.__views.tblView);
    deleteRow ? $.addListener($.__views.tblView, 'delete', deleteRow) : __defers['$.__views.tblView!delete!deleteRow'] = true;$.__views.nav = Ti.UI.iOS.createNavigationWindow(
    { window: $.__views.mainWindow, id: "nav", backgroundColor: "#F1F1F1", role: "centerWindow" });

  }
  $.__views.drawer = Alloy.createWidget('nl.fokkezb.drawer', 'widget', { id: "drawer", children: [$.__views.__alloyId22, $.__views.nav], __parentSymbol: __parentSymbol });
  $.__views.drawer && $.addTopLevelView($.__views.drawer);
  exports.destroy = function () {};




  _.extend($, $.__views);



  var args = $.args;


  Alloy.CFG.nav = $.nav;
  Alloy.CFG.drawer = $.drawer;

  function showLeftMenu(e) {
    Alloy.CFG.drawer['toggleLeftWindow']();
  }

  function deleteRow(e) {

    var row = e.row;
    var rowIndex = e.index;
    var alertYesNo = Titanium.UI.createAlertDialog({
      message: 'Are you sure?',
      buttonNames: ['Yes', 'No'] });


    alertYesNo.addEventListener('click', function (evt) {
      if (evt.index == 0) {
        Ti.API.info("Card Id : " + row.card_id);
        Alloy.Globals.db.open();
        Alloy.Globals.db.deleteCard(row.card_id);
        Alloy.Globals.db.close();
        Alloy.Globals.cards.splice(rowIndex, 1);
        Ti.App.Properties.setList("cards", Alloy.Globals.cards);
        refreshList();
      } else if (evt.index == 1) {



        $.tblView.insertRowBefore(rowIndex, row, {
          animated: true });

      }
    });

    alertYesNo.show();
  }

  var f, dir;
  function addCard(folder) {

    dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory, folder);
    f = Ti.Filesystem.getFile(dir.nativePath, folder + ".jpg");
    var row = Ti.UI.createTableViewRow({
      selectedBackgroundColor: "transparent",
      card_id: folder });

    var img = Ti.UI.createImageView({
      top: 5,
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE,
      image: f.nativePath });

    img.addEventListener("click", function (e) {
      Alloy.Globals.db.open();

      Alloy.CFG.nav.openWindow(Alloy.createController("editor", {
        cb: refreshList,
        id: folder,
        details: Alloy.Globals.db.getCard(folder) }).
      getView());
      Alloy.Globals.db.close();
    });
    row.add(img);
    $.tblView.appendRow(row);

  }

  function openEditor(e) {

    Alloy.CFG.nav.openWindow(Alloy.createController("editor", {
      cb: refreshList }).
    getView());
  }

  function refreshList() {
    $.tblView.setData([]);

    for (var i = 0; i < Alloy.Globals.cards.length; i++) {

      addCard(Alloy.Globals.cards[i]);
    }
  }

  function showalert() {}

  refreshList();





  if (true) {
    __defers['$.__views.leftMenuButton!click!showLeftMenu'] && $.addListener($.__views.leftMenuButton, 'click', showLeftMenu);}
  if (true) {
    __defers['$.__views.rightMenuButton!click!openEditor'] && $.addListener($.__views.rightMenuButton, 'click', openEditor);}
  __defers['$.__views.tblView!delete!deleteRow'] && $.addListener($.__views.tblView, 'delete', deleteRow);



  _.extend($, exports);
}

module.exports = Controller;