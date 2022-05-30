
// app.js
App({
  globalData: {
  },
  onLaunch() {
    //建立云
    wx.cloud.init({
      traceUser: true,
      env: 'cloudtest-3g82y8a0d914b437'
    })
    // 获取openid等登录信息，对应的代码在cloudfunctions/getInformation/index.js下
    wx.cloud.callFunction({
      name: 'getInformation',
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        console.log(that.globalData.statusBarHeight);
      }
    })
    // 获取状态栏的高度
    wx.getSystemInfo({
      success: function (res) {
        // px转换到rpx的比例
        let pxToRpxScale = 750 / res.windowWidth;
        // 状态栏的高度
        let ktxStatusHeight = res.statusBarHeight;
        // 导航栏的高度
        let navigationHeight = 44;
        // window的宽度
        let ktxWindowWidth = res.windowWidth;
        // window的高度
        let ktxWindowHeight = res.windowHeight;
        // 屏幕的高度
        let ktxScreentHeight = res.screenHeight;
        that.globalData.pxToRpxScale = pxToRpxScale;
        that.globalData.ktxStatusHeight = ktxStatusHeight;
        that.globalData.navigationHeight = navigationHeight;
        that.globalData.ktxWindowWidth = ktxWindowWidth;
        that.globalData.ktxWindowHeight = ktxWindowHeight;
        that.globalData.ktxScreentHeight = ktxScreentHeight;
      }
    })  
  },
 
})
