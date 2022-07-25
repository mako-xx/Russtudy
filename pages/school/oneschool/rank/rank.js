import * as echarts from '../../../../ec-canvas/echarts';

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
    var HeadBar = (app.globalData.ktxStatusHeight + app.globalData.navigationHeight) * app.globalData.pxToRpxScale
    var ShowHeight = (app.globalData.ktxWindowHeight - app.globalData.ktxStatusHeight - app.globalData.navigationHeight) * app.globalData.pxToRpxScale;
    this.setData({
      HeadBar: HeadBar,
      ShowHeight: ShowHeight,
      backheight: app.globalData.backheight
    })
    if (!this.data.backheight) {
      console.log('in')
      console.log(this.data.backheight)
      var that = this
      let query = wx.createSelectorQuery()
      query.select('#main-back').boundingClientRect((rect) => {
        let height = rect.height * app.globalData.pxToRpxScale
        console.log("hei", height, app.globalData.pxToRpxScale)
        var backheight = (height + 2 * 30);
        that.setData({
          backheight: backheight
        })
        getApp().globalData.backheight = backheight
      }).exec()
    }
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
  }

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
      inverse: true
      // data: [0.9000, 0.9200, 0.9400, 0.9600, 0.9800, 1.0000],// 只有type为category时才有效
    }
  };

  chart.setOption(option);
  return chart;
}
