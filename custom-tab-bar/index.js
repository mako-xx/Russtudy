// // custom-tab-bar/index.js
// Component({
//   /**
//    * 组件的属性列表
//    */
//   properties: {

//   },

//   /**
//    * 组件的初始数据
//    */
//   data: {
//     //当前高亮项
//     selected: 0,
//     //tabBar页面数据
//     tabList: [
//       {
//         "pagePath": "pages/home/home",
//         "text": "首页"
//       },
//       {
//         "pagePath": "pages/school/index/school",
//         "text": "选学校"
//       },
//       {
//         "pagePath": "pages/life/life",
//         "text": "生活"
//       },
//       {
//         "pagePath": "pages/my/my",
//         "text": "我的"
//       }
//     ]
//   },

//   /**
//    * 组件的方法列表
//    */
//   methods: {
//     switchTab(e) {
//       let key = Number(e.currentTarget.dataset.index);
//       let tabList = this.data.tabList;
//       let selected = this.data.selected;
//       if (selected !== key) {
//         this.setData({
//           selected: key
//         });
//         wx.switchTab({
//           url: `/${tabList[key].pagePath}`,
//           success: res => {
//             console.log("success")
//           },
//           fail: res => {
//             console.log("fail")
//           }
//         })
//       }
//     },

//   }
// })
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    //当前高亮项
    selected: 0,
    select1: 'unselect',
    select2: 'unselect',
    //图标
    icon_college: 'https://wx2.sinaimg.cn/mw690/008qNTbqly1h3mv29fql8j306z05kdfq.jpg',
    icon_life: 'https://wx4.sinaimg.cn/mw690/008qNTbqly1h3mv3e0x4mj305k05k3yd.jpg',
    //tabBar页面数据
    tabList: [
      {
        "pagePath": "pages/home/home",
        "text": "首页"
      }, {
        "pagePath": "pages/school/index/school",
        "text": "学校"
      }, {
        "pagePath": "pages/application/index/index",
        "text": "申请"
      }, {
        "pagePath": "pages/life/index/index",
        "text": "生活"
      }, {
        "pagePath": "pages/my/my",
        "text": "我的"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      let key = Number(e.currentTarget.dataset.index);
      let tabList = this.data.tabList;
      let selected = this.data.selected;
      if (selected !== key) {
        this.setData({
          selected: key
        });
        wx.switchTab({
          url: `/${tabList[key].pagePath}`,
        })
      }
      if(selected == 1){
        this.setData({
          icon_college: 'https://wx2.sinaimg.cn/mw690/008qNTbqly1h3mv29avz4j306z05kdfs.jpg',         
        })
      } else{
        this.setData({
          icon_college: 'https://wx2.sinaimg.cn/mw690/008qNTbqly1h3mv29fql8j306z05kdfq.jpg',          
        })
      }
      if(selected == 3){
        this.setData({
          icon_life: 'https://wx4.sinaimg.cn/mw690/008qNTbqly1h3mv3e6wecj305k05kq2u.jpg',          
        })
      }else{
        this.setData({
          icon_life: 'https://wx4.sinaimg.cn/mw690/008qNTbqly1h3mv3e0x4mj305k05k3yd.jpg',
        })
      }
    },

  }
})