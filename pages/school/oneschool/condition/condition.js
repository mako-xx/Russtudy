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
      ShowHeight: ShowHeight
    })
    this.getschool();
    this.dataprocess();
  },
  getschool() {
    var school = wx.getStorageSync("school");
    var backPic = wx.getStorageSync("backPic");
    this.setData({
      school: school,
      backPic: backPic
    })
    console.log(school);
  },
  dataprocess() {
    var value = this.data.school.conditions;
    var printvalue = [];
    for (var i = 0; i < value.length; i++) {
      var part = {};
      part.title = value[i].title;
      var text = [];
      for (var j = 0; j < value[i].text.length; j++) {
        var t = value[i].text[j];
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
    console.log(printvalue)
  }
})
