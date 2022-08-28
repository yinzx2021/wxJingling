import * as echarts from '../../ec-canvas/echarts';



const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#aaaaaa",
   
    
    series: [{
      label: {
        normal: {
          fontSize: 14,
          show:true,
         // formatter:'{b}:{d}%'   //显示%
        }
      },  
      
      type: 'pie',
      center: ['50%', '60%'],
      radius: ['10%', '50%'],
      data: [{
        value: 55,
        name: '彩色'
      }, {
        value: 20,
        name: '色棉'
      }, {
        value: 10,
        name: '黑色'
      }, {
        value: 20,
        name: '地膜'
      }, {
        value: 38,
        name: '灰丝'
      }]
    }],
    legend: {
      orient: 'horizontal',
      bottom: 50,
      icon: "circle",
      x:'center',
      y:'top',
      padding:30,
      top:0,
      backgroundColor: '#888888',
      borderColor: '#0000ff',
      borderWidth: '0',
    
      formatter: function(name) {
          if(name === '灰丝') {
              return name + "："+"350(数值)";
          } else if(name === '地膜') {
            return name + "："+"350(数值)";
          } else if(name === '色棉') {
            return name + "："+"350(数值)";
          } else if(name === '彩色') {
            return name + "："+"350(数值)";
          } else if(name === '黑色') {
            return name + "："+"350(数值)";
          } 
      },
    },
    title: [{
      text: '33',
      textAlign: 'center',
      left: 360,
      bottom: 280,
      show:true,
      textStyle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 400
      }
    }],
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    a:"43",
    b:"dd",
    d:"ddd"
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
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
