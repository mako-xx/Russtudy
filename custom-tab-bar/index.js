// custom-tab-bar/index.js
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
    //tabBar页面数据
    tabList: [
      {
      "pagePath": "pages/home/home",
      "text": "首页"
    }, {
      "pagePath": "pages/school/index/school",
      "text": "学校"
    }, {
      "pagePath": "pages/life/life",
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
      let selected= this.data.selected;
  
      if(selected !== key){
       this.setData({
         selected:key
       });
       wx.switchTab({
         url: `/${tabList[key].pagePath}`,
       })
      }
  },
  
  }
})
