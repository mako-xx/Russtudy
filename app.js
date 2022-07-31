
// app.js
App({
  globalData: {
  },
  onLaunch() {
    //建立云
    wx.cloud.init({
      traceUser: true,
      env: 'cloudtest-3g82y8a0d914b437'
    })
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        console.log(that.globalData.statusBarHeight);
      }
    })
    // 获取状态栏的高度
    wx.getSystemInfo({
      success: function (res) {
        // px转换到rpx的比例
        let pxToRpxScale = 750 / res.windowWidth;
        // 状态栏的高度
        let ktxStatusHeight = res.statusBarHeight;
        // 导航栏的高度
        let navigationHeight = 44;
        // window的宽度
        let ktxWindowWidth = res.windowWidth;
        // window的高度
        let ktxWindowHeight = res.windowHeight;
        // 屏幕的高度
        let ktxScreentHeight = res.screenHeight;
        that.globalData.pxToRpxScale = pxToRpxScale;
        that.globalData.ktxStatusHeight = ktxStatusHeight;
        that.globalData.navigationHeight = navigationHeight;
        that.globalData.ktxWindowWidth = ktxWindowWidth;
        that.globalData.ktxWindowHeight = ktxWindowHeight;
        that.globalData.ktxScreentHeight = ktxScreentHeight;
      }
    })

    that.globalData.moreimg = ['https://wx4.sinaimg.cn/mw2000/0085wEMdly1h2lwc4aqpaj305k05kmx0.jpg', 'https://wx1.sinaimg.cn/mw2000/0085wEMdly1h2lwc4eszlj305k05kmx6.jpg']
    that.globalData.collectimg = ['https://wx3.sinaimg.cn/mw2000/0085wEMdly1h2lwjkknyvj305k05kmx6.jpg', 'https://wx4.sinaimg.cn/mw2000/0085wEMdly1h2lwjkxwprj305k05k3yx.jpg']
    that.globalData.selectimg = ['https://wx4.sinaimg.cn/mw2000/0085wEMdly1h2lwjl5m50j305k05kjrc.jpg', 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2lwjl9itxj305k05kt8z.jpg']
    that.globalData.loveimg = ['https://wx4.sinaimg.cn/mw2000/0085wEMdly1h2lwjkq947j303m03kglp.jpg', 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2lwjkurjtj303m03k3yk.jpg']
    //获得所有项目
    const db = wx.cloud.database()



    var that = this;
    const schvalue = wx.getStorageSync('schools')
    var schools = schvalue
    if (!schools) {
      console.log("缓存获取schools失败,进行数据库查询");
      var allvalue;
      db.collection("school").get()
        .then(res => {
          allvalue = res
          schools = [];
          for (var i = 0; i < allvalue.data.length; i++)
            schools.push(allvalue.data[i])
          db.collection("school").skip(20).get()
            .then(res => {
              allvalue = res
              for (var i = 0; i < allvalue.data.length; i++)
                schools.push(allvalue.data[i])
              wx.setStorageSync('schools', schools)
              that.globalData.schools = schools;

              that.findprogram(schools, db);

            })
        })
    } else that.findprogram(schools, db)



    that.globalData.intervalID = setInterval(that.process, 1000)


    const citvalue = wx.getStorageSync('citys')
    var citys = citvalue
    if (!citys) {
      console.log("缓存citys获取失败,进行数据库查询");
      var allvalue;
      db.collection("city").get()
        .then(res => {
          allvalue = res.data
          wx.setStorageSync('citys', allvalue)
          console.log(citys);
          that.globalData.citys = citys;
        })
    }

    const messages = wx.getStorageSync('messages')
    var msg = messages
    if (!msg) {



      msg = [
        { "name": "中俄留学小助手", "school": "***", "pic": "https://wx3.sinaimg.cn/mw2000/008tQ72zly1h3mmxzu8taj30dz0ggq5x.jpg", "id": 0, "list": [] },
        // { "name": "Zamkox Kirill", "school": "新西伯利亚国立大学", "pic": "https://wx1.sinaimg.cn/mw2000/0085wEMdly1h3pk8eywfoj30u00u0tci.jpg", "degree": "管理学硕士", "id": 1, "list": [] },
        { "name": "Balobasov Roman", "school": "新西伯利亚国立大学", "pic": "https://wx1.sinaimg.cn/mw2000/0085wEMdly1h4nmlevqq5j30j80j9aak.jpg", "degree": "力学学士", "id": 1, "list": [] },
        { "name": "Trepezaev Egor", "school": "托木斯克国立大学", "pic": "https://wx4.sinaimg.cn/mw2000/0085wEMdly1h4nmle7zsnj30np0nqmy4.jpg", "degree": "法学博士", "id": 2, "list": [] },
        { "name": "杰斌", "school": "托木斯克国立大学", "pic": "https://wx1.sinaimg.cn/mw2000/0085wEMdly1h4nn1ojn2wj30u00u1dj8.jpg", "degree": "金融学博士", "id": 3, "list": [] },
        { "name": "Devlesupova Alina", "school": "莫斯科物理技术学院", "pic": "https://wx2.sinaimg.cn/mw2000/0085wEMdly1h4nmlefloqj30mz0n0ta0.jpg", "degree": "物理学硕士", "id": 4, "list": [] },
        { "name": "Irina Boginskaia", "school": "俄罗斯高等经济研究大学", "pic": "https://wx4.sinaimg.cn/mw2000/0085wEMdly1h4nmlepg49j30qo0qpq4e.jpg", "degree": "经济学学士", "id": 5, "list": [] },
        { "name": "Devlesupova Alina", "school": "俄罗斯人民友谊大学", "pic": "https://wx1.sinaimg.cn/mw2000/0085wEMdly1h4nmlf2dbrj30mr0msab8.jpg", "degree": "管理学硕士", "id": 6, "list": [] },]
      wx.setStorageSync('messages', msg)
      console.log(msg);
    }

    //获取城市图片
    const citypicvalue = wx.getStorageSync('citypics')
    var citypics = citypicvalue
    if (!citypics) {
      console.log("缓存citypics获取失败,进行数据库查询");
      var allcitypics;
      db.collection("citypic").get()
        .then(res => {
          allcitypics = res.data[0].pic
          wx.setStorageSync('citypics', allcitypics)
          that.globalData.citypics = citypics;
        })
    }

    //获取学校图片
    const schoolpicvalue = wx.getStorageSync('schoolpics')
    var schoolpics = schoolpicvalue
    if (!schoolpics) {
      console.log("缓存获取schoolpics失败,进行数据库查询");
      var allschoolpics;
      db.collection("schoolpic").get()
        .then(res => {
          console.log(res)
          allschoolpics = res.data[0].school
          wx.setStorageSync('schoolpics', allschoolpics)
          that.globalData.schoolpics = schoolpics;
          console.log("pics", schoolpics)
        })
    }


    //获得收藏内容
    try {
      const value = wx.getStorageSync('collections')
      var collection = value
      if (!collection) {
        console.log("缓存获取collection失败,进行数据库查询");
        collection = { "programs": [], "citys": [], "schools": [], "openid": '', "nicename": '' }
        wx.setStorageSync('collections', collection)
      } else if (collection.openid) {
        console.log("coll", collection)
        //每次登录时将上次产生的缓存更新放入云数据库
        const _ = db.command
        db.collection("user").where({
          _openid: collection.openid
        }).update({
          data: {
            citycollection: collection.citys,
            collegecollection: collection.schools,
            programecollection: collection.programs,
            nickname: collection.nickname
          },
          success: function (res) {
            console.log("更新缓存成功")
          },
          fail: function (res) {
            console.log("更新缓存失败")
          }
        })
      }
      that.globalData.collection = collection
    } catch (e) {
      console.log("出错", e)// Do something when catch error
    }
  },
  randn_bm() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
  },
  findprogram(schools, db) {
    var that = this;
    schools.sort(function (a, b) { return a.qsdome - b.qsdome });
    const provalue1 = wx.getStorageSync('programs1')
    var programs1 = provalue1
    if (!programs1) {
      console.log("缓存获取programs1失败,进行数据库查询");
      var allvalue;
      db.collection("programs").limit(5).get()
        .then(res => {
          allvalue = res
          programs1 = [];
          for (var i = 0; i < allvalue.data.length; i++) {
            var prs = allvalue.data[i].programs;
            var schname = prs[0].schoolname;
            var index;
            for (index = 0; index < schools.length; index++) {
              if (schools[index].name == schname) break;
            }
            var rank = schools[index].qsdome;
            var relativerank = parseInt(index / 3) + 1;
            for (var j = 0; j < prs.length; j++) {
              prs[j].schoolrank = rank;
              prs[j].relativerank = relativerank;
              var max = 2 * relativerank > 8 ? 2 * relativerank : 8;
              var move = that.randn_bm() * max - max / 2;
              prs[j].fakerank = relativerank - move;
              if (prs[j].fakerank < 0) prs[j].fakerank = relativerank + move;
              // if (relativerank <= 2) prs[j].fakerank = prs[j].fakerank + that.randn_bm() * 4.3;
              // console.log(prs[j].fakerank)
            }
            programs1 = programs1.concat(prs)
          }

          console.log("programs1完成", programs1);
          // wx.setStorageSync('programs1', programs1)
          that.globalData.programs1 = programs1;
          console.log(programs1)
        })
    } else {
      that.globalData.programs1 = programs1
      console.log(programs1)
    }

    const provalue2 = wx.getStorageSync('programs2')
    var programs2 = provalue2
    if (!programs2) {
      console.log("缓存获取programs2失败,进行数据库查询");
      var allvalue;
      db.collection("programs").skip(6).limit(5).get()
        .then(res => {
          allvalue = res
          programs2 = [];
          for (var i = 0; i < allvalue.data.length; i++) {
            var prs = allvalue.data[i].programs;
            var schname = prs[0].schoolname;
            var index;
            for (index = 0; index < schools.length; index++) {
              if (schools[index].name == schname) break;
            }
            var rank = schools[index].qsdome;
            var relativerank = parseInt(index / 3) + 1;
            for (var j = 0; j < prs.length; j++) {
              prs[j].schoolrank = rank;
              prs[j].relativerank = relativerank;
              var max = 2 * relativerank > 8 ? 2 * relativerank : 8;
              var move = that.randn_bm() * max - max / 2;
              prs[j].fakerank = relativerank - move;
              if (prs[j].fakerank < 0) prs[j].fakerank = relativerank + move;
              // if (relativerank <= 2) prs[j].fakerank = prs[j].fakerank + that.randn_bm() * 4.3;
              // console.log(prs[j].fakerank)
            }
            programs2 = programs2.concat(prs)
          }
          console.log("programs2完成", programs2);
          // wx.setStorageSync('programs2', programs2)
          that.globalData.programs2 = programs2;
        })
    } else {
      that.globalData.programs2 = programs2
    }

    const provalue3 = wx.getStorageSync('programs3')
    var programs3 = provalue3
    if (!programs3) {
      console.log("缓存获取programs3失败,进行数据库查询");
      var allvalue;
      db.collection("programs").skip(11).limit(5).get()
        .then(res => {
          allvalue = res
          programs3 = [];
          for (var i = 0; i < allvalue.data.length; i++) {
            var prs = allvalue.data[i].programs;
            var schname = prs[0].schoolname;
            var index;
            for (index = 0; index < schools.length; index++) {
              if (schools[index].name == schname) break;
            }
            var rank = schools[index].qsdome;
            var relativerank = parseInt(index / 3) + 1;
            for (var j = 0; j < prs.length; j++) {
              prs[j].schoolrank = rank;
              prs[j].relativerank = relativerank;
              var max = 2 * relativerank > 8 ? 2 * relativerank : 8;
              var move = that.randn_bm() * max - max / 2;
              prs[j].fakerank = relativerank - move;
              if (prs[j].fakerank < 0) prs[j].fakerank = relativerank + move;
              // if (relativerank <= 2) prs[j].fakerank = prs[j].fakerank + that.randn_bm() * 4.3;
              // console.log(prs[j].fakerank)
            }
            programs3 = programs3.concat(prs)
          }
          console.log("programs3完成", programs3);
          // wx.setStorageSync('programs3', programs3)
          that.globalData.programs3 = programs3;
        })
    } else {
      that.globalData.programs3 = programs3
    }
  },
  process() {
    console.log("interval in app调用一次");
    // console.log(this.globalData.programs1)
    console.log(this)
    if (this.globalData.programs1 && this.globalData.programs2 && this.globalData.programs3) {
      var allprograms = this.globalData.programs1.concat(this.globalData.programs2).concat(this.globalData.programs3);
      allprograms = allprograms.sort(function (a, b) { return a.fakerank - b.fakerank })
      console.log('allprograms', allprograms);
      var allprograms1 = allprograms.slice(0, parseInt(allprograms.length / 3));
      var allprograms2 = allprograms.slice(parseInt(allprograms.length / 3), parseInt(allprograms.length * 2 / 3));
      var allprograms3 = allprograms.slice(parseInt(allprograms.length * 2 / 3), allprograms.length);
      wx.setStorageSync('programs1', allprograms1)
      wx.setStorageSync('programs2', allprograms2)
      wx.setStorageSync('programs3', allprograms3)
      console.log("interval in app调用结束");

      clearInterval(this.globalData.intervalID);
    }
  }
})
