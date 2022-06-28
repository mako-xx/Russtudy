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
    allownavigate: 1,
    // src: ['https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2e188mpn7j30rs0ijn1l.jpg', 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e187stc7j30ws0kathf.jpg', 'https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2e18a31bsj31kw11ykjl.jpg', 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2e188bymfj313d0mvwiq.jpg'],
    subject_direction: [{ "name": "全部", "directions": [] },

    { "name": "工科", "directions": ["信息安全", "信息学和计算机技术", "电子、无线电技术和通讯系统", "建筑学", "工程系统管理", "光电，仪器仪表，光电和生物技术系统和技术", "地面交通技术和工艺学", "航空和火箭和空间技术", "物理技术科学和工艺学", "核能与核技术", "化学技术", "工业生态与生物技术", "机械制造", "工艺领域安全和自然设备安装", "电力和热力工程学", "计算机和信息学", "纳米技术和纳米材料", "应用地质学、矿业、石油天然气业和测量学", "材料工艺学", "航空导航和火箭和空间技术操作", "农业，林业和渔业", "基础医学"] },

    { "name": "理科", "directions": ["数学和力学", "心理科学", "教育和师范科学", "物理学和天文学", "化学", "生物科学"] },

    { "name": "文科", "directions": ["法律学", "语言学和文艺学", "历史学和考古学", "政治学和区域学", "媒体和出版业", "美术和应用艺术", "社会学和社会工作", "社会学和社会工作", "哲学、伦理学和宗教学", "教育和师范科学", "心理科学", "文化学和社会文化计划", "艺术史", "神学"] },

    { "name": "商科", "directions": ["经济和管理", "服务和旅游"] },
    { "name": "体育", "directions": ["体育与运动"] }
    ],
    intervaltime1: 0
  },
  onLoad(options) {
    var school_id = options.school_id;
    console.log("here")
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
    // if (school_id) {

    //   var selectlist = that.data.selectlist;
    //   for (var j = 0; j < selectlist.length; j++) {
    //     if (selectlist[j].mode == "sel_sch") {
    //       selectlist[j].type = 0;
    //       break;
    //     }
    //   }
    //   that.setData({
    //     selectlist: selectlist
    //   })
    // }
    // if (options.lookcollect == 1) {
    //   var selectlist = that.data.selectlist;
    //   selectlist[6].type = 0;
    //   that.setData({
    //     selectlist: selectlist
    //   })
    // }
    this.setData({
      interval: setInterval(function () {
        console.log("interval in programs调用一次");
        that.setData({
          intervaltime1: that.data.intervaltime1 + 1
        })
        if (that.data.intervaltime1 > 3) { console.log("加载失败"); clearInterval(that.data.interval); }
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
            that.getunisch()
            // that.beginprocess();
            that.repick1();
            that.getshow();
            // if (school_id) {
            //   that.changeschoollabels(school_id);
            //   that.repick();
            // } else if (options.lookcollect == 1)
            //   that.repick();
            // else
            //   that.pushMore();
            console.log("interval in  programs完成数据处理");
            wx.hideLoading();
            clearInterval(that.data.interval)
          }
        }

      }, 1000)
    })


  },
  setselect(selectedprograms) {
    var len = selectedprograms.length;
    var selectedprograms1;
    var selectedprograms2;
    var selectedprograms3
    // for (var i = 0; i < len; i++) {
    //   selectedprograms[i].rank = selectedprograms[i].schoolrank + parseInt(Math.random() * (20 + 2) - 2)
    //   while (selectedprograms[i].rank <= 0) selectedprograms[i].rank = selectedprograms[i].schoolrank + parseInt(Math.random() * (4 + 3) - 3);
    // }

    // selectedprograms.sort(function (a, b) { return a.rank - b.rank })
    if (len > 5) {
      len = len - 5;
      var one = parseInt(len / 3);
      var two = parseInt((2 * len) / 3);
      selectedprograms1 = selectedprograms.slice(0, one);
      selectedprograms2 = selectedprograms.slice(one, two + 5);
      selectedprograms3 = selectedprograms.slice(two + 5, len + 5);
    }
    else {
      selectedprograms1 = [];
      selectedprograms3 = [];
      selectedprograms2 = selectedprograms;
    }


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
  // //获得筛选标签
  // beginprocess() {

  //   //获得城市-学校对应表
  //   var schools = this.data.schools;
  //   var city_uni = [];
  //   var _;
  //   for (var i = 0; i < schools.length; i++) {
  //     var _city = schools[i].city;
  //     var _name = schools[i].name;
  //     var _id = schools[i]._id;
  //     var find = 0;
  //     for (var j = 0; j < city_uni.length; j++) {
  //       if (city_uni[j].city == _city) {
  //         find = 1;
  //         city_uni[j].schools.push({ "name": _name, "id": _id });
  //         break;
  //       }
  //     }
  //     if (find == 0) {
  //       var dic = { "city": _city, "schools": [{ "name": _name, "id": _id }] }
  //       city_uni.push(dic)
  //     }
  //   }
  //   city_uni.sort(function (a, b) { return b.schools.length - a.schools.length })
  //   this.setData({
  //     city_uni: city_uni
  //   })



  //   var subject_direction = this.data.subject_direction

  //   var programs = this.getallpro();
  //   var processed = [];
  //   var level = ["所有"]
  //   var directions = ["所有"]
  //   var subjects = [["所有"]]
  //   var mode = ["所有"]
  //   var language = ["所有"]
  //   var schoolnames = ["所有"]
  //   for (var i = 0; i < programs.length; i++) {
  //     var index = -1;
  //     for (var j = 0; j < programs[i].info.length; j++) {
  //       //产生筛选选项
  //       if (programs[i].info[j].label == "水平" && level.indexOf(programs[i].info[j].answer) == -1) {
  //         level.push(programs[i].info[j].answer);
  //       }
  //       var index;
  //       if (programs[i].info[j].label == "方向") {
  //         index = directions.indexOf(programs[i].info[j].answer);
  //         if (index == -1) {
  //           directions.push(programs[i].info[j].answer);
  //           subjects.push(["所有"]);
  //           index = directions.length - 1;
  //         }

  //       }
  //       if (index != -1 && programs[i].info[j].label == "科目" && subjects[index].indexOf(programs[i].info[j].answer) == -1) {
  //         subjects[index].push(programs[i].info[j].answer);
  //       }
  //       if (programs[i].info[j].label == "学习方式") {
  //         var ways = programs[i].info[j].answer.split(",");
  //         for (var t = 0; t < ways.length; t++) {
  //           if (mode.indexOf(ways[t]) == -1 && ways[t] != '') {
  //             mode.push(ways[t]);
  //           }
  //         }
  //       }
  //       if (programs[i].info[j].label == "学习语言") {
  //         var languages = programs[i].info[j].answer.split(",");
  //         for (var t = 0; t < languages.length; t++) {
  //           if (language.indexOf(languages[t]) == -1 && languages[t] != '') {
  //             language.push(languages[t]);
  //           }
  //         }
  //       }
  //     }
  //     var name = programs[i].schoolname;
  //     if (schoolnames.indexOf(name) == -1) {
  //       schoolnames.push(name);
  //     }
  //     // processed.push(this.dataprocess(programs[i]))
  //   }
  //   this.setData({
  //     levels: level,
  //     levelindex: 0,
  //     directions: directions,
  //     directionindex: 0,
  //     subjects: subjects,
  //     subjectindex: 0,
  //     modes: mode,
  //     modeindex: 0,
  //     languages: language,
  //     languageindex: 0,
  //     schoolnames: schoolnames
  //   })


  // },
  dataprocess(program) {
    var newpro = {}
    newpro["name"] = program.name
    newpro["enschoolname"] = program.enschoolname
    newpro["schoolname"] = program.schoolname
    newpro["rank"] = program.rank
    newpro["logo"] = this.findlogo(newpro["enschoolname"])
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
  findlogo(enname) {
    var schoolpics = wx.getStorageSync("schoolpics");
    for (var i = 0; i < schoolpics.length; i++) {
      if (schoolpics[i].enname == enname) { return schoolpics[i].logo; }
    }
  },
  getallpro() {
    return this.data.allprograms1.concat(this.data.allprograms2).concat(this.data.allprograms3)
  },
  getselectpro() {
    return this.data.selectedprograms1.concat(this.data.selectedprograms2).concat(this.data.selectedprograms3)
  },
  //获得符合筛选信息后得到的
  repick1: function () {
    var questions = wx.getStorageSync("questions");
    var processed = [];
    var allprograms = this.getallpro();
    console.log(allprograms, questions)
    var selectedprograms = []
    for (var i = 0; i < allprograms.length; i++) {
      var infos = allprograms[i].info;

      var conform = 0;

      //对方向进行筛选
      conform = 0;
      for (var y = 0; y < questions.li.length; y++) {
        var index;
        // console.log(infos,questions.li)
        for (index = 0; index < infos.length; index++) {

          if (infos[index].label == '方向' && infos[index].answer.split(',').indexOf(questions.li[y]) != -1) {
            conform = 1;
            break;
          }
        }
        if (conform == 1)
          break;
      }
      if (conform == 0) { continue; }
      selectedprograms.push(allprograms[i])
    }
    selectedprograms.sort(function (a, b) { return b.fakerank - a.fakerank })
    console.log("selectedprograms", selectedprograms);
    this.setselect(selectedprograms)
    this.setData({
      unblank: false,
      searching: 0
    })
  },
  getshow() {
    var selectedprograms1 = this.data.selectedprograms1;
    console.log("selectedprograms1", selectedprograms1)
    var show1 = [];
    for (var i = 0; i < 20; i++) {
      var pro = selectedprograms1[i];
      console.log(pro)
      var cityname = this.getcity(pro.schoolname)
      console.log(cityname)
    }
  },
  // pushMore(e) {
  //   var processed = this.data.showprograms;
  //   var len = this.data.showprograms.length
  //   var selectedprograms = this.data.selectedprograms1.concat(this.data.selectedprograms2).concat(this.data.selectedprograms3)
  //   var checkfinish = 0;
  //   if (Math.min(selectedprograms.length, len + 10) == selectedprograms.length) checkfinish = 1;
  //   for (var i = len; i < Math.min(selectedprograms.length, len + 10); i++) {
  //     var simpro = selectedprograms[i]

  //     processed.push(this.dataprocess(simpro))

  //   }
  //   var unblank;
  //   if (processed.length != 0) {
  //     unblank = true;
  //   } else {
  //     unblank = false;
  //   }
  //   this.setData({
  //     showprograms: processed,
  //     unblank: unblank,
  //     searching: 0,
  //     checkfinish: checkfinish
  //   })
  // },
  learnmore: function (e) {
    if (this.data.allownavigate) {
      this.setData({
        allownavigate: 0
      })
      var that = this
      var index = e.currentTarget.dataset.value;
      var selectedprograms = this.getselectpro();
      var giveProgram = selectedprograms[index]
      console.log("giveProgram", giveProgram, this)
      this.setData({
        giveProgram: giveProgram,
        indexinlist: index
      })
      wx.navigateTo({
        url: '../oneprogram/programs',
      })
    } else {
      console.log("not allowed")
    }
  },
  //获得筛选标签
  getunisch() {

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
    // console.log(city_uni)
    this.setData({
      city_uni: city_uni
    })
  },
  getcity(uniname) {
    var city_uni = this.data.city_uni;
    var i;
    for (i = 0; i < city_uni.length; i++) {
      var find = 0;
      for (var j = 0; j < city_uni[i].schools.length; j++) {
        if (city_uni[i].schools[j] == uniname) {
          find = 1;
          break;
        }
      }
      if (find == 1) break;
    }
    return city_uni[i].city;
  }


})