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
  this.__controllerPath = 'editor';
  this.args = arguments[0] || {};

  if (arguments[0]) {
    var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
    var $model = __processArg(arguments[0], '$model');
    var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
  }
  var $ = this;
  var exports = {};
  var __defers = {};







  $.__views.win = Ti.UI.createWindow(
  { navBarHidden: true, backgroundColor: "#A4A4A4", orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT], id: "win" });

  $.__views.win && $.addTopLevelView($.__views.win);
  $.__views.__alloyId0 = Ti.UI.createView(
  { left: 0, top: 0, width: "12%", height: Ti.UI.FILL, backgroundColor: "#C5C5C5", layout: "vertical", id: "__alloyId0" });

  $.__views.win.add($.__views.__alloyId0);
  $.__views.__alloyId1 = Ti.UI.createView(
  { top: 10, width: "90%", height: "20%", layout: "vertical", index: 0, id: "__alloyId1" });

  $.__views.__alloyId0.add($.__views.__alloyId1);
  action ? $.addListener($.__views.__alloyId1, 'click', action) : __defers['$.__views.__alloyId1!click!action'] = true;$.__views.__alloyId2 = Ti.UI.createImageView(
  { height: "70%", width: Ti.UI.SIZE, touchEnabled: false, image: "/images/background.png", id: "__alloyId2" });

  $.__views.__alloyId1.add($.__views.__alloyId2);
  $.__views.__alloyId3 = Ti.UI.createLabel(
  { color: "#fff", font: { fontWeight: "bold", fontSize: "10%" }, touchEnabled: false, text: "Background", id: "__alloyId3" });

  $.__views.__alloyId1.add($.__views.__alloyId3);
  $.__views.txtTool = Ti.UI.createView(
  { id: "txtTool", top: 0, width: "90%", height: "20%", layout: "vertical", index: 1 });

  $.__views.__alloyId0.add($.__views.txtTool);
  action ? $.addListener($.__views.txtTool, 'click', action) : __defers['$.__views.txtTool!click!action'] = true;$.__views.__alloyId4 = Ti.UI.createImageView(
  { height: "70%", width: Ti.UI.SIZE, touchEnabled: false, image: "/images/aa.png", id: "__alloyId4" });

  $.__views.txtTool.add($.__views.__alloyId4);
  $.__views.__alloyId5 = Ti.UI.createLabel(
  { color: "#fff", font: { fontWeight: "bold", fontSize: "10%" }, touchEnabled: false, text: "Text", id: "__alloyId5" });

  $.__views.txtTool.add($.__views.__alloyId5);
  $.__views.__alloyId6 = Ti.UI.createView(
  { top: 0, width: "90%", height: "20%", layout: "vertical", index: 2, id: "__alloyId6" });

  $.__views.__alloyId0.add($.__views.__alloyId6);
  action ? $.addListener($.__views.__alloyId6, 'click', action) : __defers['$.__views.__alloyId6!click!action'] = true;$.__views.__alloyId7 = Ti.UI.createImageView(
  { height: "70%", width: Ti.UI.SIZE, touchEnabled: false, image: "/images/image.png", id: "__alloyId7" });

  $.__views.__alloyId6.add($.__views.__alloyId7);
  $.__views.__alloyId8 = Ti.UI.createLabel(
  { color: "#fff", font: { fontWeight: "bold", fontSize: "10%" }, touchEnabled: false, text: "Images", id: "__alloyId8" });

  $.__views.__alloyId6.add($.__views.__alloyId8);
  $.__views.__alloyId9 = Ti.UI.createView(
  { top: 0, width: "90%", height: "20%", layout: "vertical", index: 3, id: "__alloyId9" });

  $.__views.__alloyId0.add($.__views.__alloyId9);
  action ? $.addListener($.__views.__alloyId9, 'click', action) : __defers['$.__views.__alloyId9!click!action'] = true;$.__views.__alloyId10 = Ti.UI.createImageView(
  { height: "70%", width: Ti.UI.SIZE, touchEnabled: false, image: "/images/print.png", id: "__alloyId10" });

  $.__views.__alloyId9.add($.__views.__alloyId10);
  $.__views.__alloyId11 = Ti.UI.createLabel(
  { color: "#fff", font: { fontWeight: "bold", fontSize: "10%" }, touchEnabled: false, text: "Print", id: "__alloyId11" });

  $.__views.__alloyId9.add($.__views.__alloyId11);
  $.__views.btnSave = Ti.UI.createButton(
  { title: 'SAVE', id: "btnSave", top: 0 });

  $.__views.__alloyId0.add($.__views.btnSave);
  saveCard ? $.addListener($.__views.btnSave, 'click', saveCard) : __defers['$.__views.btnSave!click!saveCard'] = true;$.__views.btnClose = Ti.UI.createButton(
  { title: 'CLOSE', id: "btnClose", top: 5, color: "red" });

  $.__views.__alloyId0.add($.__views.btnClose);
  close ? $.addListener($.__views.btnClose, 'click', close) : __defers['$.__views.btnClose!click!close'] = true;$.__views.viewCard = Ti.UI.createView(
  { id: "viewCard", left: "12%", width: Ti.UI.FILL, height: Ti.UI.SIZE });

  $.__views.win.add($.__views.viewCard);
  $.__views.card = Ti.UI.createView(
  { id: "card", width: "95%", height: "95%", backgroundColor: "#fff" });

  $.__views.viewCard.add($.__views.card);
  $.__views.viewTools = Ti.UI.createView(
  { id: "viewTools", width: Ti.UI.FILL, height: Ti.UI.FILL, backgroundColor: "#80000000", visible: false });

  $.__views.win.add($.__views.viewTools);
  $.__views.viewBackColor = Ti.UI.createView(
  { id: "viewBackColor", width: "40%", height: "60%", backgroundColor: "#C5C5C5", visible: false });

  $.__views.viewTools.add($.__views.viewBackColor);
  $.__views.__alloyId12 = Ti.UI.createView(
  { width: "95%", height: "95%", id: "__alloyId12" });

  $.__views.viewBackColor.add($.__views.__alloyId12);
  $.__views.backPicker = Alloy.createController('colorPicker', { id: "backPicker", __parentSymbol: $.__views.__alloyId12 });
  $.__views.backPicker.setParent($.__views.__alloyId12);
  $.__views.viewText = Ti.UI.createView(
  { id: "viewText", width: "40%", height: "95%", layout: "vertical", backgroundColor: "#C5C5C5", visible: false });

  $.__views.viewTools.add($.__views.viewText);
  $.__views.__alloyId13 = Ti.UI.createLabel(
  { color: "#000", font: { fontWeight: "bold", fontSize: "10%" }, touchEnabled: false, top: 20, left: "2.5%", text: "Text", id: "__alloyId13" });

  $.__views.viewText.add($.__views.__alloyId13);
  $.__views.txtText = Ti.UI.createTextField(
  { id: "txtText", top: 5, width: "95%", height: 35, backgroundColor: "#fff", hintText: "Enter text" });

  $.__views.viewText.add($.__views.txtText);
  $.__views.__alloyId14 = Ti.UI.createView(
  { top: 10, width: "95%", height: "60%", layout: "vertical", backgroundColor: "#2E2F30", id: "__alloyId14" });

  $.__views.viewText.add($.__views.__alloyId14);
  $.__views.__alloyId15 = Ti.UI.createView(
  { top: 5, left: 5, right: 5, height: 25, id: "__alloyId15" });

  $.__views.__alloyId14.add($.__views.__alloyId15);
  $.__views.__alloyId16 = Ti.UI.createView(
  { left: 0, width: "75%", backgroundColor: "#454545", borderRadius: 5, id: "__alloyId16" });

  $.__views.__alloyId15.add($.__views.__alloyId16);
  showFont ? $.addListener($.__views.__alloyId16, 'click', showFont) : __defers['$.__views.__alloyId16!click!showFont'] = true;$.__views.lblFontName = Ti.UI.createLabel(
  { font: { fontSize: "10%" }, text: 'Arial', touchEnabled: false, id: "lblFontName", left: 5, color: "#fff" });

  $.__views.__alloyId16.add($.__views.lblFontName);
  $.__views.__alloyId17 = Ti.UI.createLabel(
  { font: { fontSize: "10%" }, touchEnabled: false, right: 5, color: "#fff", text: "˅", id: "__alloyId17" });

  $.__views.__alloyId16.add($.__views.__alloyId17);
  $.__views.lblFontSize = Ti.UI.createLabel(
  { left: "80%", right: 0, height: "100%", backgroundColor: "#454545", color: "#fff", font: { fontSize: "10%" }, borderRadius: 5, text: '40', id: "lblFontSize" });

  $.__views.__alloyId15.add($.__views.lblFontSize);
  showFontSize ? $.addListener($.__views.lblFontSize, 'click', showFontSize) : __defers['$.__views.lblFontSize!click!showFontSize'] = true;$.__views.__alloyId18 = Ti.UI.createView(
  { top: 5, left: 5, right: 5, height: 25, id: "__alloyId18" });

  $.__views.__alloyId14.add($.__views.__alloyId18);
  $.__views.__alloyId19 = Ti.UI.createView(
  { left: 0, width: "75%", backgroundColor: "#454545", borderRadius: 5, id: "__alloyId19" });

  $.__views.__alloyId18.add($.__views.__alloyId19);
  showStyle ? $.addListener($.__views.__alloyId19, 'click', showStyle) : __defers['$.__views.__alloyId19!click!showStyle'] = true;$.__views.lblFontStyle = Ti.UI.createLabel(
  { font: { fontSize: "10%" }, text: 'Bold', touchEnabled: false, id: "lblFontStyle", left: 5, color: "#fff" });

  $.__views.__alloyId19.add($.__views.lblFontStyle);
  $.__views.__alloyId20 = Ti.UI.createLabel(
  { font: { fontSize: "10%" }, touchEnabled: false, right: 5, color: "#fff", text: "˅", id: "__alloyId20" });

  $.__views.__alloyId19.add($.__views.__alloyId20);
  $.__views.viewFontColor = Ti.UI.createView(
  { id: "viewFontColor", left: "80%", right: 0, height: "100%", backgroundColor: "#fff", borderRadius: 5 });

  $.__views.__alloyId18.add($.__views.viewFontColor);
  $.__views.__alloyId21 = Ti.UI.createView(
  { top: 10, width: "100%", height: "70%", id: "__alloyId21" });

  $.__views.__alloyId14.add($.__views.__alloyId21);
  $.__views.textPicker = Alloy.createController('colorPicker', { id: "textPicker", __parentSymbol: $.__views.__alloyId21 });
  $.__views.textPicker.setParent($.__views.__alloyId21);
  $.__views.btnAdd = Ti.UI.createButton(
  { title: 'ADD', id: "btnAdd", top: 15, height: 40, width: "50%", color: "#fff" });

  $.__views.viewText.add($.__views.btnAdd);
  addText ? $.addListener($.__views.btnAdd, 'click', addText) : __defers['$.__views.btnAdd!click!addText'] = true;$.__views.viewImages = Ti.UI.createView(
  { id: "viewImages", top: 10, width: "50%", height: "100%", visible: false });

  $.__views.viewTools.add($.__views.viewImages);
  $.__views.btnAddImage = Ti.UI.createButton(
  { top: 10, width: "90%", height: 40, backgroundColor: "#fff", color: "#000", font: { fontWeight: "bold" }, title: "Add Image", borderRadius: 5, id: "btnAddImage" });

  $.__views.viewImages.add($.__views.btnAddImage);
  addImage ? $.addListener($.__views.btnAddImage, 'click', addImage) : __defers['$.__views.btnAddImage!click!addImage'] = true;$.__views.scrlImages = Ti.UI.createScrollView(
  { id: "scrlImages", left: 0, top: 60, width: "100%", contentWidth: "100%", layout: "horizontal", scrollType: "vertical" });

  $.__views.viewImages.add($.__views.scrlImages);
  $.__views.viewPrint = Ti.UI.createView(
  { id: "viewPrint", width: "100%", height: "100%", visible: false });

  $.__views.viewTools.add($.__views.viewPrint);
  $.__views.imgPreview = Ti.UI.createImageView(
  { id: "imgPreview", width: "95%", height: Ti.UI.SIZE });

  $.__views.viewPrint.add($.__views.imgPreview);
  $.__views.btnHide = Ti.UI.createButton(
  { top: 20, right: 20, height: 50, width: 50, color: "#fff", title: "X", font: { fontSize: "30%", fontWeight: "bold" }, id: "btnHide" });

  $.__views.viewTools.add($.__views.btnHide);
  hideTools ? $.addListener($.__views.btnHide, 'click', hideTools) : __defers['$.__views.btnHide!click!hideTools'] = true;exports.destroy = function () {};




  _.extend($, $.__views);



  var args = $.args,
  preView,
  details,
  baseHeight,
  baseWidth,
  isSaved = false,
  font = {
    index: 0,
    title: Alloy.Globals.fonts[0].title,
    styleIndex: 0 },

  fName = Alloy.Globals.fonts[font.index].style[0],
  color = "#fff",
  folder,
  dir,
  subDir,
  selectedLbl,
  dialogSize,
  size = [],
  rotate = 90;

  var Draggable = require('ti.draggable');
  $.lblFontName.text = font.title;
  $.lblFontStyle.text = Alloy.Globals.fontStyle[font.title][0];

  function showFontSize(e) {
    if (!dialogSize) {
      for (var i = 1; i < 51; i++) {
        size[i] = i;
      }
      size.push("Cancel");
      dialogSize = Ti.UI.createOptionDialog({
        options: size,
        cancel: size.length - 1,
        title: "Select Font Size" });

      dialogSize.addEventListener('click', function (e) {
        if (e.index != size.length - 1) {
          $.lblFontSize.text = size[e.index + 1];
        }
      });
    }

    dialogSize.show();
  }

  function addDetails(dic) {
    Ti.API.info(dic);
    var dview = Draggable.createView({
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE });

    dview.addEventListener("move", function (e) {

      dview.top = e.top;
      dview.left = e.left;
    });
    if (dic.top && dic.left) {
      dview.top = dic.top;
      dview.left = dic.left;
    }
    if (dic.text) {
      var lbl = Ti.UI.createLabel({
        text: dic.text,
        font: dic.font,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,

        color: dic.color,
        _param: dic._param });

      lbl.addEventListener("singletap", function (e) {

        if (btnDelete.visible) {
          btnDelete.visible = false;
          $.btnAdd.title = "ADD";
          selectedLbl = null;
          $.txtText.value = "";
        } else {
          $.txtText.value = e.source.text;
          $.lblFontSize.text = e.source.font.fontSize;
          $.textPicker.setColor = e.source.color;

          font = {
            index: e.source._param.fontIndex,
            title: Alloy.Globals.fonts[e.source._param.fontIndex].title,
            styleIndex: e.source._param.styleIndex };


          fName = Alloy.Globals.fonts[font.index].style[font.styleIndex];
          color = e.source.color;
          $.viewFontColor.backgroundColor = color;
          $.textPicker.setBackColor(color);

          $.lblFontName.text = Alloy.Globals.fonts[e.source._param.fontIndex].title;
          $.lblFontStyle.text = Alloy.Globals.fontStyle[$.lblFontName.text][e.source._param.styleIndex];

          btnDelete.visible = true;
          $.btnAdd.title = "UPDATE";
          selectedLbl = e.source;
          action({
            source: $.txtTool });

        }
      });
      dview.add(lbl);
      var btnDelete = Ti.UI.createButton({
        top: 0,
        right: 0,
        width: 15,
        height: 15,
        backgroundImage: "/images/close.png",
        visible: false });

      btnDelete.addEventListener('click', function (e) {
        var dialog = Ti.UI.createAlertDialog({
          title: "Remove",
          message: "Sure to remove this detail?",
          buttonNames: ["No", "Yes"] });

        dialog.addEventListener('click', function (e) {
          if (e.index) {
            $.card.remove(dview);
            $.txtText.value = "";
            $.btnAdd.title = "ADD";
            isSaved = false;
          }
        });
        dialog.show();
      });

      dview.add(btnDelete);
    } else {
      var scrlView = Ti.UI.createScrollView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        contentWidth: Ti.UI.SIZE,
        contentHeight: Ti.UI.SIZE,
        minZoomScale: 0.1,
        maxZoomScale: 50,
        zoomScale: dic.zoomScale });

      var img = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        bubbleParent: false,
        imgIndex: dic.imgIndex ? dic.imgIndex : $.scrlImages.children.length - 1 });




      img.image = dic.image;

















      img.addEventListener("click", function () {
        Ti.API.info("img : " + imgDelete.visible);
        if (imgDelete.visible) {
          imgDelete.visible = false;
          imgRotate.visible = false;
        } else {
          imgDelete.visible = true;
          imgRotate.visible = true;
        }











      });



      scrlView.add(img);

      if (dic.rotate) {
        var matrix = Ti.UI.create2DMatrix({
          rotate: dic.rotate });

        var a1 = Ti.UI.createAnimation();
        a1.transform = matrix;
        a1.duration = 100;
        scrlView.animate(a1, function () {

          rotate = dic.rotate;
        });
      }
      dview.add(scrlView);
      var imgDelete = Ti.UI.createImageView({
        top: 5,
        right: 5,
        width: "12%",
        height: Ti.UI.SIZE,
        image: "/images/close.png",
        visible: false });

      imgDelete.addEventListener("click", function (e) {
        var dialog = Ti.UI.createAlertDialog({
          title: "Remove",
          message: "Sure to remove this detail?",
          buttonNames: ["No", "Yes"] });

        dialog.addEventListener('click', function (e) {
          if (e.index) {
            $.card.remove(dview);
            isSaved = false;
          }
        });
        dialog.show();
      });
      scrlView.add(imgDelete);

      var imgRotate = Ti.UI.createImageView({
        top: 5,
        right: "13%",
        width: "12%",
        height: Ti.UI.SIZE,
        image: "/images/rotate.png",
        visible: false });

      imgRotate.addEventListener("click", function (e) {
        var matrix = Ti.UI.create2DMatrix({
          rotate: rotate });

        var a1 = Ti.UI.createAnimation();
        a1.transform = matrix;
        a1.duration = 100;
        scrlView.animate(a1, function () {
          scrlView.width = Ti.UI.FILL;
          scrlView.height = Ti.UI.FILL;
          scrlView.rotate = rotate;
          rotate += 90;
          isSaved = false;
        });
      });
      scrlView.add(imgRotate);


















      dview.zIndex = -5555;
    }

    $.card.add(dview);
    isSaved = false;
  }

  function add(photo) {
    var img = Ti.UI.createImageView({
      top: 10,
      left: "5%",
      width: "45%",
      height: Ti.UI.SIZE,
      image: photo });

    img.addEventListener("click", function (e) {
      addDetails({
        image: img.image,
        zoomScale: 0 });

    });
    $.scrlImages.add(img);
    isSaved = false;
  }

  if (args.details) {
    Ti.API.info(args.details);
    folder = args.id;
    details = JSON.parse(args.details);
    color = details.parent.backgroundColor;

    $.card.backgroundColor = color;
    $.backPicker.setBackColor(color);

    for (var key in details) {
      if (key != "parent") {
        if (details[key]) {
          addDetails(details[key]);
        }
      }
    }
    dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory, args.id);
    subDir = Ti.Filesystem.getFile(dir.nativePath, "images");

    var imgs = subDir.getDirectoryListing();

    for (var i = 0; i < imgs.length; i++) {
      add(Ti.Filesystem.getFile(subDir.nativePath, imgs[i]).read());
    }
    isSaved = true;
  }

  function action(e) {
    if (preView) {
      preView.backgroundColor = "transparent";
    }
    $.viewBackColor.visible = false;
    $.viewText.visible = false;
    $.viewImages.visible = false;
    $.viewPrint.visible = false;

    switch (e.source.index) {
      case 0:
        $.viewBackColor.visible = true;
        break;
      case 1:
        $.viewText.visible = true;
        break;
      case 2:
        $.viewImages.visible = true;
        break;
      case 3:
        hideButtons();
        $.imgPreview.image = $.card.toImage();
        $.viewPrint.visible = true;
        break;}

    e.source.backgroundColor = "#B1B1B1";
    preView = e.source;
    $.viewTools.visible = true;
  }

  function hideTools() {
    $.viewTools.visible = false;

    if (preView) {
      preView.backgroundColor = "transparent";
    }
    $.btnAdd.title = "ADD";
    selectedLbl = null;
    $.txtText.value = "";


  }

  function hideButtons() {
    Ti.API.info("##################");
    for (var i = 0; i < $.card.children.length; i++) {
      var v = $.card.children[i];
      if (v.children[0].text) {
        v.children[1].visible = false;
      } else {
        v.children[0].children[1].visible = false;
        v.children[0].children[2].visible = false;
      }
    }
  }

  function openGallery() {
    Ti.Media.openPhotoGallery({
      success: function (e) {
        add(e.media);
      },
      cancel: function (e) {},
      error: function (e) {},
      allowEditing: true });

  }

  function addImage() {
    var dialog = Ti.UI.createOptionDialog({
      cancel: 1,
      options: ['Choose Photo', 'Cancel'],
      destructive: 0 });

    dialog.addEventListener("click", function (e) {
      if (e.index == 0) {
        openGallery();
      }
    });
    dialog.show();
  }

  function setTextColor(hex) {
    color = hex;
    $.viewFontColor.backgroundColor = color;
    isSaved = false;
    Ti.API.info("Color : " + color);
  }

  function setBackColor(color) {
    $.card.backgroundColor = color;
    isSaved = false;
  }

  function addText() {
    if ($.btnAdd.title == "ADD") {
      addDetails({
        text: $.txtText.value,
        font: {
          fontFamily: fName,
          fontSize: parseInt($.lblFontSize.text) },

        color: color,
        _param: {
          fontIndex: font.index,
          styleIndex: font.styleIndex } });


      $.txtText.value = "";
    } else {
      selectedLbl.text = $.txtText.value;
      selectedLbl.font = {
        fontFamily: fName,
        fontSize: parseInt($.lblFontSize.text) };

      selectedLbl.color = color;

      selectedLbl._param = {
        fontIndex: font.index,
        styleIndex: font.styleIndex };

    }
    hideTools();
  }

  var fontView = Alloy.createController("fontTable");

  fontView.on('setFont', function (dic) {
    Ti.API.info("Font : " + dic.title);
    $.lblFontName.text = dic.title;
    font = dic;
    font.styleIndex = 0;
    fName = Alloy.Globals.fonts[font.index].style[0];
    $.lblFontStyle.text = Alloy.Globals.fontStyle[font.title][0];
  });
  var dialogFstyles;
  function showStyle() {
    Ti.API.info("Font : " + JSON.stringify(font));
    Ti.API.info("Font Style : " + Alloy.Globals.fontStyle[font.title]);
    dialogFstyles = Ti.UI.createOptionDialog({
      options: Alloy.Globals.fontStyle[font.title],
      cancel: Alloy.Globals.fontStyle[font.title].length - 1,
      title: "Select Font Style" });

    dialogFstyles.addEventListener('click', function (e) {
      if (e.index != Alloy.Globals.fontStyle[font.title].length - 1) {
        fName = Alloy.Globals.fonts[font.index].style[e.index];
        $.lblFontStyle.text = Alloy.Globals.fontStyle[font.title][e.index];
        font.styleIndex = e.index;
        Ti.API.info("Font Family : " + fName);
      }
    });
    dialogFstyles.show();
  }

  function showFont() {

    fontView.showFonts();
  }

  function saveCard(cb) {
    hideButtons();
    if (!folder) {
      folder = new Date().getTime();
      dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory, folder);
      dir.createDirectory();

      Alloy.Globals.cards.push(folder);
      Ti.App.Properties.setList("cards", Alloy.Globals.cards);
      Ti.API.info(Alloy.Globals.cards.push);
      subDir = Ti.Filesystem.getFile(dir.nativePath, "images");
      subDir.createDirectory();
    }
    var f = Ti.Filesystem.getFile(dir.nativePath, folder + ".jpg");
    Ti.API.info(f.write($.card.toImage()));

    var dic = {
      parent: {
        backgroundColor: $.card.backgroundColor } };


    for (var i = 0; i < $.card.children.length; i++) {
      var v = $.card.children[i];

      dic[i.toString()] = {
        top: v.top,
        left: v.left };

      if (v.children[0].text) {
        dic[i.toString()].text = v.children[0].text;
        dic[i.toString()].color = v.children[0].color;
        dic[i.toString()].font = v.children[0].font;
        dic[i.toString()]._param = v.children[0]._param;
      } else {
        dic[i.toString()].rotate = v.children[0].rotate;
        dic[i.toString()].zoomScale = v.children[0].zoomScale;
        dic[i.toString()].imgIndex = v.children[0].children[0].imgIndex.toString();
        dic[i.toString()].image = Ti.Filesystem.getFile(subDir.nativePath, v.children[0].children[0].imgIndex.toString() + ".jpg").nativePath;
      }
    }

    Alloy.Globals.db.open();
    Alloy.Globals.db.addCard(folder, JSON.stringify(dic));
    Alloy.Globals.db.close();

    args.cb && args.cb();

    var f1;
    if ($.scrlImages.children.length) {
      for (var i = 0; i < $.scrlImages.children.length; i++) {
        f1 = Ti.Filesystem.getFile(subDir.nativePath, i.toString() + ".jpg");
        f1.write($.scrlImages.children[i].image);

      }
    }

    isSaved = true;
    cb instanceof Function && cb();
  }

  $.backPicker.setCallback({
    success: setBackColor });


  $.textPicker.setCallback({
    success: setTextColor });

  function close() {

    if (!isSaved) {
      var dialog = Ti.UI.createAlertDialog({
        title: "Save Changes",
        message: "Do you want to save changes?",
        buttonNames: ["Save", "Cancel"] });

      dialog.addEventListener('click', function (e) {
        if (e.index == 0) {
          saveCard(function () {
            $.win.close();
          });
        } else {
          $.win.close();
        }
      });
      dialog.show();
      return;
    }
    $.win.close();
  }







  __defers['$.__views.__alloyId1!click!action'] && $.addListener($.__views.__alloyId1, 'click', action);__defers['$.__views.txtTool!click!action'] && $.addListener($.__views.txtTool, 'click', action);__defers['$.__views.__alloyId6!click!action'] && $.addListener($.__views.__alloyId6, 'click', action);__defers['$.__views.__alloyId9!click!action'] && $.addListener($.__views.__alloyId9, 'click', action);__defers['$.__views.btnSave!click!saveCard'] && $.addListener($.__views.btnSave, 'click', saveCard);__defers['$.__views.btnClose!click!close'] && $.addListener($.__views.btnClose, 'click', close);__defers['$.__views.__alloyId16!click!showFont'] && $.addListener($.__views.__alloyId16, 'click', showFont);__defers['$.__views.lblFontSize!click!showFontSize'] && $.addListener($.__views.lblFontSize, 'click', showFontSize);__defers['$.__views.__alloyId19!click!showStyle'] && $.addListener($.__views.__alloyId19, 'click', showStyle);__defers['$.__views.btnAdd!click!addText'] && $.addListener($.__views.btnAdd, 'click', addText);__defers['$.__views.btnAddImage!click!addImage'] && $.addListener($.__views.btnAddImage, 'click', addImage);__defers['$.__views.btnHide!click!hideTools'] && $.addListener($.__views.btnHide, 'click', hideTools);



  _.extend($, exports);
}

module.exports = Controller;