import * as echarts from '../../ec-canvas/echarts';
const app = getApp();

var dataClass=[
  {value: 0,name: '彩色'},
  {value: 0,name: '黑/灰色'},
  {value: 0,name: '荧光'},
  {value: 0,name: '偏振'},
  {value: 0,name: 'C5'},
  {value: 0,name: 'C6'},
  {value: 0,name: 'C7'},
  {value: 0,name: 'C8'},
]

function formatStringLen(strVal, len, padChar){
  padChar = padChar || "*";
  if (!strVal) {
    return padChar.repeat(len);
  } else {
    const strLen = strVal.length;
    if (strLen > len){
      return strVal.substring(0, len);
    } else if (strLen < len){
      return strVal.padEnd(len, padChar);
    }else{
      return strVal;
    }
  }
}

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
      data: dataClass,//getApp().globalData.record.dataClass,
      /*[{
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
      }]*/
    }],
    legend: {
      orient: 'horizontal',
      bottom: 50,
      icon: "circle",
      x:'center',
      y:'top',
      padding:10,
      top:0,
      backgroundColor: '#cccccc',
      borderColor: '#0000ff',
      borderWidth: '0',
      formatter: function(name){    
        let data= dataClass;//getApp().globalData.record.dataClass; 
        const value = data.find(v=>v.name===name).value;
        const result = name + "："+ value+"%";          
        return formatStringLen(result,12,' ');        
      },
      /*formatter: function(name) {
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
      },*/
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
  onLoad(options) {
    console.log('pie is tian ' + app.globalData.tiyan)
    
    if ((app.globalData.listNo > 0)|(app.globalData.tiyan)){
         dataClass = app.globalData.record.dataClass
         console.log(app.globalData.record.dataClass)
    }
  },
  onReady() {
  }
});
