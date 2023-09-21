// pages/school/index/school.js
const app = getApp();
Page({
  data: {
    backheight: 0,
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e189ay2fj30ws0ka0yb.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://wx3.sinaimg.cn/mw2000/0085wEMdly1h2e185weafj30n60gradm.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2e188mpn7j30rs0ijn1l.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e187stc7j30ws0kathf.jpg'
    }],
  },
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  onShow() {
    this.tabBar();
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight) * app.globalData.pxToRpxScale;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight
    })
  },
  onLoad() {
    this.towerSwiper('swiperList');
    var that = this;
    this.setData({
      interval: setInterval(function () {
        console.log("interval in school 调用一次");
        var schools = that.data.schools;
        if (!schools) {
          schools = wx.getStorageSync('schools');
        }
        that.setData({
          schools: schools
        })
        if (that.data.schools) {
          console.log("interval in school 调用完成", that.data.schools)
          clearInterval(that.data.interval)
        }
      }, 1000)
    })
    let query = wx.createSelectorQuery()
    query.select('#main-search').boundingClientRect((rect) => {
      let height = rect.height * app.globalData.pxToRpxScale
      var searchheight = height;
      that.setData({
        searchheight: searchheight
      })
    }).exec()
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    console.log(e)
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  linkmenlist() {
    wx.navigateTo({
      url: "../linkmen/linkmen",
    })
  },
  chooseschool() {
    wx.navigateTo({
      url: "../classify/classify",
    })
  },
  choosesubject() {
    wx.navigateTo({
      url: "../programs/programs",
    })
  },
  clickquestion() {
    var collections = wx.getStorageSync('collections')
    if (collections && collections.openid) {
      wx.navigateTo({
        url: "../question/question",
      })
    }
    else {
      wx.switchTab({
        url: '../../my/my',
        complete: function () {
          wx.showToast({
            title: '请先登录',
            icon: 'error',
          })
        }
      })
    }
  },
  clickcontact() {
    var collections = wx.getStorageSync('collections')
    if (collections && collections.openid) {
      wx.navigateTo({
        url: "../../my/contact/contact",
      })
    }
    else {
      wx.switchTab({
        url: '../../my/my',
        complete: function () {
          wx.showToast({
            title: '请先登录',
            icon: 'error'
          })
        }
      })
    }
  },
  clickrecommend() {
    var questions = wx.getStorageSync("questions");
    var collections = wx.getStorageSync('collections')
    if (collections && collections.openid) {
      if (!questions) {
        wx.showModal({
          title: '提示',
          content: '完成留学自测后即可解锁该功能',
          showCancel: false
        })
      } else {
        wx.navigateTo({
          url: '../recommend/recommend'
        })
      }
    }
    else {
      wx.switchTab({
        url: '../../my/my',
        complete: function () {
          wx.showToast({
            title: '请先登录',
            icon: 'error',
          })
        }
      })
    }

  }
})