const app = getApp()

Page({
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  onShow() {
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight - app.globalData.navigationHeight) * app.globalData.pxToRpxScale;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight,
      backheight: app.globalData.backheight
    })
    if (!this.data.backheight) {
      console.log('in')
      console.log(this.data.backheight)
      var that = this
      let query = wx.createSelectorQuery()
      query.select('#main-back').boundingClientRect((rect) => {
        let height = rect.height * app.globalData.pxToRpxScale
        console.log("hei", height, app.globalData.pxToRpxScale)
        var backheight = (height + 2 * 30);
        that.setData({
          backheight: backheight
        })
        getApp().globalData.backheight = backheight
      }).exec()
    }
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
      console.log("printvalue", printvalue);
    }
  }
})