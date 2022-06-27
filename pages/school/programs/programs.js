const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    topIndex: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    citylist: [{ "name": "全部", "checked": true }, { "name": "莫斯科", "checked": false }, { "name": "圣彼得堡", "checked": false }, { "name": "喀山", "checked": false }, { "name": "符拉迪沃斯托克", "checked": false }],
    toplist: [{ "name": "全部", "index": 0 }, { "name": "商科", "index": 1 }, { "name": "工科", "index": 2 }, { "name": "理科", "index": 3 }, { "name": "文科", "index": 4 }],
    // src: ['https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2e188mpn7j30rs0ijn1l.jpg', 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e187stc7j30ws0kathf.jpg', 'https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2e18a31bsj31kw11ykjl.jpg', 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e188bymfj313d0mvwiq.jpg'],
    selectlist: [{ "name": "所在城市", "type": 1, "mode": "sel_city" }, { "name": "所在学校", "type": 1, "mode": "sel_sch" }, { "name": "学习方向", "type": 1, "mode": "sel_dir" }, { "name": "科目", "type": 1, "mode": "sel_sub" }, { "name": "学习方式", "type": 1, "mode": "sel_way" }, { "name": "学习语言", "type": 1, "mode": "sel_lau" }, { "name": "我的收藏", "type": 1, "mode": "sel_col" }],
    load: true,
    subject_direction: [{ "name": "全部", "directions": [] },

    { "name": "工科", "directions": ["信息安全", "信息学和计算机技术", "电子、无线电技术和通讯系统", "建筑学", "工程系统管理", "光电，仪器仪表，光电和生物技术系统和技术", "地面交通技术和工艺学", "航空和火箭和空间技术", "物理技术科学和工艺学", "核能与核技术", "化学技术", "工业生态与生物技术", "机械制造", "工艺领域安全和自然设备安装", "电力和热力工程学", "计算机和信息学", "纳米技术和纳米材料", "应用地质学、矿业、石油天然气业和测量学", "材料工艺学", "航空导航和火箭和空间技术操作", "农业，林业和渔业", "基础医学"] },

    { "name": "理科", "directions": ["数学和力学", "心理科学", "教育和师范科学", "物理学和天文学", "化学", "生物科学"] },

    { "name": "文科", "directions": ["法律学", "语言学和文艺学", "历史学和考古学", "政治学和区域学", "媒体和出版业", "美术和应用艺术", "社会学和社会工作", "社会学和社会工作", "哲学、伦理学和宗教学", "教育和师范科学", "心理科学", "文化学和社会文化计划", "艺术史", "神学"] },

    { "name": "商科", "directions": ["经济和管理", "服务和旅游"] },
    { "name": "体育", "directions": ["体育与运动"] }
    ]
  },
  onLoad(options) {
    var school_id = options.school_id;
    wx.showLoading({  // 显示加载中loading效果 
      title: "加载中",
      mask: true  //开启蒙版遮罩
    });
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight) * app.globalData.pxToRpxScale;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight,
      WinWidth: app.globalData.ktxWindowWidth * app.globalData.pxToRpxScale
    })
    var that = this
    if (school_id) {

      var selectlist = that.data.selectlist;
      for (var j = 0; j < selectlist.length; j++) {
        if (selectlist[j].mode == "sel_sch") {
          selectlist[j].type = 0;
          break;
        }
      }
      that.setData({
        selectlist: selectlist
      })
    }
    if (options.lookcollect == 1) {
      var selectlist = that.data.selectlist;
      selectlist[6].type = 0;
      that.setData({
        selectlist: selectlist
      })
    }
    this.setData({
      interval: setInterval(function () {
        console.log("interval in programs调用一次");
        if (!that.data.allprograms) {
          var allprograms1 = wx.getStorageSync('programs1');
          var allprograms2 = wx.getStorageSync('programs2');
          var allprograms3 = wx.getStorageSync('programs3');
          var schools = wx.getStorageSync("schools");
          var collections = wx.getStorageSync("collections");
          if (allprograms1 && allprograms2 && allprograms3 && schools && collections) {
            that.setData({
              allprograms1: allprograms1,
              schools: schools,
              showprograms: [],
              collections: collections
            })
            that.setData({
              allprograms2: allprograms2,
            })
            that.setData({
              allprograms3: allprograms3,
            })
            that.setselect(allprograms1.concat(allprograms2).concat(allprograms3))
          }

          if (that.data.allprograms1 && that.data.allprograms2 && that.data.allprograms3 && that.data.collections) {
            console.log("interval in programs调用结束");
            that.beginprocess();
            that.initcitylabels();
            that.initdirectionlabels();
            that.initotherlabels();
            if (school_id) {
              that.changeschoollabels(school_id);
              that.repick();
            } else if (options.lookcollect == 1)
              that.repick();
            else
              that.pushMore();
            console.log("interval in  programs完成数据处理");
            that.setData({
              finish1: true
            })
            clearInterval(that.data.interval)
          }
        }
        if (that.data.finish1 && that.data.finish2) wx.hideLoading();
      }, 1000),
      interval2: setInterval(function () {
        console.log("interval2调用一次", that.data.mainheadheight)
        let query = wx.createSelectorQuery()
        query.select('#main-headscroll').boundingClientRect((rect) => {
          var height = rect.height //* app.globalData.pxToRpxScale;
          that.setData({
            mainheadheight: height
          })
        }).exec()
        if (that.data.mainheadheight) {
          console.log("获取到mainheadheight", that.data.mainheadheight)
          that.setData({
            finish2: true
          })
          clearInterval(that.data.interval2)
        }
        if (that.data.finish1 && that.data.finish2) wx.hideLoading();
      }, 1000)
    })


  },
  setselect(selectedprograms) {
    var len = selectedprograms.length;
    // for (var i = 0; i < len; i++) {
    //   selectedprograms[i].rank = selectedprograms[i].schoolrank + parseInt(Math.random() * (20 + 2) - 2)
    //   while (selectedprograms[i].rank <= 0) selectedprograms[i].rank = selectedprograms[i].schoolrank + parseInt(Math.random() * (4 + 3) - 3);
    // }

    // selectedprograms.sort(function (a, b) { return a.rank - b.rank })
    var one = parseInt(len / 3);
    var two = parseInt((2 * len) / 3);
    var selectedprograms1 = selectedprograms.slice(0, one);
    var selectedprograms2 = selectedprograms.slice(one, two);
    var selectedprograms3 = selectedprograms.slice(two, len);
    this.setData({
      selectedprograms1: selectedprograms1,
    })
    this.setData({
      selectedprograms2: selectedprograms2,
    })
    this.setData({
      selectedprograms3: selectedprograms3,
    })
  },
  //获得筛选标签
  beginprocess() {

    //获得城市-学校对应表
    var schools = this.data.schools;
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
    this.setData({
      city_uni: city_uni
    })



    var subject_direction = this.data.subject_direction

    var programs = this.getallpro();
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
          subjects[index].push(programs[i].info[j].answer);
        }
        if (programs[i].info[j].label == "学习方式") {
          var ways = programs[i].info[j].answer.split(",");
          for (var t = 0; t < ways.length; t++) {
            if (mode.indexOf(ways[t]) == -1 && ways[t] != '') {
              mode.push(ways[t]);
            }
          }
        }
        if (programs[i].info[j].label == "学习语言") {
          var languages = programs[i].info[j].answer.split(",");
          for (var t = 0; t < languages.length; t++) {
            if (language.indexOf(languages[t]) == -1 && languages[t] != '') {
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
  changeschoollabels(school_id) {
    var schools = this.data.schools;
    var schoollist = this.data.schoollist;
    var name;
    for (var i = 0; i < schools.length; i++) {
      if (schools[i]._id == school_id) {
        name = schools[i].name;
        break;
      }
    }
    if (name) {

      for (var i = 0; i < schoollist.length; i++) {
        if (schoollist[i].name != name) schoollist[i].checked = false;
      }
    } else { "name未知" }
    this.setData({
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

  toggle(e) {
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
    wx.showLoading({  // 显示加载中loading效果 
      title: "加载中",
      mask: true  //开启蒙版遮罩
    });
    var index = e.currentTarget.dataset.id;
    this.setData({
      topIndex: index
    })
    var directionnamelist = this.data.subject_direction[index].directions;
    if (!index) {
      for (var i = 1; i < this.data.subject_direction.length; i++) {
        for (var j = 0; j < this.data.subject_direction[i].directions.length; j++)
          directionnamelist.push(this.data.subject_direction[i].directions[j])
      }
    }
    console.log("directionnamelist", directionnamelist)
    var directionlist = [{ "name": "全部", "checked": true }]
    var subjectlist = [{ "name": "全部", "checked": true }]
    for (var i = 0; i < directionnamelist.length; i++) {
      var z = this.data.directions.indexOf(directionnamelist[i])
      if (z != -1) {
        var dic = { "name": directionnamelist[i], "checked": true };
        directionlist.push(dic);
        for (var j = 0; j < this.data.subjects[z].length; j++) {
          if (this.data.subjects[z][j] != "所有") {
            subjectlist.push({ "name": this.data.subjects[z][j], "checked": true });
          }
        }
      } else {
        console.log("没找到", directionnamelist[i])
      }
    }
    // console.log("dir", directionlist)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50,
      directionlist: directionlist,
      subjectlist: subjectlist
    })
    if (index == 0) {
      this.initdirectionlabels()
    }
    var wantdirection = this.data.subject_direction[index].directions
    var directions = this.data.directions;

    var directionlist = [{ "name": "全部", "checked": true }];
    var subjects = this.data.subjects;
    var subjectlist = [{ "name": "全部", "checked": true }];
    for (var i = 0; i < wantdirection.length; i++) {
      var z = directions.indexOf(wantdirection[i]);
      if (z != -1) {
        var dic = { "name": wantdirection[i], "checked": true }
        directionlist.push(dic)
        for (var j = 1; j < subjects[z].length; j++) {
          var sdic = { "name": subjects[z][j], "checked": true };
          subjectlist.push(sdic)
        }
      }
    }
    this.setData({
      directionlist: directionlist,
      subjectlist: subjectlist
    })
    this.setData({
      sel_list: this.data.directionlist
    })
    this.updateSel("sel_dir")


    this.setData({
      sel_list: this.data.subjectlist
    })
    this.updateSel("sel_sub");
    this.repick();
    wx.hideLoading();
  },
  updateSel(mode) {
    var sel_list = this.data.sel_list;
    var index;

    var selectlist = this.data.selectlist;
    for (index = 0; index < selectlist.length; index++) {
      if (selectlist[index].mode == mode) break;
    }
    if (index == selectlist.length) console.log("wrong");
    var type;
    if (sel_list.length <= 1) {
      type = 1;
      sel_list[0].checked = true;
    } else {
      var _ = sel_list[1].checked;
      var out = 0;
      for (var i = 1; i < sel_list.length; i++) {
        if (_ != sel_list[i].checked) {
          type = 0;
          out = 1;
          sel_list[0].checked = false;
          break;
        }
      }
      if (out == 0) {
        sel_list[0].checked = _;
        if (_ == true) {
          type = 1;
        } else {
          type = -1;
        }
      }
    }
    selectlist[index].type = type;
    this.setData({
      selectlist: selectlist,
      sel_list: sel_list
    })
    return type
  },
  hideModal(e) {
    var mode = this.data.mode;
    if (this.data.modalName) {
      var type = this.updateSel(mode);
      if (type == -1) {
        wx.showToast({
          "title": "请勾选至少一项",
          "icon": "error",
          duration: 2000
        })
        return
      }
    }


    wx.showLoading({  // 显示加载中loading效果 
      title: "加载中",
      mask: true  //开启蒙版遮罩
    });
    this.setData({
      modalName: null
    })
    if (mode == 'sel_city') {
      this.setData({
        citylist: this.data.sel_list
      })
      var citylist = this.data.citylist;
      var city_uni = this.data.city_uni
      var schoollist = [{ "name": "全部", "checked": true }];

      for (var i = 1; i < citylist.length; i++) {
        if (citylist[i].checked == true) {
          var city = citylist[i].name;
          var index;
          for (index = 0; index < city_uni.length; index++) {
            if (city_uni[index].city == city) break;
          }
          if (index != city_uni.length) {
            for (var j = 0; j < city_uni[index].schools.length; j++) {
              var sdic = { "name": city_uni[index].schools[j].name, "checked": true };
              schoollist.push(sdic)
            }
          } else { console.log("out range") }
        }
      }
      this.setData({
        schoollist: schoollist
      })
    } else if (mode == 'sel_sch') {
      this.setData({
        schoollist: this.data.sel_list
      })
    } else if (mode == 'sel_dir') {
      this.setData({
        directionlist: this.data.sel_list
      })
      var directionlist = this.data.directionlist;
      var subjects = this.data.subjects;
      // console.log("sub", subjects);
      var subjectlist = [{ "name": "全部", "checked": true }];
      var directions = this.data.directions;
      // console.log('dir', directionlist);
      for (var i = 1; i < directionlist.length; i++) {
        if (!directionlist[i].checked) break;
        var z = directions.indexOf(directionlist[i].name);
        if (z != -1) {
          for (var j = 1; j < subjects[z].length; j++) {
            var sdic = { "name": subjects[z][j], "checked": true };
            subjectlist.push(sdic)
          }
        }
      }
      console.log('list', subjectlist)
      this.setData({
        subjectlist: subjectlist
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
    } else if (mode == 'sel_col') {
      var selectlist = this.data.selectlist;
      selectlist[6].type = 1 - selectlist[6].type;
      this.setData({
        selectlist: selectlist
      })
    }
    this.repick();
    wx.hideLoading();
  },
  showModal(e) {
    var mode = e.currentTarget.dataset.mode
    var name = e.currentTarget.dataset.name
    if (mode != 'sel_col')
      this.setData({
        modalName: e.currentTarget.dataset.target,
      })
    this.setData({
      mode: mode,
      sel_name: name
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
    } else if (mode == 'sel_col') {
      this.setData({
        modalName: null,
      })
      this.hideModal();
    }
  },
  clickcheck(e) {
    var sel_list = this.data.sel_list
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      var back = !sel_list[0].checked;
      for (var i = 0; i < sel_list.length; i++) {
        sel_list[i].checked = back;
      }
    } else {
      sel_list[index].checked = !sel_list[index].checked;
      var checkall = true;
      for (var i = 1; i < sel_list.length; i++) {
        if (sel_list[i].checked != true) {
          checkall = false;
          break;
        }
      }
      sel_list[0].checked = checkall;

    }
    this.setData({
      sel_list: sel_list
    })
  },
  checkq: function () {
    var list = this.data.sel_list;
    list[0].checked = !list[0].checked;
    if (list[0].checked) {
      for (var i = 1; i < list.length; i++) {
        var item = list[i];
        item.checked = true
        // list.splice(i,1,item)
      }
    } else {
      for (var i = 1; i < list.length; i++) {
        var item = list[i];
        item.checked = false
        // list.splice(i,1,item)
      }
    }
    this.setData({
      sel_list: list
    })
  },
  chlik: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.sel_list;
    var item = list[index];
    item.checked = !item.checked;
    // list.splice(index,1,item)

    var qb = 0
    for (var i = 1; i < list.length; i++) {
      if (list[i].checked) {
        qb++
      }
    }
    if (qb === list.length - 1) {
      list[0].checked = true
    } else {
      list[0].checked = false
    }
    this.setData({
      sel_list: list
    })
  },
  dataprocess(program) {
    var newpro = {}
    newpro["name"] = program.name
    newpro["enschoolname"] = program.enschoolname
    newpro["schoolname"] = program.schoolname
    newpro["rank"] = program.rank
    const city_uni = this.data.city_uni;
    for (var i = 0; i < city_uni.length; i++) {
      var j;
      for (j = 0; j < city_uni[i].schools.length; j++) {
        // console.log("gg", city_uni[i].schools[j].name, program.schoolname)
        if (city_uni[i].schools[j].name == program.schoolname) {
          newpro["city"] = city_uni[i].city;
          newpro["schoolid"] = city_uni[i].schools[j].id;
          break;
        }
      }
      if (j != city_uni[i].schools.length) {
        break;
      }
    }
    newpro["index"] = program.index
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
  getallpro() {
    return this.data.allprograms1.concat(this.data.allprograms2).concat(this.data.allprograms3)
  },
  getselectpro() {
    return this.data.selectedprograms1.concat(this.data.selectedprograms2).concat(this.data.selectedprograms3)
  },
  //获得符合筛选信息后得到的
  repick: function () {
    this.setData({
      searching: 1
    })
    var selectlist = this.data.selectlist;
    var processed = [];
    var allprograms = this.getallpro();
    var selectedprograms = []

    const learnwaylist = this.data.learnwaylist;
    const subjectlist = this.data.subjectlist;
    const schoollist = this.data.schoollist;
    const languagelist = this.data.languagelist;
    const collections = this.data.collections;
    const collpros = collections.programs;
    const ifshowcol = selectlist[6].type;
    console.log(selectlist, ifshowcol)
    for (var i = 0; i < allprograms.length; i++) {
      var infos = allprograms[i].info;

      var conform = 1;
      // //根据收藏状态筛选
      if (!ifshowcol) {

        if (collpros.indexOf(allprograms[i].index) == -1) continue;
      }
      //对学习方式进行筛选
      conform = 0;
      for (var y = 1; y < learnwaylist.length; y++) {
        if (learnwaylist[y].checked == true) {
          var index;
          for (index = 0; index < infos.length; index++) {
            if (infos[index].label == '学习方式' && infos[index].answer.split(',').indexOf(learnwaylist[y].name) != -1) {
              conform = 1;
              break;
            }

          }
          if (conform == 1)
            break;
        }
      }
      if (conform == 0) { continue; }

      //对学习语言进行筛选
      conform = 0;
      for (var y = 1; y < languagelist.length; y++) {
        if (languagelist[y].checked == true) {
          var index;
          for (index = 0; index < infos.length; index++) {
            if (infos[index].label == '学习语言' && infos[index].answer.split(',').indexOf(languagelist[y].name) != -1) {
              conform = 1;
              break;
            }

          }
          if (conform == 1)
            break;
        }
      }
      if (conform == 0) { continue; }

      //对学校进行筛选
      conform = 0;
      for (var y = 1; y < schoollist.length; y++) {
        if (schoollist[y].checked == true && allprograms[i].schoolname == schoollist[y].name) {

          conform = 1;
          // console.log(allprograms[i].schoolname)
          break;
        }
      }
      if (conform == 0) { continue; }

      //对科目进行筛选
      conform = 0;
      for (var y = 1; y < subjectlist.length; y++) {
        if (subjectlist[y].checked == true) {
          var index;
          for (index = 0; index < infos.length; index++) {
            if (infos[index].label == '科目' && infos[index].answer.split(',').indexOf(subjectlist[y].name) != -1) {
              conform = 1;
              break;
            }
          }
          if (conform == 1)
            break;
        }
      }
      if (conform == 0) { continue; }
      selectedprograms.push(allprograms[i])
    }
    this.setselect(selectedprograms)
    this.setData({
      showprograms: [],
      unblank: false,
      topNum: 0,
      searching: 0
    })
    this.pushMore();
  },
  pushMore(e) {
    var processed = this.data.showprograms;
    var len = this.data.showprograms.length
    var selectedprograms = this.data.selectedprograms1.concat(this.data.selectedprograms2).concat(this.data.selectedprograms3)
    var checkfinish = 0;
    if (Math.min(selectedprograms.length, len + 10) == selectedprograms.length) checkfinish = 1;
    for (var i = len; i < Math.min(selectedprograms.length, len + 10); i++) {
      var simpro = selectedprograms[i]

      processed.push(this.dataprocess(simpro))

    }
    var unblank;
    if (processed.length != 0) {
      unblank = true;
    } else {
      unblank = false;
    }
    this.setData({
      showprograms: processed,
      unblank: unblank,
      searching: 0,
      checkfinish: checkfinish
    })
  },
  learnmore: function (e) {
    var index = e.currentTarget.dataset.value;
    var selectedprograms = this.getselectpro();
    var giveProgram = selectedprograms[index]
    this.setData({
      giveProgram: giveProgram,
      indexinlist: index
    })
    wx.navigateTo({
      url: '../oneprogram/programs'
    })
  },
})