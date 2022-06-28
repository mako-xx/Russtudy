const app = getApp();
Page({
  data: {
    allownavigate: 1,
    currentId: 0,
    basicsList: [{
      icon: 'usefullfill',
      name: '选择专业'
    }, {
      icon: 'radioboxfill',
      name: '整理文件'
    }, {
      icon: 'roundclosefill',
      name: '通过竞争'
    }, {
      icon: 'roundcheckfill',
      name: '办理签证'
    },],
    basics: 0,
    numList: [{
      name: '选择专业'
    }, {
      name: '整理文件'
    }, {
      name: '通过竞争'
    }, {
      name: '办理签证'
    },],
    num: 0,
    scroll: 0
  },
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  onLoad() {
    var that = this;
    this.setData({
      interval2: setInterval(function () {
        let query = wx.createSelectorQuery()
        query.select('#main-title').boundingClientRect((rect) => {
          let height = rect.height * app.globalData.pxToRpxScale
          var titleheight = height;
          that.setData({
            titleheight: titleheight
          })
        }).exec()
        query.select('#main-steps').boundingClientRect((rect) => {
          let height = rect.height * app.globalData.pxToRpxScale
          var stepsheight = height;
          that.setData({
            stepsheight: stepsheight
          })
        }).exec()
        if (that.data.titleheight && that.data.stepsheight) clearInterval(that.data.interval2)
      }, 1000)
    })


  },
  onShow() {
    this.tabBar();
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight) * app.globalData.pxToRpxScale;
    var WinHeight = app.globalData.ktxWindowHeight * app.globalData.pxToRpxScale;
    this.setData({
      WinHeight: WinHeight,
      HeadBar: HeadBar,
      ShowHeight: ShowHeight
    })
    var that = this;
    this.setData({
      interval: setInterval(function () {
        console.log("interval in application 调用一次");
        var schools = wx.getStorageSync('schools');
        var collections = wx.getStorageSync('collections');
        var allprograms1 = wx.getStorageSync('programs1');
        var allprograms2 = wx.getStorageSync('programs2');
        var allprograms3 = wx.getStorageSync('programs3');
        if (allprograms1 && allprograms2 && allprograms3 && schools && collections) {
          that.setData({
            allprograms1: allprograms1,
            schools: schools,
            collections: collections
          })
          that.setData({
            allprograms2: allprograms2,
          })
          that.setData({
            allprograms3: allprograms3,
          })

        }
        if (that.data.allprograms1 && that.data.allprograms2 && that.data.allprograms3 && that.data.schools && that.data.collections) {
          console.log("interval in application 调用完成")
          that.getCollectList();
          var allprograms = allprograms1.concat(allprograms2).concat(allprograms3);
          var collection = that.data.collections.programs;
          var collectprograms = [];
          for (var i = 0; i < allprograms.length; i++) {
            if (collection.indexOf(allprograms[i].index) != -1) collectprograms.push(allprograms[i]);
          }
          that.setData({
            collectprograms: collectprograms,
            allprograms1: null,
            allprograms2: null,
            allprograms3: null
          })
          console.log(collectprograms);
          that.getshow();
          clearInterval(that.data.interval)
        }
      }, 1000)
    })

  },
  getshow() {
    var processed = [];
    var selectedprograms = this.data.collectprograms
    for (var i = 0; i < selectedprograms.length; i++) {
      var simpro = selectedprograms[i]

      processed.push(this.dataprocess(simpro))

    }
    var unblank;
    if (processed.length != 0) {
      unblank = true;
    } else {
      unblank = false;
    }
    console.log(processed)
    this.setData({
      showprograms: processed,
      unblank: unblank,
      searching: 0
    })
  },
  dataprocess(program) {
    var newpro = {}
    newpro["name"] = program.name
    newpro["enschoolname"] = program.enschoolname
    newpro["schoolname"] = program.schoolname
    newpro["rank"] = program.rank
    newpro["index"] = program.index
    newpro["logo"] = this.findlogo(newpro["enschoolname"])
    var allinfos = program.info
    var newinfo = []
    var labels = ["方向", "水平", "学习方式", "学习语言", "长度", "科目"]
    for (var i = 0; i < allinfos.length; i++) {
      for (var j = 0; j < labels.length; j++) {
        if (allinfos[i].label == labels[j]) {
          if (allinfos[i].label == '水平') newpro["level"] = allinfos[i].answer;
          newinfo.push(allinfos[i])
          labels[j] = "pass"
          break;
        }
      }

    }
    while (newinfo.length < 4) {
      newinfo.push({})
    }
    // var collectedPros = this.data.collection.programs;
    newpro["ifcollected"] = 0;
    // for (var i = 0; i < collectedPros.length; i++) {
    //   if (collectedPros[i] == program.index) {
    //     newpro["ifcollected"] = 1;
    //     break;
    //   }
    // }
    newpro["info"] = newinfo;
    return newpro
  },
  scrollSteps() {
    this.setData({
      scroll: this.data.scroll == 9 ? 0 : this.data.scroll + 1
    })
  },
  bindchange(e) {
    // console.log(e.detail.current)
    this.setData({
      num: e.detail.current
    })
  },
  clickitem(e) {
    // console.log(e.currentTarget.dataset.index)
    this.setData({
      num: e.currentTarget.dataset.index,
      currentId: e.currentTarget.dataset.index
    })
  },
  getCollectList() {
    var collections = wx.getStorageSync("collections");
    var schcollections = collections.schools;
    var schools = this.data.schools
    var CollectList = [];
    for (var j = 0; j < schcollections.length; j++) {
      for (var i = 0; i < schools.length; i++) {
        if (schools[i]._id == schcollections[j]) {
          var dic = {};
          dic.QS_all = schools[i].qs_rating[3].rate_num;
          dic.QS_dome = schools[i].qsdome;
          dic.name = schools[i].name;
          dic.logo = this.findlogo(schools[i].enname);
          dic.id = schools[i]._id;
          CollectList.push(dic)
        }
      }
    }
    this.setData({
      CollectList: CollectList
    })

  },
  findlogo(enname) {
    var schoolpics = wx.getStorageSync("schoolpics");
    for (var i = 0; i < schoolpics.length; i++) {
      if (schoolpics[i].enname == enname) { return schoolpics[i].logo; }
    }
  },
  kefu(e) {
    var pro = this.data.showprograms[e.currentTarget.dataset.value]
    wx.navigateTo({
      url: '../../my/contact/contact?index=0&carry=' + pro.schoolname + '-' + pro.name,
    })
  },
  learn_more(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../../school/oneschool/index/index?school_id=" + e.currentTarget.dataset.id
    })
  },
  learnmore: function (e) {

    if (this.data.allownavigate) {
      this.setData({
        giveProgram: giveProgram
      })
      var index = e.currentTarget.dataset.value;
      var selectedprograms = this.data.collectprograms
      var giveProgram = selectedprograms[index]
      console.log("giveProgram", giveProgram)
      this.setData({
        giveProgram: giveProgram,
        indexinlist: index,
        allownavigate: 0
      })
      wx.navigateTo({
        url: '../../school/oneprogram/programs',
      })
    } else {
      console.log("not allowed")
    }
    //   var index = e.currentTarget.dataset.value;
    //   var selectedprograms = this.data.collectprograms
    //   var giveProgram = selectedprograms[index]
    //   this.setData({
    //     giveProgram: giveProgram,
    //     indexinlist: index
    //   })
    //   wx.navigateTo({
    //     url: '../../school/oneprogram/programs'
    //   })
  }
})