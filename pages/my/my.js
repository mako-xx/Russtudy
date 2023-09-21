// pages/home/home.js
const app = getApp();
const defaultAvatarUrl = 'https://wx2.sinaimg.cn/mw2000/0085wEMdly1h2q4mp6kluj305k05k3yi.jpg'
const mpserverless = app.globalData.mpserverless;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: defaultAvatarUrl,
        openid: "",
        nickname: "点击修改昵称",
        citycollection: {},
        collegecollection: {},
        programecollection: {},
        showModal: false,
        iflogin: false,
        holder: '请输入欲修改的姓名'
    },
    kefu() {
        var collections = wx.getStorageSync('collections')
        if (collections && collections.openid) {
            wx.navigateTo({
                url: '../my/contact/contact?index=0',
            })
        }
        else {
            wx.showToast({
                title: '请先登录',
                icon: 'error'
            })
        }
    },
    holder_disappear() {
        console.log('点击')
        this.setData({
            holder: ''
        })
    },
    holder_appear() {
        console.log('取消')
        this.setData({
            holder: '请输入欲修改的姓名'
        })
    },
    tabBar() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 4
            })
        }
    },
    /**
     * 控制显示
     */
    changeNickname: function () {
        var iflogin = this.data.iflogin
        if (iflogin)
            this.setData({
                showModal: true
            })
        else {
            wx.showToast({
                title: '点击头像登录',
                icon: 'error',
                duration: 1000
            })
        }
    },
    /**
      * 点击返回按钮隐藏
      */
    back: function () {
        this.setData({
            showModal: false
        })
    },
    /**
    * 获取input输入值
    */
    wish_put: function (e) {
        this.setData({
            textV: e.detail.value
        })
    },
    /**
    * 点击确定按钮获取input值并且关闭弹窗
    */
    formSubmit(e) {
        console.log(e)
        this.setData({
            showModal: false,
            nickname: e.detail.value.nickname
        })
        console.log("nickname", this.data.nickname)
        //将数据保存到本地
        var _user = wx.getStorageSync('collections');
        _user.nickname = this.data.nickname;
        console.log(this.data.nickname)
        wx.setStorageSync('collections', _user);
        // onslotchange.log("finish")
        //将数据保存至云端
        var collection = wx.getStorageSync("collections")
        console.log(collection)
        mpserverless.db.collection("user").where({
            _openid: collection.openid
        }).update({
            data: {
                nickname: collection.nickname
            }
        })
    },
    // //登录按钮兼头像更换
    onChooseAvatar(e) {
        console.log("获取头像", e)
        //获取头像
        const { avatarUrl } = e.detail
        this.setData({
            avatarUrl,
        })
        console.log("url", this)
        //将头像照片信息获取
        //
        wx.cloud.uploadFile({
            cloudPath: "avatar/" + this.data.openid + ".png",
            filePath: avatarUrl, // 文件路径
            success: res => {
                // get resource ID
                console.log(res.fileID)
            },
            fail: err => {
                // handle error
            }
        })
    },
    async login() {
        var nickname
        var avatarUrl
        if (this.data.iflogin == false) {
            // const info = await wx.getUserProfile({
            //   desc: '用于完善用户资料',
            // });

            // console.log("info", info)
            // // avatarUrl = info.userInfota.avarUrl
        } else {
            var collection = wx.getStorageSync("collections")
            mpserverless.db.collection("user").where({
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


        var that = this;
        //使用云函数获取用户openid
        wx.cloud.callFunction({
            name: 'getInformation',
        }).then(res => {
            console.log("res", res)
            that.setData({
                openid: res.result.openid,
                iflogin: true
            })
            //获取云数据库的用户信息
            console.log(that.data.openid)
            mpserverless.db.collection('user').where({
                _openid: that.data.openid
            }).find().then(res => {
                console.log("res", res)
                console.log("nick", nickname)
                //如果云数据库无用户信息
                if (res.data.length == 0) {
                    console.log("open", that.data.openid);
                    var collection = wx.getStorageSync("collections")
                    collection.openid = that.data.openid;
                    // if (nickname)
                    //   collection.nickname = nickname;
                    if (!collection) {
                        collection.citys = [];
                        collection.schools = [];
                        collection.programs = [];
                        collection.nickname = "";
                    }
                    that.setData({
                        nickname: nickname
                    })
                    console.log(that)
                    mpserverless.db.collection("user").add({
                        data: {
                            openid: collection.openid,
                            citycollection: collection.citys,
                            collegecollection: collection.schools,
                            programecollection: collection.programs,
                            nickname: nickname
                        },
                        success: function (res) {
                            console.log(res)
                            console.log("将缓存写入数据库成功")
                        },
                        fail: function (res) {
                            console.log("将缓存写入数据库失败")
                        }
                    })
                }
                else if (!res.data.length == 0) {
                    console.log(res.data[0].nickname)
                    var nick = res.data[0].nickname;
                    if (!nick) nick = nickname;
                    that.setData({
                        citys: res.data[0].citycollection,
                        schools: res.data[0].collegecollection,
                        programs: res.data[0].programecollection,
                        avatarurl: res.data[0].avatarurl,
                        nickname: res.data[0].nickname,
                    })
                    console.log("nick", that.data.nickname);
                    wx.setStorageSync('collections', {
                        openid: that.data.openid,
                        citys: that.data.citys,
                        schools: that.data.schools,
                        programs: that.data.programs,
                        avatarurl: that.data.avatarurl,
                        nickname: that.data.nickname,
                    })
                }
            })
        })
    },
    clean() {
        var that = this
        wx.showModal({
            content: '是否清空缓存',
            success: function (res) {
                if (res.confirm) {//这里是点击了确定以后
                    var collection = that.data.collections
                    mpserverless.db.collection("user").where({
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
                    // wx.clearStorageSync();
                    var collections = { "programs": [], "citys": [], "schools": [], "openid": '', "nickname": '' }
                    that.setData({
                        collections: collections,
                        avatarUrl: defaultAvatarUrl,
                        nickname: "点击修改昵称",
                        iflogin: false
                    })

                    wx.setStorageSync("collections", collections)

                    getApp().globalData.collection = collections
                    wx.showToast({
                        title: '清空缓存成功',
                        icon: 'success',
                        duration: 2000//持续的时间
                    })
                } else {//这里是点击了取消以后
                    console.log('用户点击取消')
                }
            }
        })
    },
    exit() {
        var that = this
        wx.showModal({
            content: '是否退出登录',
            success: function (res) {
                if (res.confirm) {//这里是点击了确定以后
                    var collection = that.data.collections
                    mpserverless.db.collection("user").where({
                        _openid: collection.openid
                    }).update({
                        data: {
                            citycollection: collection.citys,
                            collegecollection: collection.schools,
                            programecollection: collection.programs,
                            nickname: collection.nickname
                        },
                        success: function (res) {
                            console.log(collection)
                            console.log("更新缓存成功")
                        },
                        fail: function (res) {
                            console.log("更新缓存失败")
                        }
                    })
                    var collections = { "programs": [], "citys": [], "schools": [], "openid": '', "nickname": '' }
                    that.setData({
                        collections: collections,
                        avatarUrl: defaultAvatarUrl,
                        nickname: "点击修改昵称",
                        iflogin: false
                    })

                    wx.setStorageSync("collections", collections)

                    getApp().globalData.collection = collections
                    wx.showToast({
                        title: '退出成功',
                        icon: 'success',
                        duration: 2000//持续的时间
                    })
                } else {//这里是点击了取消以后
                    console.log('用户点击取消')
                }
            }
        })


    },
    switchcity() {
        wx.switchTab({
            url: '../life/index/index'
        });
    },
    switchschool() {
        wx.navigateTo({
            url: '../school/classify/classify?lookcollect=1'
        });
    },
    switchprogram() {
        wx.navigateTo({
            url: '../school/programs/programs?lookcollect=1'
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
        var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight) * app.globalData.pxToRpxScale;
        this.setData({
            HeadBar: HeadBar,
            ShowHeight: ShowHeight
        })
        var that = this
        this.setData({
            interval: setInterval(function () {
                console.log("interval in login 调用一次");
                var collections = that.data.collections;
                if (!collections) {
                    collections = wx.getStorageSync('collections');
                }
                if (collections.openid) {
                    console.log("here", collections.openid)
                    that.setData({
                        collections: collections,
                        avatarUrl: 'cloud://cloudtest-3g82y8a0d914b437.636c-cloudtest-3g82y8a0d914b437-1311354097/avatar/' + collections.openid + '.png',
                        openid: collections.openid,
                        nickname: collections.nickname,
                    })
                } else {
                    that.setData({
                        collections: collections,
                        avatarUrl: defaultAvatarUrl,
                        openid: collections.openid,
                        nickname: collections.nickname,
                    })
                }

                if (that.data.collections) {
                    console.log("interval in collections 调用完成", that.data.collections)
                    if (that.data.openid) {
                        that.setData({
                            iflogin: true
                        })
                    }
                    console.log("that.data.openid", that.data.openid)
                    clearInterval(that.data.interval)
                }
            }, 1000)
        })

        if (this.iflogin == true) {

        }
        this.tabBar();
    },
    about() {
        wx.showModal({
            content: 'RusStudy团队致力于为您提供最优异的留学体验',
            showCancel: false
        })
    }
})