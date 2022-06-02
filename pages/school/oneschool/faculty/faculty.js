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
  },
  getschool() {
    var school = wx.getStorageSync("school");
    var backPic = wx.getStorageSync("backPic");
    this.setData({
      school: school,
      backPic: backPic
    })
    var preparatory = school.faculties;
    console.log(preparatory);
    var printvalue = [];
    for (var i = 0; i < preparatory.length; i++) {
      var part = {};
      part.title = preparatory[i].name;
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

