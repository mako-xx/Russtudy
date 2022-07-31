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

  msgList = [
    {
      speaker: 'mid',
      contentType: 'text',
      content: '中俄留学小助手为您服务'
    },
    {
      speaker: 'server',
      contentType: 'text',
      content: '这里是中俄留学小助手客服，请问您有什么想咨询的吗'
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
    text: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("op", options)
    initData(this);
    
    var collection = wx.getStorageSync("collections")
    console.log("res", collection.openid)
    this.setData({
      cusHeadIcon: 'cloud://cloudtest-3g82y8a0d914b437.636c-cloudtest-3g82y8a0d914b437-1311354097/avatar/' + collection.openid + '.png'
      // cusHeadIcon: 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2q4mp6kluj305k05k3yi.jpg'
    });
    var messages = wx.getStorageSync("messages");

    var index = parseInt(options.index);
    if (!index) index = 0

    var msgList, serverinfo;
    if (messages.length > index) {
      msgList = messages[index].list;
      serverinfo = messages[index];
    }
    console.log(serverinfo)
    this.setData({
      serverinfo
    })

    console.log(msgList)
    if (!msgList || !msgList.length) {
      if (!index) {
        if (!options.carry)
          msgList = [
            {
              speaker: 'mid',
              contentType: 'text',
              content: '中俄留学小助手为您服务'
            },
            {
              speaker: 'server',
              contentType: 'text',
              content: '这里是中俄留学小助手客服，请问您有什么想咨询的吗'
            }
          ]
        else
          msgList = [
            {
              speaker: 'mid',
              contentType: 'text',
              content: '中俄留学小助手为您服务'
            },
            {
              speaker: 'mid',
              contentType: 'text',
              content: '您正在咨询的是' + options.carry
            },
            {
              speaker: 'server',
              contentType: 'text',
              content: '这里是中俄留学小助手客服，请问您有什么想咨询的吗'
            }
          ]
      }
      else {
        msgList = [
          {
            speaker: 'mid',
            contentType: 'text',
            content: '正在与您对接的是' + serverinfo.school + '-' + serverinfo.name
          },
          {
            speaker: 'server',
            contentType: 'text',
            content: '这里是' + serverinfo.school + '对接员，请问您有什么想咨询的吗'
          }
        ]
      }
    } else if (msgList[msgList.length - 1].speaker == 'mid') {
      if (!index) {
        if (options.carry) msgList[msgList.length - 1].content = '您正在咨询的是' + options.carry
        else msgList[msgList.length - 1].content = '中俄留学小助手为您服务'
      }

    }
    messages[index].list = msgList
    this.setData({
      msgList: msgList,
      messages: messages,
      msgindex: index
    })
    wx.setStorageSync("messages", messages)
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 获取聚焦
   */
  focus: function (e) {
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
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },
  expInput: function (e) {
    this.setData({ text: e.detail.value })
  },
  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    console.log("begin")
    if (e.detail.value) {
      var messages = this.data.messages;
      var msgList = this.data.msgList;
      var msgindex = this.data.msgindex;
      msgList.push({
        speaker: 'customer',
        contentType: 'text',
        content: e.detail.value
      })
      messages[msgindex].list = msgList;
      inputVal = '';
      this.setData({
        messages,
        msgList,
        inputVal,
        text: ''
      });
      wx.setStorageSync("messages", messages)
    }
  },
  sendClickButton: function () {
    if (this.data.text) {
      var messages = this.data.messages;
      var msgList = this.data.msgList;
      var msgindex = this.data.msgindex;
      msgList.push({
        speaker: 'customer',
        contentType: 'text',
        content: this.data.text
      })
      messages[msgindex].list = msgList;
      inputVal = '';
      this.setData({
        messages,
        msgList,
        inputVal,
        text: ''
      });
      wx.setStorageSync("messages", messages)

    }


  },
  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  }

})
