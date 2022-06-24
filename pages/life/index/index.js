const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shownum: 0
  },
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight - app.globalData.navigationHeight) * app.globalData.pxToRpxScale;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight
    })
    var that = this;
    this.setData({
      interval: setInterval(function () {
        console.log("interval in city 调用一次");
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
          console.log("interval in city 调用完成", that.data.citys)
          that.dataprocess();
          clearInterval(that.data.interval)
        }
      }, 1000),
      interval2: setInterval(function () {
        let query = wx.createSelectorQuery()
        query.select('#city-0').boundingClientRect((rect) => {
          let width = rect.width * app.globalData.pxToRpxScale
          that.setData({
            citywidth: width
          })
        }).exec()
        if (that.data.citywidth) clearInterval(that.data.interval2)
      }, 1000)
    })
  },
  dataprocess() {
    var citys = this.data.citys
    var collections = this.data.collections

    console.log(citys)
    citys = citys.sort(function (a, b) { return a.index - b.index });
    var showcitys = [];
    var allpics = this.data.citypics
    for (var i = 0; i < citys.length; i++) {
      var j = 0;
      for (; j < allpics.length; j++) {
        if (allpics[j].name == citys[i].name)
          break;
      }
      var simdic = { "name": citys[i].name, "index": citys[i].index, "pic": allpics[j].links[0], "id": citys[i]._id, "s_description": citys[i].describe }
      showcitys.push(simdic)
    }
    console.log(showcitys)
    this.setData({
      showcitys: showcitys
    })
  },

  clickcity(e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: "../onecity/onecity?city_id=" + id,
    });
  },
  onShow() {
    this.tabBar();
  },

  changeshow(e) {
    var num = e.currentTarget.dataset.num;
    this.setData({
      shownum: num
    })
  }
})