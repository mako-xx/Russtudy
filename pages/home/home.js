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
      url: 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2ds8dlvnjj30zk0nngur.jpg'
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
        selected: 0
      })
    }
  },
  how(){
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.tabBar();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})