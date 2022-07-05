// pages/school/question/question.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow7: false,
    isShow_Gong: false,
    isShow_Li: false,
    isShow_Wen: false,
    isShow_Shang: false,
    isShow_Ti: false,
    flag: false,
    AGE: ['18', '19', '20', '21', '22', '23', '24', '25', '26'],
    EXP: ['1', '2', '3', '4', '5', '6', '7', '8'],
    AGEindex: 0,
    EXPindex: 0,
    city: [
      { value: '0', name: "莫斯科" },
      { value: '1', name: '圣彼得堡' },
      { value: '2', name: '喀山' },
      { value: '3', name: '下诺夫哥罗德' },
      { value: '4', name: '新西伯利亚' },
      { value: '5', name: '托木斯克' },
      { value: '6', name: '符拉迪沃斯托克' },
      { value: '7', name: '彼得罗扎沃茨克' },
      { value: '8', name: '萨马拉' },
      { value: '9', name: '彼尔姆' },
      { value: '10', name: '乌苏里斯克' },
      { value: '11', name: '索契' },
      { value: '12', name: '阿尔扎马斯' },
      { value: '13', name: '阿巴坎' },
      { value: '14', name: '卡马河畔切尔尼' },
      { value: '15', name: '奥布宁斯克' },
      { value: '16', name: '车里雅宾斯克' },
      { value: '17', name: '加里宁格勒' },
      { value: '18', name: '秋明' },
      { value: '19', name: '克拉斯诺亚尔斯克' },
    ]
  },
  change8(e) {
    console.log(e.detail.value.length)
    this.setData({
      flag: true,
    })
    if (e.detail.value.length == 0) {
      this.setData({
        flag: false,
      })
    }
  },
  changeG(e) {
    console.log(e.detail.value.length)
    this.setData({
      flag: true,
    })
    if (e.detail.value.length == 0) {
      this.setData({
        flag: false,
      })
    }
  },
  changeS(e) {
    this.setData({
      flag: true,
    })
    if (e.detail.value.length == 0) {
      this.setData({
        flag: false,
      })
    }
  },
  changeT(e) {
    this.setData({
      flag: true,
    })
    if (e.detail.value.length == 0) {
      this.setData({
        flag: false,
      })
    }
  },
  changeL(e) {
    this.setData({
      flag: true,
    })
    if (e.detail.value.length == 0) {
      this.setData({
        flag: false,
      })
    }
  },
  changeW(e) {
    this.setData({
      flag: true,
    })
    if (e.detail.value.length == 0) {
      this.setData({
        flag: false,
      })
    }
  },
  bindAgeChange(e) {
    console.log(e)
    this.setData({
      AGEindex: e.detail.value
    })
  },
  bindExpChange(e) {
    console.log(e)
    this.setData({
      EXPindex: e.detail.value
    })
  },
  formSubmit_(e) {
    if (this.data.flag) {
      console.log(e.detail.value)
      wx.setStorageSync("questions", e.detail.value)
      wx.navigateBack({
        delta: 1
      })
      wx.showToast({
        title: '留学自测已完成，解锁智能推荐功能！',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }

    if (e.detail.value.sex.length == 0) {
      wx.showToast({
        title: '请填选性别',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.degree.length == 0) {
      wx.showToast({
        title: '请填选学历',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.cost.length == 0) {
      wx.showToast({
        title: '请填选成本',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.profession.length == 0) {
      wx.showToast({
        title: '请填选专业',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.duration.length == 0) {
      wx.showToast({
        title: '请填选留学时间',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.exp.length == 0) {
      wx.showToast({
        title: '请填选经验',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (this.data.flag == false) {
      wx.showToast({
        title: '请填选专业',
        icon: 'error',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }

  },
  change7(e) {
    console.log(e.detail.value)
    if (e.detail.value == "1") {
      this.setData({
        isShow7: true,
      })
    } else if (e.detail.value == "0") {
      this.setData({
        isShow7: false,
      })
    }
  },
  change5(e) {
    this.setData({
      isShow_Gong: false,
      isShow_Li: false,
      isShow_Wen: false,
      isShow_Shang: false,
      isShow_Ti: false,
      flag: false,
    })
    console.log(e.detail.value)
    if (e.detail.value == "文科") {
      console.log(e.detail.value)
      this.setData({
        isShow_Wen: true,
      })
    } else if (e.detail.value == "理科") {
      console.log(e.detail.value)
      this.setData({
        isShow_Li: true,
      })
    } else if (e.detail.value == "商科") {
      this.setData({
        isShow_Shang: true,
      })
    } else if (e.detail.value == "工科") {
      this.setData({
        isShow_Gong: true,
      })
    } else if (e.detail.value == "体育") {
      this.setData({
        isShow_Ti: true,
      })
    }
  },
  handleBack() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight) * app.globalData.pxToRpxScale;
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