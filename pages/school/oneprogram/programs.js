const app = getApp()
Page({
  data: ({
    imgwidth: 0,
    HeadBar: 2000,
    backheight: 2000,
    titleheight: 2000,
    intervaltimes: 0
  }),
  back() {
    var pages = getCurrentPages();   //当前页面
    var prevPage = pages[pages.length - 2];   //上个页面
    // 直接给上一个页面赋值
    prevPage.setData({
      iffrash: 0//防止上个界面刷新
    });
    wx.navigateBack({
      delta: 1
    })

  },
  toKefu() {
    var collections = wx.getStorageSync('collections')
    if (collections && collections.openid) {
      wx.navigateTo({
        url: '../../my/contact/contact?message_="这里是专业相关询问界面，可以询问学校专业有关问题。"',
      })
    }
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'error'
      })
    }
  },
  onLoad(options) {
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight - app.globalData.navigationHeight) * app.globalData.pxToRpxScale;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight,
      backheight: app.globalData.backheight
    })
    var that = this
    if (!this.data.backheight) {
      console.log('in')
      console.log(this.data.backheight)

      let query = wx.createSelectorQuery()
      query.select('#main-back').boundingClientRect((rect) => {
        let height = rect.height * app.globalData.pxToRpxScale
        console.log("hei", height, app.globalData.pxToRpxScale)
        var backheight = (height + 2 * 30);
        that.setData({
          backheight: backheight
        })
        getApp().globalData.backheight = backheight
      }).exec()
    }

    this.setData({
      interval: setInterval(function () {
        console.log("interval in oneprogram 调用一次");
        that.setData({
          intervaltimes: that.data.intervaltimes + 1
        })
        console.log("intervaltimes", that.data.intervaltimes)
        if (that.data.intervaltimes > 3) clearInterval(that.data.interval)
        if (!that.data.schools || !that.data.collections) {
          var schools = wx.getStorageSync('schools');
          var collections = wx.getStorageSync('collections');
          if (schools && collections) {
            that.setData({
              schools: schools,
              collections: collections
            })
          }
        }

        if (that.data.schools && that.data.collections) {
          var pages = getCurrentPages();   //当前页面
          if (pages.length > 1) {
            var prevPage = pages[pages.length - 2];   //上个页面
            var program = prevPage.data.giveProgram;
            prevPage.setData({
              allownavigate: 1
            })
            console.log(prevPage)
            console.log("get", program)
            that.setData({
              program: program,
              backPic: "https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2dezuv331j30rs0ijtbr.jpg"
            })
            that.dataprocess();
            var ifcollect = that.ifcollect();
            that.setData({
              ifcollected: ifcollect
            })
          }
          console.log("interval in classify oneprogram")
          clearInterval(that.data.interval)
        }
      }, 1000)
    })
    let query = wx.createSelectorQuery()
    query.select('#main-title').boundingClientRect((rect) => {
      let height = rect.height * app.globalData.pxToRpxScale
      that.setData({
        titleheight: height
      })
    }).exec()
  },
  onShow() {

    this.setData({
      imgwidth: 200
    })
  },
  SetClipboard(e) {
    var value = e.target.dataset.value;
    wx.setClipboardData({
      data: value
    })
  },
  clicklove() {
    console.log("in");
    var ifcollected = 1 - this.data.ifcollected;
    this.setData({
      ifcollected: ifcollected,
      ifupdata: 1
    })
    var collections = this.data.collections;
    if (ifcollected == 1) {
      if (collections.programs.indexOf(this.data.program.index) == -1) {
        collections.programs.push(this.data.program.index);
        this.setData({
          collections: collections
        })
        wx.setStorageSync("collections", collections);
      }

    } else if (ifcollected == 0) {
      var _ = collections.programs.indexOf(this.data.program.index);
      if (_ != -1) {
        collections.programs[_] = collections.programs[collections.programs.length - 1];
        collections.programs.pop();
        this.setData({
          collections: collections
        })
        wx.setStorageSync("collections", collections);
      }
    }
    console.log(collections)
  },
  ifcollect() {
    var collections = wx.getStorageSync("collections");
    var collection = collections.programs;
    var index = this.data.program.index;
    if (collection.indexOf(index) != -1)
      return 1;
    return 0;
  },
  dataprocess() {
    var program = this.data.program;
    var block1labels = ["方向", "水平", "学习方式", "学习语言", "科目"]
    var block2labels = ["免费学习的可能性", "长度", "学习费用", "学习地点",]
    var block3labels = ["方案保管人", "电话", "E-mail"]
    var logo = this.findlogo(program.enschoolname)
    this.setData({
      logo: logo
    })
    var block1 = [];
    var block2 = [];
    var block3 = [];
    for (var j = 0; j < program.info.length; j++) {
      for (var u = 0; u < block1labels.length; u++) {
        if (program.info[j].label == block1labels[u]) {
          block1.push(program.info[j])
          block1labels[u] = "finished"
        }
      }
      for (var u = 0; u < block2labels.length; u++) {
        if (program.info[j].label == block2labels[u]) {
          block2.push(program.info[j])
          block2labels[u] = "finished"
        }
      } for (var u = 0; u < block3labels.length; u++) {
        if (program.info[j].label == block3labels[u]) {
          block3.push(program.info[j])
          block3labels[u] = "finished"
        }
      }
    }
    block2.push({ "label": "所在学校", "answer": this.data.program.schoolname });
    console.log("1", block1);
    console.log("2", block2);
    console.log("3", block3);
    this.setData({
      proname: program.name,
      block1: block1,
      block2: block2,
      block3: block3
    })
  },
  // onUnload() {
  //   if (this.data.ifupdata == 1) {
  //     var pages = getCurrentPages();
  //     console.log("len");
  //     if (pages.length > 1) {
  //       var prevPage = pages[pages.length - 2];
  //       var info = prevPage.data;
  //       console.log("onload", info);
  //       console.log("prevPage", prevPage);
  //       prevPage.directChange(this.data.ifcollected)
  //     }

  //   }
  // },
  findlogo(enname) {
    var schoolpics = wx.getStorageSync("schoolpics");
    for (var i = 0; i < schoolpics.length; i++) {
      if (schoolpics[i].enname == enname) { return schoolpics[i].logo; }
    }
  },
  switch(e) {
    var name = e.currentTarget.dataset.name;
    var schools = this.data.schools;
    var id;
    for (var i = 0; i < schools.length; i++) {
      if (schools[i].name == name) {
        id = schools[i]._id;
        break;
      }
    }
    if (id) {
      wx.navigateTo({
        url: "../oneschool/index/index?school_id=" + id
      })
    }
  },
  kefu() {
    var collections = wx.getStorageSync('collections')
    if (collections && collections.openid) {
      var pro = this.data.program
      wx.navigateTo({
        url: '../../my/contact/contact?index=0&carry=' + pro.schoolname + '-' + pro.name,
      })
    }
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'error'
      })
    }
  },
})
