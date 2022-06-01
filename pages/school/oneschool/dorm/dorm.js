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
    var backPic = wx.getStorageSync("backPic");
    this.setData({
      backPic: backPic
    })
    var pages = getCurrentPages();   //当前页面
    if (pages.length > 1) {
      var prevPage = pages[pages.length - 2];   //上个页面
      var school = prevPage.data.school;
      var dorm = school.dorm;
      console.log(dorm);
      var printvalue = [];
      for (var i = 0; i < dorm.length; i++) {
        var part = {};
        part.question = dorm[i].question;
        part.answer = dorm[i].answer;
        printvalue.push(part);
      }
      this.setData({
        printvalue: printvalue
      })
      console.log(printvalue);
    }
  }
})