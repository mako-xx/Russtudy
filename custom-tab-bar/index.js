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
    // selected: 0,
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
        "text": "学校",
        // "iconPath":
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
      console.log("key", key)
      let tabList = this.data.tabList;
      let selected = this.data.selected;
      if (selected !== key) {
        wx.switchTab({
          url: `/${tabList[key].pagePath}`,
          success: res => {
            selected = key
            console.log("sel", selected)
          }
        })
      }
    },

  }
})