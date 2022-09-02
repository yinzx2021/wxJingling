import * as echarts from '../../ec-canvas/echarts';
var WxAutoImage = require('../../js/wxAutoImageCal.js');

Page({
  sendEmail(){
    wx.cloud.callFunction(
      {name:"sendEmail",
      data:{
        concent_info:getApp().globalData.mailConent
      },
      success(res){
        console.log("ok",res)
      },
      fail(res){
        console.log("false",res)
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },

  data: {
    deviceid:'',
    list:[],
    img_intro:'',
    imgsrc:'',
    daycount:'',
    uvcount:'',
    vv:'',
    ecBar: {
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getBarOption());

        return barChart;
      }
    },

    ecPie: {
      onInit: function (canvas, width, height, dpr) {
        const pieChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(pieChart);
        pieChart.setOption(getPieOption());
        return pieChart;
      }
    },
    ecLine:{
      onInit: function (canvas, width, height, dpr) {
        const lineChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(lineChart);
        lineChart.setOption(getLineOption());
        return lineChart;
      }
    }
  },
  onReady() {
  }
});


function getBarOption() {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    backgroundColor: "#aaaaaa",
    title: {
      text: '24小时喷出',
      left: 'center'
    },
    legend: {
      data: ['日光', '紫外偏振', '红外'],
      x:'center',
      y:'bottom',
      orient: 'horizontal',
      padding:0
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 20,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '日光',
        type: 'bar',
        label: {
          normal: {
            show: false,
            position: 'inside'
          }
        },
        data: getApp().globalData.record.当日日光喷出次数
      },
      {
        name: '紫外偏振',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false
          }
        },
        data: getApp().globalData.record.紫外喷出次数
      },
      {
        name: '红外',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: false,
            position: 'left'
          }
        },
        data: getApp().globalData.record.红外喷出次数保留
      }
    ]
  };
}

function getPieOption() {
  return {
    backgroundColor: "#ffffff",
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['20%', '40%'],
      data: [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
      }]
    }]
  };
}
function getLineOption() {
  return {
    title: {
      text: '24小时流速',
      left: 'center'
    },
    backgroundColor: "#aaaaaa",
    legend: {
      data: ['A', 'B', 'C'],
      top: 50,
      left: 'center',
      backgroundColor: 'red',
      z: 100,
      show:false
    },
    grid: {
      containLabel: true,
      left: '3%', //默认10%
      right: '4%', //默认10%
      bottom: '8%', //默认60
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['0', '1', '2', '3', '4', '5', '6','7', '8', '9', '10','11', '12', '13', '14', '15', '16','17', '18', '19', '20','21', '22', '23'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      max:20,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      label: {
        normal: {
          show: false,
          position: 'left'
        }
      },
      data: getApp().globalData.record.当日24小时流速
    }, ]
  };
}