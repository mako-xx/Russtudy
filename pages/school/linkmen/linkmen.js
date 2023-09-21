const app = getApp()
Page({
  data: {
    searchValue: '',
    schoollist: [],
    init: 1
  },
  onShow() {
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight) * app.globalData.pxToRpxScale;
    var WinHeight = (app.globalData.ktxWindowHeight) * app.globalData.pxToRpxScale;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight,
      WinHeight: WinHeight
    })
    var that = this;
    this.setData({
      interval: setInterval(function () {
        console.log("interval in search 调用一次");
        var messages = that.data.messages;
        if (!messages) {
          messages = wx.getStorageSync('messages').slice(1);
        }
        that.setData({
          messages: messages
        })
        if (that.data.messages) {
          // that.suo();
          console.log("interval in search 调用完成", that.data.messages)
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

  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    if (!value && this.data.productData.length == 0) {
      this.setData({
        centent_Show: false,
      });
    }
  },
  asklinker: function (e) {
    var collections = wx.getStorageSync('collections')
    if (collections && collections.openid) {
      wx.navigateTo({
        url: "../../my/contact/contact?index=" + e.currentTarget.dataset.index
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
  suo: function () {
    var searchValue = this.data.searchValue;
    var messages = wx.getStorageSync('messages').slice(1);
    var messagelist = [];
    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      var str = message.school + message.name + message.degree;
      var check = 1;
      for (var j = 0; j < searchValue.length; j++) {
        if (str.indexOf(searchValue[j]) == -1) { check = 0; break }
      }
      if (check == 1) {
        messagelist.push(message)
      }
    }
    this.setData({
      messages: messagelist,
      init: 0
    })
  },

})