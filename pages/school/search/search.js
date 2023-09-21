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
        var schools = that.data.schools;
        if (!schools) {
          schools = wx.getStorageSync('schools');
        }
        that.setData({
          schools: schools
        })
        if (that.data.schools) {
          that.suo();
          console.log("interval in search 调用完成", that.data.schools)
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
  suo: function () {
    var searchValue = this.data.searchValue;
    var schools = this.data.schools;
    var schoollist = [];
    for (var i = 0; i < schools.length; i++) {
      var school = schools[i];
      var str = school.city + school.name;
      var check = 1;
      for (var j = 0; j < searchValue.length; j++) {
        if (str.indexOf(searchValue[j]) == -1) { check = 0; break }
      }
      if (check == 1) {
        var dic = {};
        dic.city = school.city;
        dic.QS_dome = school.qsdome;
        dic.name = school.name;
        dic.logo = this.findlogo(school.enname)
        dic.id = school._id;
        schoollist.push(dic);
      }
    }
    schoollist.sort(function (a, b) { return a.QS_dome - b.QS_dome; })
    console.log(schoollist)
    this.setData({
      schoollist: schoollist,
      init: 0
    })
  },
  learn_more(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../oneschool/index/index?school_id=" + e.currentTarget.dataset.id
    })
  },
  findlogo(enname) {
    var schoolpics = wx.getStorageSync("schoolpics");
    for (var i = 0; i < schoolpics.length; i++) {
      if (schoolpics[i].enname == enname) { return schoolpics[i].logo; }
    }
  },
})