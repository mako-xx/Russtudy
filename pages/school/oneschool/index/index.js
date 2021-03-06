import * as echarts from '../../ec-canvas/echarts';

const app = getApp()
const db = wx.cloud.database()

Page({
  dataprocess() {
    var school = this.data.school;
    var schoolpics = this.data.schoolpics;
    var describe = school.describe;
    var index;
    for (index = 0; index < schoolpics.length; index++) {
      if (schoolpics[index].enname == school.enname)
        break;
    }
    var pics = schoolpics[index]
    var pic = pics.pic
    var logo = pics.logo
    var synthesize = school.synthesize;
    var labels = [];
    var findfirsttable;
    var tableindex = 0;
    for (var i = 0; i < synthesize.length; i++) {
      var pair = synthesize[i];
      if (pair.table) {
        pair.type = "more";
        if (findfirsttable)
          pair.state = 1//0为无附表，1为有附表但未展开，2为有附表且展开
        else {
          pair.state = 2;
          findfirsttable = pair.table;
          tableindex = i;
        }
      }
      else {
        pair.type = "nomore";
        pair.state = 0
      }
      var len = Math.ceil((pair.label.length + (pair.num.length + 1) / (1.3) + 2) / 3)//瞎几把写的，用来计算该标签长度的权重
      pair.len = len;
      labels.push(pair)
    }
    this.setData({
      table: findfirsttable,
      tableindex: tableindex,
      describe: describe,
      pic: pic,
      labels: labels,
    })
    var labnav = school.labnav;
    var preparein = [{ "name": "准备", "img": "https://wx3.sinaimg.cn/mw2000/0085wEMdly1h2dezwzkwrj31hc0u0npd.jpg" }, { "name": "宿舍", "img": "https://wx4.sinaimg.cn/mw2000/0085wEMdly1h2dezulqmoj30sl0gudj0.jpg" }, { "name": "排名", "img": "https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2deztziwoj31kw11ykjl.jpg" }, { "name": "教育项目", "img": "https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2dezuv331j30rs0ijtbr.jpg" }, { "name": "留学生环境条件", "img": "https://wx3.sinaimg.cn/mw2000/0085wEMdly1h2dezucbo6j30xc0m8n0g.jpg" }, { "name": "院系", "img": "https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2dezx812aj30xc0m80uy.jpg" }];
    var cards = [];
    for (var i = 0; i < preparein.length; i++) {
      if (school.labnav[preparein[i].name] == 1) {
        if (preparein[i].name == "准备") preparein[i].name = "预科室"
        cards.push(preparein[i])
      }
    }
    console.log(cards)
    this.setData({
      cards: cards
    })
    var rank = this.data.school.qs_rating;
    console.log(rank);
    var arr = [];
    var ylabel = [];
    for (var i = 0; i < rank.length; i++) {
      var one = {};
      one.name = rank[i].rate_num;
      var num = rank[i].rate_num;
      if (num.indexOf('-') != -1) {
        var top = parseInt(num.split('-')[1]);
        var botton = parseInt(num.split('-')[0]);
        var num = Math.round((top + botton) / 2)
      }
      one.value = num;
      arr.push(one);
      ylabel.push(rank[i].rate_year);
    }
    wx.setStorageSync("rank", arr);
    wx.setStorageSync("ylabel", ylabel);
    wx.setStorageSync("uni_name", this.data.school.name);

    var describe = school.describe;
    var text = [];
    for (var j = 0; j < describe.length; j++) {
      var t = describe[j];
      var put = {};
      if (t[0] == 'b') {
        put.value = t.substr(1);
        put.kind = "big";
      } else if (t[0] == 'n') {
        put.value = t.substr(1);
        put.kind = "blank";
      } else {
        put.value = t;
        put.kind = "normal";
      }
      text.push(put);
    }
    this.setData({
      describe: text
    })
    var short_describe = school.short_describe;
    var text = [];
    for (var j = 0; j < short_describe.length; j++) {
      var t = short_describe[j];
      var put = {};
      if (t[0] == 'b') {
        put.value = t.substr(1);
        put.kind = "big";
      } else if (t[0] == 'n') {
        put.value = t.substr(1);
        put.kind = "blank";
      } else {
        put.value = t;
        put.kind = "normal";
      }
      text.push(put);
    }
    this.setData({
      short_describe: text
    })
  },
  getschool() {
    var allschools = this.data.schools;
    var school = allschools[0];
    for (var i = 0; i < allschools.length; i++) {
      if (allschools[i]._id == this.data.school_id) {
        school = allschools[i];
        break;
      }
    }
    var iflove = this.data.collections.schools.indexOf(school._id)
    if (iflove == -1) iflove = 0
    else iflove = 1
    this.setData({
      school: school,
      iflove: iflove
    })
    if (school)
      wx.setStorageSync("school", school)
    console.log(this.data.school);

  },
  onLoad(options) {
    var intervalHeight = 10;
    var SearchHeight = 50;
    var windowHeight = (app.globalData.ktxWindowHeight) * app.globalData.pxToRpxScale;
    var topHeight = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale;
    var trueHeight = windowHeight;
    this.setData({
      windowHeight: windowHeight,
      topHeight: topHeight,
      trueHeight: trueHeight,
      intervalHeight: intervalHeight,
      SearchHeight: SearchHeight,
      school_id: options.school_id,
      loading: true,
      iflove: 0
    })
    var that = this
    this.setData({
      interval: setInterval(function () {
        console.log("interval in oneschool 调用一次");
        var schools = that.data.schools;
        var schoolpics = that.data.schoolpics;
        var collections = that.data.collections;
        if (!schools) {
          schools = wx.getStorageSync('schools');
        }
        if (!schoolpics) {
          schoolpics = wx.getStorageSync('schoolpics');
        }
        if (!collections) {
          collections = wx.getStorageSync('collections');
        }
        that.setData({
          schools: schools,
          schoolpics: schoolpics,
          collections: collections
        })
        if (that.data.schools && that.data.collections) {
          console.log("interval in oneschool 调用完成", that.data.schools)
          that.getschool();
          that.dataprocess();
          that.setData({
            loading: false
          })
          console.log(that.data.loading);
          clearInterval(that.data.interval)

        }
      }, 1000)
    })

  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  clicklabel(e) {
    var labels = this.data.labels;
    labels[this.data.tableindex].state = 1;
    var index = e.target.dataset.value;

    labels[index].state = 2;
    this.setData({
      tableindex: index,
      table: this.data.labels[index].table,
      labels: labels
    })
  },
  clickcard(e) {
    var gotoname = e.currentTarget.dataset.value
    if (gotoname == "预科室") {
      wx.navigateTo({
        url: '../preparatory/preparatory',
      })
    } else if (gotoname == "宿舍") {
      wx.navigateTo({
        url: '../dorm/dorm',
      })
    } else if (gotoname == "排名") {
      wx.navigateTo({
        url: '../rank/rank',
      })
    } else if (gotoname == "教育项目") {
      wx.navigateTo({
        url: '../programs/programs?schoolname=' + this.data.school.name,
      })
    } else if (gotoname == "留学生环境条件") {
      wx.navigateTo({
        url: '../condition/condition',
      })
    } else if (gotoname == "院系") {
      wx.navigateTo({
        url: '../faculty/faculty',
      })
    }
    var index;
    var cards = this.data.cards;
    for (index = 0; index < cards.length; index++) {
      if (cards[index].name == gotoname) break;
    }
    if (index != cards.length) {
      wx.setStorageSync("backPic", cards[index].img);
    }
  },
  clicklove(e) {
    var iflove = this.data.iflove
    iflove = 1 - iflove;
    this.setData({
      iflove: iflove
    })
    // var pages = getCurrentPages();   //当前页面
    // if (pages.length > 1) {
    //   var prevPage = pages[pages.length - 2];   //上个页面
    // }
    // prevPage.changeStorUni(this.data.school._id)
    var collections = wx.getStorageSync("collections")
    this.setData({
      collections: collections
    })
  },
  onUnload() {
    var pages = getCurrentPages();
    var schoolcollections = this.data.collections.schools;
    if (pages.length > 1) {
      var prevPage = pages[pages.length - 2];
      var info = prevPage.data;
      var simpleschools = info.simpleschools
      for (var i = 0; i < simpleschools.length; i++) {
        if (schoolcollections.indexOf(simpleschools[i].id) != -1) simpleschools[i].ifcollected = 1;
        else simpleschools[i].ifcollected = 0;
      }
      prevPage.setData({
        iffrash: 0,
        simpleschools: simpleschools,
        collections: this.data.collections
      })
    }
  }
})
