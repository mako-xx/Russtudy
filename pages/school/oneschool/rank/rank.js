import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
Page({
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  data: {
    ec: {
      onInit: initChart,
    }
  },
  onLoad(options) {
    var intervalHeight = 10;
    var SearchHeight = 50;
    var windowHeight = (app.globalData.ktxWindowHeight) * app.globalData.pxToRpxScale;
    var topHeight = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale;
    var trueHeight = windowHeight - topHeight + SearchHeight + app.globalData.navigationHeight;//非导航栏页需加navigationHeight，非搜索栏页须加SearchHeight
    var scrollHeight = trueHeight - SearchHeight - 2 * intervalHeight;
    // var containerPercentage=100*app.globalData.ktxWindowHeight/app.globalData.ktxScreentHeight;
    // var statusBarHeightPercentage=100*(app.globalData.navigationHeight+app.globalData.ktxStatusHeight)/app.globalData.ktxWindowHeight;
    // var statusContainerHeightPercentage=100-statusBarHeightPercentage;
    console.log(app.globalData);
    this.setData({
      windowHeight: windowHeight,
      topHeight: topHeight,
      trueHeight: trueHeight,
      scrollHeight: scrollHeight,
      intervalHeight: intervalHeight,
      SearchHeight: SearchHeight,
      school_id: options.school_id
    })
    var backPic = wx.getStorageSync("backPic");
    this.setData({
      backPic: backPic
    })
    var uni_name = wx.getStorageSync("uni_name");
    this.setData({
      uni_name: uni_name
    })

  },
  onReady: function () {               //这一步是一定要注意的
    this.oneComponent = this.selectComponent('#mychart-dom-line');
  },
  getschool() {
    // var pages = getCurrentPages();   //当前页面
    // if (pages.length > 1) {
    //   var prevPage = pages[pages.length - 2];   //上个页面
    //   var school = prevPage.data.school;
    //   this.setData({
    //     school: school
    //   })
    // }
  },
  dataprocess() {
    // var rank = this.data.school.qs_rating;
    // console.log(rank);
    // var arr = [];
    // var ylabel = [];
    // for (var i = 0; i < rank.length; i++) {
    //   var one = {};
    //   one.name = rank[i].rate_num;
    //   var num = rank[i].rate_num;
    //   if (num.indexOf('-') != -1) {
    //     var top = parseInt(num.split('-')[1]);
    //     var botton = parseInt(num.split('-')[0]);
    //     var num = Math.round((top + botton) / 2)
    //   }
    //   one.value = num;
    //   arr.push(one);
    //   ylabel.push(rank[i].rate_year);
    // }
    // console.log(arr);
  },

});
function initChart(canvas, width, height, dpr) {
  var arr = wx.getStorageSync("rank")
  var ylabel = wx.getStorageSync("ylabel")
  var uni_name = wx.getStorageSync("uni_name")
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  console.log("arr", arr)
  let max = arr[0].value
  arr.forEach(item => max = item.value > max ? item.value : max)
  max = (Math.ceil(max / 50) + 1) * 50 > 1000 ? 1000 : (Math.ceil(max / 50) + 1) * 50;
  let min = arr[0].value
  arr.forEach(item => min = item.value < min ? item.value : min)
  min = (Math.floor(min / 50) - 1) * 50 < 0 ? 0 : (Math.floor(min / 50) - 1) * 50;
  var option = {
    title: {
      text: uni_name,
      left: 'center'
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ylabel,
      // show: false
    },
    series: [{
      name: uni_name,
      type: 'line',
      smooth: true,
      connectNulls: true,
      data: arr,

      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: "{b}",
            show: true,
            position: "top",
            textStyle: {
              fontWeight: "bolder",
              fontSize: "12",
              color: "#000"
            }
          }
        }
      }
    }],
    yAxis: {
      type: 'value',
      min: min,
      max: max,
      // data: [0.9000, 0.9200, 0.9400, 0.9600, 0.9800, 1.0000],// 只有type为category时才有效
    }
  };

  chart.setOption(option);
  return chart;
}
