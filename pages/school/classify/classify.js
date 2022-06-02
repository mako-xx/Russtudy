const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    // src: ['https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2e188mpn7j30rs0ijn1l.jpg', 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e187stc7j30ws0kathf.jpg', 'https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2e18a31bsj31kw11ykjl.jpg', 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e188bymfj313d0mvwiq.jpg'],
    load: true
  },
  onLoad() {
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true,
    //   during: 2000
    // });
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight - app.globalData.navigationHeight) * app.globalData.pxToRpxScale;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight
    })

    let list = [{ "name": "QS排名", id: 0 }, { "name": "城市分类", id: 1 }, { "name": "智能推荐", id: 2 }, { "name": "热度排行", id: 3 }, { "name": "我的收藏", id: 4 }];
    // for (let i = 0; i < 26; i++) {
    //   list[i] = {};
    //   list[i].name = String.fromCharCode(65 + i);
    //   list[i].id = i;
    // }
    this.setData({
      list: list,
      listCur: list[0]
    })
    var that = this;
    this.setData({
      interval: setInterval(function () {
        console.log("interval in classify 调用一次");
        var schools = that.data.schools;
        var collections = that.data.collections;
        if (!schools) {
          schools = wx.getStorageSync('schools');
        }
        if (!collections) {
          collections = wx.getStorageSync('collections');
        }
        that.setData({
          schools: schools,
          collections: collections
        })
        if (that.data.schools && that.data.collections) {
          console.log("interval in classify 调用完成", that.data.schools, that.data.collections)
          that.getQSrank();
          that.getCityCla();
          clearInterval(that.data.interval)
        }
      }, 1000)
    })


  },
  toggle(e) {
    console.log(e);
    var anmiaton = e.currentTarget.dataset.class;
    var that = this;
    that.setData({
      animation: anmiaton
    })
    setTimeout(function () {
      that.setData({
        animation: ''
      })
    }, 1000)
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  getQSrank() {
    var schools = this.data.schools
    schools.sort(function (a, b) { return a.qsdome - b.qsdome });
    console.log(schools);
    var QSlist = [];
    for (var i = 0; i < schools.length; i++) {
      var dic = {};
      dic.QS_all = schools[i].qs_rating[3].rate_num;
      dic.QS_dome = schools[i].qsdome;
      dic.name = schools[i].name;
      dic.logo = "https://pic4.zhimg.com/50/v2-98b210a15c5c0318589bce49804b1673_hd.jpg?source=1940ef5c";
      dic.id = schools[i]._id;
      QSlist.push(dic)
    }
    this.setData({
      QSlist: QSlist
    })
  },
  getCityCla() {
    var schools = this.data.schools
    var citys = ["莫斯科", "圣彼得堡", "加里宁格勒", "喀山", "符拉迪沃斯托克", "新西伯利亚", "彼得罗扎沃茨克", "克拉斯诺亚尔斯克", "萨马拉", "车里雅宾斯克", "托木斯克", "下诺夫哥罗德", "叶卡捷琳堡", "秋明"]
    var CityList = [];
    for (var i = 0; i < citys.length; i++) {
      CityList.push({ "name": citys[i], "list": [] });
    }
    for (var i = 0; i < schools.length; i++) {
      var school = schools[i];
      var index = citys.indexOf(school.city);
      if (index != -1) {
        var dic = {};
        dic.QS_all = school.qs_rating[3].rate_num;
        dic.QS_dome = school.qsdome;
        dic.name = school.name;
        dic.logo = "https://pic4.zhimg.com/50/v2-98b210a15c5c0318589bce49804b1673_hd.jpg?source=1940ef5c";
        dic.id = school._id;
        CityList[index].list.push(dic);
      }

    }
    console.log(CityList)
    for (var i = 0; i < CityList.length; i++) {
      CityList[i].list.sort(function (a, b) { return a.qsdome - b.qsdome })
    }
    console.log(CityList)
    this.setData({
      CityList: CityList
    })

  },
  learn_more(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../oneschool/index/index?school_id=" + e.currentTarget.dataset.id
    })
  }
})