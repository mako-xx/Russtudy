// pages/contact/contact.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [{
      speaker: 'server',
      contentType: 'text',
      content: '这里是中俄留学小助手，请输入你想问的问题'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0,
    message: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.message_)
    this.setData({
      message:options.message_
    })
    initData(this);
    var collection=wx.getStorageSync("collections")
    console.log("res",collection.openid)
    this.setData({
      cusHeadIcon:'cloud://cloudtest-3g82y8a0d914b437.636c-cloudtest-3g82y8a0d914b437-1311354097/avatar/' + collection.openid + '.png'
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });


  },

  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})
