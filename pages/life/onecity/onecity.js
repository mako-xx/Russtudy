const app = getApp()
Page({
  getinfo() {
    var city_id = this.data.city_id
    var allcitys = this.data.citys;
    var allcitypics = this.data.citypics;
    var cityinfo = allcitys[0];
    for (var i = 0; i < allcitys.length; i++) {
      if (allcitys[i]._id == city_id) {
        cityinfo = allcitys[i];
        break;
      }
    }
    console.log(allcitypics, cityinfo)
    for (var i = 0; i < allcitypics.length; i++) {
      if (allcitypics[i].name == cityinfo.name) {
        cityinfo.pics = allcitypics[i].links;
        break;
      }
    }
    this.setData({
      city: cityinfo
    })
    console.log(this.data.city)
  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    });
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight) * app.globalData.pxToRpxScale;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight
    })
    this.setData({
      city_id: options.city_id
    })
    var that = this
    let query = wx.createSelectorQuery()
    query.select('#main-back').boundingClientRect((rect) => {
      let height = rect.height * app.globalData.pxToRpxScale
      console.log("hei", height, app.globalData.pxToRpxScale)
      var backheight = (height + 2 * 30); console.log("h", backheight)
      that.setData({
        backheight: backheight
      })
    }).exec()
    this.setData({
      interval: setInterval(function () {
        console.log("interval in onecity 调用一次");
        var citys = that.data.citys;
        var citypics = that.data.citypics;
        if (!citys) {
          citys = wx.getStorageSync('citys');
        }
        if (!citypics) {
          citypics = wx.getStorageSync('citypics');
        }
        that.setData({
          citys: citys,
          citypics: citypics
        })
        if (that.data.citys && that.data.citypics) {
          console.log("interval in onecity 调用完成", that.data.citys)
          that.getinfo()
          that.setData({
            loading: false
          })
          wx.hideLoading()
          clearInterval(that.data.interval)
        }
      }, 1000)
    })
  }
})
