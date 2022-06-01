const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    citylist: [{ "name": "全部", "index": 0 }, { "name": "莫斯科", "index": 1 }, { "name": "圣彼得堡", "index": 2 }, { "name": "喀山", "index": 3 }, { "name": "符拉迪沃斯托克", "index": 4 }],
    toplist: [{ "name": "全部", "index": 0 }, { "name": "商科", "index": 1 }, { "name": "工科", "index": 2 }, { "name": "理科", "index": 3 }, { "name": "文科", "index": 4 }],
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
      ShowHeight: ShowHeight,
      WinWidth: app.globalData.ktxWindowWidth * app.globalData.pxToRpxScale
    })

    // for (let i = 0; i < 26; i++) {
    //   list[i] = {};
    //   list[i].name = String.fromCharCode(65 + i);
    //   list[i].id = i;
    // }
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
    let citylist = this.data.citylist;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < citylist.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          citylist[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          citylist[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        citylist: citylist
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < citylist.length; i++) {
      if (scrollTop > citylist[i].top && scrollTop < citylist[i].bottom) {
        that.setData({
          VerticalNavTop: (citylist[i].id - 1) * 50,
          TabCur: citylist[i].id
        })
        return false
      }
    }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
})