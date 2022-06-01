const app = getApp()

Page({
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  onShow() {
    var intervalHeight = 10;
    var SearchHeight = 50;
    var windowHeight = (app.globalData.ktxWindowHeight) * app.globalData.pxToRpxScale;
    var topHeight = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale;
    var trueHeight = windowHeight - topHeight + SearchHeight + app.globalData.navigationHeight;//非导航栏页需加navigationHeight，非搜索栏页须加SearchHeight
    var scrollHeight = trueHeight - SearchHeight - 2 * intervalHeight;
    // var containerPercentage=100*app.globalData.ktxWindowHeight/app.globalData.ktxScreentHeight;
    // var statusBarHeightPercentage=100*(app.globalData.navigationHeight+app.globalData.ktxStatusHeight)/app.globalData.ktxWindowHeight;
    // var statusContainerHeightPercentage=100-statusBarHeightPercentage;
    console.log(app.globalData);
    this.setData({
      windowHeight: windowHeight,
      topHeight: topHeight,
      trueHeight: trueHeight,
      scrollHeight: scrollHeight,
      intervalHeight: intervalHeight,
      SearchHeight: SearchHeight
    })
    this.getschool();
  },
  getschool() {
    var school = wx.getStorageSync("school");
    var backPic = wx.getStorageSync("backPic");
    this.setData({
      school: school,
      backPic: backPic
    })
    var preparatory = school.preparatory;
    console.log(preparatory);
    var printvalue = [];
    for (var i = 0; i < preparatory.length; i++) {
      var part = {};
      part.title = preparatory[i].title;
      var text = [];
      for (var j = 0; j < preparatory[i].text.length; j++) {
        var t = preparatory[i].text[j];
        var put = {};
        if (t[0] == 'b') {
          put.value = t.substr(1);
          put.kind = "big";
        } else if (t[0] == 'n') {
          put.value = t.substr(1);
          put.kind = "blank";
        } else {
          put.value = t;
          put.kind = "normal";
        }
        text.push(put);
      }
      part.text = text;
      printvalue.push(part);
    }
    this.setData({
      printvalue: printvalue
    })
    console.log(printvalue);

  }
})
