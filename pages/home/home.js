// pages/home/home.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e189ay2fj30ws0ka0yb.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'http://wx3.sinaimg.cn/mw2000/0085wEMdly1h2e185weafj30n60gradm.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://wx1.sinaimg.cn/mw2000/0085wEMdly1h2e188mpn7j30rs0ijn1l.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'http://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e187stc7j30ws0kathf.jpg'
    }],
  },
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  how() {
    wx.navigateTo({
      url: '../home/how/how',
    })
  },
  whyrussia() {
    wx.navigateTo({
      url: '../home/home/home',
    })
  },
  college() {
    wx.navigateTo({
      url: '../school/classify/classify',
    })
  },
  profession() {
    wx.navigateTo({
      url: '../school/programs/programs',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    // var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight) * app.globalData.pxToRpxScale;
    var windowHeight = (app.globalData.ktxWindowHeight - app.globalData.navigationHeight) * app.globalData.pxToRpxScale;
    var ShowHeight = windowHeight - HeadBar;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight
    })
    this.tabBar();
  },
  clickrecommend() {
    console.log('here1')
    var questions = wx.getStorageSync("questions");
    var collections = wx.getStorageSync('collections')
    if (!collections || !collections.openid) {
      console.log('here2')
      wx.switchTab({
        url: '../my/my',
        complete: function () {
          wx.showToast({
            title: '请先登录',
            icon: 'error',
          })
        }
      })
    }
    else if (!questions) {
      console.log('here2')
      wx.navigateTo({
        url: "../school/question/question",
        complete: function () {
          wx.showToast({
            title: '完成智能调查问卷后即可进行院校推荐',
            icon: 'none',
            duration: 2000//持续的时间
          })
        }
      })

    } else {
      wx.navigateTo({
        url: "../school/recommend/recommend"
      })
    }
  }
})