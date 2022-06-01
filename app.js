
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
    // 获取openid等登录信息，对应的代码在cloudfunctions/getInformation/index.js下
    wx.cloud.callFunction({
      name: 'getInformation',
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    // 展示本地存储能力
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



    const provalue1 = wx.getStorageSync('programs1')
    var programs1 = provalue1
    if (!programs1) {
      console.log("缓存获取programs1失败,进行数据库查询");
      var allvalue;
      db.collection("programs").limit(5).get()
        .then(res => {
          allvalue = res
          programs1 = [];
          for (var i = 0; i < allvalue.data.length; i++)
            programs1 = programs1.concat(allvalue.data[i].programs)
          console.log("programs1完成", programs1);
          wx.setStorageSync('programs1', programs1)
        })
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
          for (var i = 0; i < allvalue.data.length; i++)
            programs2 = programs2.concat(allvalue.data[i].programs)
          console.log("programs2完成", programs2);
          wx.setStorageSync('programs2', programs2)
        })
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
          for (var i = 0; i < allvalue.data.length; i++)
            programs3 = programs3.concat(allvalue.data[i].programs)
          console.log("programs3完成", programs3);
          wx.setStorageSync('programs3', programs3)
        })
    }

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
            })
        })
    }



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
  getProgramDatas(db) {
    var value;
    var allprograms;
    db.collection("programs").get()
      .then(res => {
        value = res
        allprograms = value.data[0].programs
        console.log("allpro", allprograms);
        wx.setStorageSync('programs', allprograms)
      })
  }
})
