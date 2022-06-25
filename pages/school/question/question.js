// pages/school/question/question.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow7: false,
    AGE: ['18','19','20','21','22','23','24','25','26'],
    EXP: ['1','2','3','4','5','6','7','8'],
    AGEindex: 0,
    EXPindex: 0,
  },
  bindAgeChange(e){
    console.log(e)
    this.setData({
      AGEindex: e.detail.value
    })
  },
  bindExpChange(e){
    console.log(e)
    this.setData({
      EXPindex: e.detail.value
    })
  },
  formSubmit_(e){
    console.log(e)
    console.log(e.detail.value.sex.length)
    console.log(this.data.isShow7)
  if(e.detail.value.sex.length == 0){
    wx.showToast({
      title: '请填选性别',
      icon: 'error',
      duration: 1500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  }else if(e.detail.value.degree.length == 0){
    wx.showToast({
      title: '请填选学历',
      icon: 'error',
      duration: 1500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  }else if(e.detail.value.cost.length == 0){
    wx.showToast({
      title: '请填选成本',
      icon: 'error',
      duration: 1500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  }else if(e.detail.value.profession.length == 0){
    wx.showToast({
      title: '请填选专业',
      icon: 'error',
      duration: 1500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  }else if(e.detail.value.duration.length == 0){
    wx.showToast({
      title: '请填选留学时间',
      icon: 'error',
      duration: 1500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  }else if(e.detail.value.exp.length == 0){
    wx.showToast({
      title: '请填选经验',
      icon: 'error',
      duration: 1500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 2000)
  }
},
  change7(e){
      console.log(e.detail.value)
      if(e.detail.value=="1"){
        this.setData({
         isShow7: true,
        })
      } else if(e.detail.value=="0"){
       this.setData({
        isShow7: false,
       })
      }
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