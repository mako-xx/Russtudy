const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    citylist: [{ "name": "全部", "checked": true }, { "name": "莫斯科", "checked": false }, { "name": "圣彼得堡", "checked": false }, { "name": "喀山", "checked": false }, { "name": "符拉迪沃斯托克", "checked": false }],
    toplist: [{ "name": "全部", "index": 0 }, { "name": "商科", "index": 1 }, { "name": "工科", "index": 2 }, { "name": "理科", "index": 3 }, { "name": "文科", "index": 4 }],
    // src: ['https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2e188mpn7j30rs0ijn1l.jpg', 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e187stc7j30ws0kathf.jpg', 'https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2e18a31bsj31kw11ykjl.jpg', 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e188bymfj313d0mvwiq.jpg'],
    selectlist: [{ "name": "所在城市", "type": "0", "mode": "sel_city" }, { "name": "所在学校", "type": "0", "mode": "sel_sch" }, { "name": "学习方向", "type": "0", "mode": "sel_dir" }, { "name": "科目", "type": "0", "mode": "sel_sub" }, { "name": "学习方式", "type": "0", "mode": "sel_way" }, { "name": "学习语言", "type": "0", "mode": "sel_lau" }],
    load: true
  },
  onLoad() {
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight - app.globalData.navigationHeight) * app.globalData.pxToRpxScale;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight,
      WinWidth: app.globalData.ktxWindowWidth * app.globalData.pxToRpxScale
    })
    var that = this
    this.setData({
      interval: setInterval(function () {
        console.log("interval in programs调用一次");
        if (!that.data.allprograms) {
          var allprograms1 = wx.getStorageSync('programs1');
          var allprograms2 = wx.getStorageSync('programs2');
          var allprograms3 = wx.getStorageSync('programs3');
          var schools = wx.getStorageSync("schools");
          if (allprograms1 && allprograms2 && allprograms3 && schools) {
            var allprograms = allprograms1;
            allprograms.concat(allprograms2);
            allprograms.concat(allprograms3);

            that.setData({
              allprograms: allprograms,
              selectedprograms: allprograms,
              schools: schools,
              showprograms: []
            })

          }

          if (that.data.allprograms) {
            console.log("interval in programs调用结束");
            that.beginprocess();
            that.initcitylabels();
            that.initdirectionlabels();
            that.initotherlabels();
            console.log("interval in  programs完成数据处理");
            // if (that.data.collectLib != 1) {
            //   // that.pushMore();
            //   console.log("interval in programs完成push");
            // }
            // else if (that.data.collectLib == 1) { that.repick() }
            clearInterval(that.data.interval)
          }
        }
      }, 1000)
    })
  },

  //获得筛选标签
  beginprocess() {

    //获得城市-学校对应表
    var schools = this.data.schools;
    // console.log("sch", schools)
    var city_uni = [];
    var _;
    for (var i = 0; i < schools.length; i++) {
      var _city = schools[i].city;
      var _name = schools[i].name;
      var _id = schools[i]._id;
      var find = 0;
      for (var j = 0; j < city_uni.length; j++) {
        if (city_uni[j].city == _city) {
          find = 1;
          city_uni[j].schools.push({ "name": _name, "id": _id });
          break;
        }
      }
      if (find == 0) {
        var dic = { "city": _city, "schools": [{ "name": _name, "id": _id }] }
        city_uni.push(dic)
      }
    }
    city_uni.sort(function (a, b) { return b.schools.length - a.schools.length })
    // console.log("city_uni", city_uni)
    this.setData({
      city_uni: city_uni
    })



    var subject_direction = [{ "name": "全部", "directions": [] }, { "name": "工科", "directions": ["信息安全", "信息学和计算机技术"] }, { "name": "理科", "directions": ["数学和力学", "心理科学"] }, { "name": "文科", "directions": ["法律学", "语言学和文艺学"] }, { "name": "商科", "directions": ["经济和管理"] }]
    this.setData({
      subject_direction: subject_direction
    })
    // console.log(this.data.subject_direction)

    var programs = this.data.allprograms;
    // console.log("dp", programs)
    var processed = [];
    var level = ["所有"]
    var directions = ["所有"]
    var subjects = [["所有"]]
    var mode = ["所有"]
    var language = ["所有"]
    var schoolnames = ["所有"]

    for (var i = 0; i < programs.length; i++) {
      var index = -1;
      for (var j = 0; j < programs[i].info.length; j++) {
        //产生筛选选项
        if (programs[i].info[j].label == "水平" && level.indexOf(programs[i].info[j].answer) == -1) {
          level.push(programs[i].info[j].answer);
        }
        var index;
        if (programs[i].info[j].label == "方向") {
          index = directions.indexOf(programs[i].info[j].answer);
          if (index == -1) {
            directions.push(programs[i].info[j].answer);
            subjects.push(["所有"]);
            index = directions.length - 1;
          }

        }
        if (index != -1 && programs[i].info[j].label == "科目" && subjects[index].indexOf(programs[i].info[j].answer) == -1) {
          // console.log(programs[i])
          subjects[index].push(programs[i].info[j].answer);
        }
        if (programs[i].info[j].label == "学习方式") {
          var ways = programs[i].info[j].answer.split(",");
          for (var t = 0; t < ways.length; t++) {
            if (mode.indexOf(ways[t]) == -1) {
              mode.push(ways[t]);
            }
          }
        }
        if (programs[i].info[j].label == "学习语言") {
          var languages = programs[i].info[j].answer.split(",");
          for (var t = 0; t < languages.length; t++) {
            if (language.indexOf(languages[t]) == -1) {
              language.push(languages[t]);
            }
          }
        }
      }
      var name = programs[i].schoolname;
      if (schoolnames.indexOf(name) == -1) {
        schoolnames.push(name);
      }
      // processed.push(this.dataprocess(programs[i]))
    }
    // console.log(subjects)
    // this.getlovelist();
    this.setData({
      levels: level,
      levelindex: 0,
      directions: directions,
      directionindex: 0,
      subjects: subjects,
      subjectindex: 0,
      modes: mode,
      modeindex: 0,
      languages: language,
      languageindex: 0,
      schoolnames: schoolnames
    })


  },
  initcitylabels() {
    //获取初始的所有城市和学校
    var city_uni = this.data.city_uni
    var citylist = [{ "name": "全部", "checked": true }];
    var schoollist = [{ "name": "全部", "checked": true }];
    for (var i = 0; i < city_uni.length; i++) {
      var dic = { "name": city_uni[i].city, "checked": true };
      for (var j = 0; j < city_uni[i].schools.length; j++) {
        var sdic = { "name": city_uni[i].schools[j].name, "checked": true };
        schoollist.push(sdic)
      }
      citylist.push(dic)
    }
    this.setData({
      citylist: citylist,
      schoollist: schoollist
    })
  },
  initdirectionlabels() {
    //获取初始的所有学习方向和科目
    var directions = this.data.directions;
    var subjects = this.data.subjects;
    var directionlist = [{ "name": "全部", "checked": true }];
    var subjectlist = [{ "name": "全部", "checked": true }];
    for (var i = 1; i < directions.length; i++) {
      var dic = { "name": directions[i], "checked": true };
      for (var j = 1; j < subjects[i].length; j++) {
        var sdic = { "name": subjects[i][j], "checked": true };
        subjectlist.push(sdic)
      }
      directionlist.push(dic)
    }
    this.setData({
      subjectlist: subjectlist,
      directionlist: directionlist
    })
  },
  initotherlabels() {
    var modes = this.data.modes;
    var languages = this.data.languages;
    var learnwaylist = [{ "name": "全部", "checked": true }];
    var languagelist = [{ "name": "全部", "checked": true }];
    for (var i = 1; i < modes.length; i++) {
      var dic = { "name": modes[i], "checked": true };
      learnwaylist.push(dic)
    }
    for (var i = 1; i < languages.length; i++) {
      var dic = { "name": languages[i], "checked": true };
      languagelist.push(dic)
    }
    this.setData({
      learnwaylist: learnwaylist,
      languagelist: languagelist
    })
  },
  getcitylist() {

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
    var index = e.currentTarget.dataset.id;
    var directionnamelist = this.data.subject_direction[index].directions;
    var directionlist = [{ "name": "全部", "checked": true }]
    var subjectlist = [{ "name": "全部", "checked": true }]
    console.log("alldir", this.data.directions)
    console.log("allsub", this.data.subjects)
    for (var i = 0; i < directionnamelist.length; i++) {
      var index = this.data.directions.indexOf(directionnamelist[i])
      if (index != -1) {
        console.log("index", index);
        var dic = { "name": directionnamelist[i], "checked": true };
        directionlist.push(dic);
        for (var j = 0; j < this.data.subjects[index].length; j++) {
          if (this.data.subjects[index][j] != "所有") {
            subjectlist.push({ "name": this.data.subjects[index][j], "checked": true });
          }
        }
      } else {
        console.log("没找到", directionnamelist[i])
      }
    }
    console.log("sub", subjectlist)
    // console.log("dir", directionlist)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50,
      directionlist: directionlist,
      subjectlist: subjectlist
    })
  },
  hideModal(e) {
    var mode = this.data.mode;
    this.setData({
      modalName: null
    })
    if (mode == 'sel_city') {
      this.setData({
        citylist: this.data.sel_list
      })
    } else if (mode == 'sel_sch') {
      this.setData({
        schoollist: this.data.sel_list
      })
    } else if (mode == 'sel_dir') {
      this.setData({
        directionlist: this.data.sel_list
      })
    } else if (mode == 'sel_sub') {
      this.setData({
        subjectlist: this.data.sel_list
      })
    } else if (mode == 'sel_way') {
      this.setData({
        learnwaylist: this.data.sel_list
      })
    } else if (mode == 'sel_lau') {
      this.setData({
        languagelist: this.data.sel_list
      })
    }
  },
  showModal(e) {
    var mode = e.currentTarget.dataset.mode
    this.setData({
      modalName: e.currentTarget.dataset.target,
      mode: mode
    })

    if (mode == 'sel_city') {
      this.setData({
        sel_list: this.data.citylist
      })
    } else if (mode == 'sel_sch') {
      this.setData({
        sel_list: this.data.schoollist
      })
    } else if (mode == 'sel_dir') {
      this.setData({
        sel_list: this.data.directionlist
      })
    } else if (mode == 'sel_sub') {
      this.setData({
        sel_list: this.data.subjectlist
      })
    } else if (mode == 'sel_way') {
      this.setData({
        sel_list: this.data.learnwaylist
      })
    } else if (mode == 'sel_lau') {
      this.setData({
        sel_list: this.data.languagelist
      })
    }
  },
  clickcheck(e) {
    var sel_list = this.data.sel_list
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      for (var i = 1; i < sel_list.length; i++) {
        sel_list[i].checked = !sel_list[0].checked;
      }
      sel_list[0].checked = !sel_list[0].checked;

    } else {
      sel_list[index].checked = !sel_list[index].checked;
      var checkall = sel_list[1].checked;
      for (var i = 1; i < sel_list.length; i++) {
        if (sel_list[i].checked != checkall) {
          checkall = null;
          break;
        }
      }
      console.log(checkall)
      if (checkall) {
        sel_list[0].checked = checkall;
      } else {
        sel_list[0].checked = false;
      }
    }
    this.setData({
      sel_list: sel_list
    })
  }
})