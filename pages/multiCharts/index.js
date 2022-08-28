import * as echarts from '../../ec-canvas/echarts';
var WxAutoImage = require('../../js/wxAutoImageCal.js');
var columnChart = null;
var chartData = {
  main: {
      title: 'day',
      data: [1500, 2000, 2500, 1700,1500, 2000, 2500, 1700,1500, 2000, 2500, 1700,1500, 2000, 2500, 1700,1500, 2000, 2500, 1700,1500, 2000, 2500, 1700],
      categories: ['0', '1', '2', '3','4', '5', '6', '7','8','9', '10', '11', '12','13', '14', '15', '16','17', '18', '19', '20','21', '22', '23']
  },
  Uv: {
    title: 'uv',
    data: [150, 200, 250, 170,150, 200,250,170,150, 200, 250, 170,150, 200, 250, 170,150, 200,250, 170,150, 200, 250, 170],
    categories: ['0', '1', '2', '3','4', '5', '6', '7','8','9', '10', '11', '12','13', '14', '15', '16','17', '18', '19', '20','21', '22', '23']
},
  Vv: {
    title: 'vv',
    data: [15.0, 20.0, 25.0, 17.0,15.0, 20.0,25.0,17.0,15.0, 20.0, 25.0, 17.0,15.0, 20.0, 25.0, 17.0,15.0, 20.0,25.0, 17.0,15.0, 20.0, 25.0, 17.0],
    categories: ['0', '1', '2', '3','4', '5', '6', '7','8','9', '10', '11', '12','13', '14', '15', '16','17', '18', '19', '20','21', '22', '23']
}
}

Page({
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
      orient: 'horizontal'
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
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310]
      },
      {
        name: '紫外偏振',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220]
      },
      {
        name: '红外',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [20, 32, 21, 34, 90, 130, 110]
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
          show: true,
          position: 'left'
        }
      },
      data: [18, 36, 65, 30, 78, 40, 33,18, 36, 65, 30, 78, 40, 33,18, 36, 65, 30, 78, 40, 33,18, 36, 65]
    }, ]
  };
}