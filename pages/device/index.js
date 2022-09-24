// pages/device/index.js
import * as echarts from '../../ec-canvas/echarts';
import { formatTime } from "../../utils/util";
//var wxCharts = require('../../dist/wxcharts.js');
var WxAutoImage = require('../../js/wxAutoImageCal.js');
var columnChart = null;
const app = getApp()
var chartData = {
  main: {
      title: 'day',
      data: [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0],
      categories: ['0', '1', '2', '3','4', '5', '6', '7','8','9', '10', '11', '12','13', '14', '15', '16','17', '18', '19', '20','21', '22', '23']
  },
  Uv: {
    title: 'uv',
    data: [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0],
    categories: ['0', '1', '2', '3','4', '5', '6', '7','8','9', '10', '11', '12','13', '14', '15', '16','17', '18', '19', '20','21', '22', '23']
},
  Vv: {
    title: 'vv',
    data: [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0],
    categories: ['0', '1', '2', '3','4', '5', '6', '7','8','9', '10', '11', '12','13', '14', '15', '16','17', '18', '19', '20','21', '22', '23']
}
}
let barChart;
 function  barChartonInit(canvas, width, height, dpr) {
    barChart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(barChart);
  barChart.setOption(getBarOption());
  return barChart;
}
let lineChart;
function lineChartonInit(canvas, width, height, dpr) {
  lineChart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(lineChart);
  lineChart.setOption(getLineOption());
  return lineChart;
}
function refreshData(){
  var option = barChart.getBarOption();
  option.series[0].data = chartData.main.data;
  option.series[1].data = chartData.Uv.data;
  var option = barChart.getLineOption();
  option.series[0].data = chartData.Vv.data;
}
// <view style="text-align:center">24小时喷出次数</view>
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceid:'',
    list:[],
    img_intro:'',
    imgsrc:'',
    daycount:'',
    uvcount:'',
    vv:'',
    date:formatTime(new Date()),
    minDate: new Date(2020, 0, 1).getTime(),
    show:false,
    dbCount:0,
    hiddenChart:false,
    optionsdb:{
        deviceid:''
    },

ecBar: {
  onInit:barChartonInit
  /*onInit: function (canvas, width, height, dpr) {
    const barChart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new
    });
    canvas.setChart(barChart);
    barChart.setOption(getBarOption());

    return barChart;
  }*/
},
  ecLine:{
    onInit : lineChartonInit
    /*onInit: function (canvas, width, height, dpr) {
      const lineChart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      canvas.setChart(lineChart);
      lineChart.setOption(getLineOption());
      return lineChart;
    }*/
}
},
cusImageLoad: function(e){
  var that = this;
  that.setData(WxAutoImage.wxAutoImageCal(e));
},
  loadimg:function(e){
    var imageid = e.currentTarget.imageid;//获取到设备的ID号码，根据ID号获取
    console.log(imageid);
  },
  createSimulationData:function(daycount){
    console.log("into creatsimulaion");
    var dataDay = [];
    var dataCount = [];
    dataDay = daycount.split(',');
    for (var i=0;i<dataDay.length;i++)
    {
      dataCount[i] = +dataDay[i];
    }
    return{
      dataCount:dataCount
    }
},
onDisplay() {
  this.setData({ show: true });
  //this.setData({ hiddenChart: true });//真机调试时 注释掉
  console.log("calendar"+this.data.hiddenChart)
},
onClose() {
  this.setData({ show: false });
  this.setData({ hiddenChart: false });
  console.log(this.data.hiddenChart)
},
formatDate(date) {
  date = new Date(date);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
},

onConfirm(event) {
  this.setData({
    show: false,
    date: this.formatDate(event.detail),
  });
  console.log('confirm date is '+this.data.date);
  this.setData({ hiddenChart: false });
  this.onLoad(this.data.optionsdb);
  /////////////
},
querydb(){

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    var that = this;
   // this.optionsdb.deviceid=options.deviceid;
   // console.log(this.optionsdb.deviceid);
    this.setData({
      deviceid:options.deviceid,
      optionsdb:{
        deviceid:options.deviceid,
      },
      date:this.formatDate(this.data.date)
     // img_intro:"../../images/test01.png",
    })    
    console.log('deviceid is '+this.data.deviceid);//锁定用户查看的设备ID号，查询其信息并显示
    if (this.data.deviceid === '0'){
      app.globalData.tiyan = true;
      console.log('tiyan is '+ app.globalData.tiyan)
      app.globalData.record.当日日光喷出次数  = [1927,1914,1958,1802,1729,1809,1084,57,1361,1504,1676,1836,1672,1348,0,632,1712,1887,1290,533,1194,1524,1428,1241];
      app.globalData.record.紫外喷出次数 = [357,368,297,274,342,330,237,18,275,296,245,399,387,288,0,123,287,330,206,132,280,629,610,614];
      app.globalData.record.当日24小时流速 = [10.84,11.07,11.06,11.10,11.09,11.04,11.15,11.50,11.11,11.10,11.10,11.00,11.01,11.03,0.00,11.07,10.93,10.90,10.90,11.08,10.82,10.96,10.90,10.83];
      console.log('tiyan vv '+ app.globalData.record.当日24小时流速 )
      return;//体验，不需要再查询数据库
    }
    app.globalData.tiyan = false; 
    app.globalData.record.当日24小时流速 = chartData.main.Vv;
    app.globalData.record.当日日光喷出次数 = chartData.main.data;
    app.globalData.record.紫外喷出次数 = chartData.Uv.data;
    //1、引用数据库
    //const db = wx.cloud.database({ envs: "tjnk3u19"})
    const db = wx.cloud.database({});
    console.log('devicedate is '+ this.data.date);
    const cont = await db.collection('adminlist').where({DeviceNo:this.data.deviceid,date:this.data.date});
    //2、开始查询数据了  news对应的是集合的名称
    //https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/command/Command.and.html
    await cont.get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        console.log(res.data.length);
        app.globalData.listNo = res.data.length;
        app.globalData.detail=res.data[0].detail;
        app.globalData.headers=res.data[0].headers;
        app.globalData.passdevice=res.data[0].passdevice;
        app.globalData.settings=res.data[0].settings;
        app.globalData.state=res.data[0].state;
        app.globalData.record=res.data[0].record;
        console.log(res.data[0].record);        
        console.log("countinfo");
        barChart.setOption(getBarOption());
        lineChart.setOption(getLineOption());//该部分在await 异步操作完成后进行
        },
        fail: (res) =>{  
          console.log(res);
          wx.showToast({
            title: '没有设备信息！',
            icon: 'success',
            duration: 2500
          })    
      }
    }) 
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

   // barChart.setOption(getBarOption());
   // lineChart.setOption(getLineOption());
    /*/ 下载文件
    wx.cloud.downloadFile({
      //   // 返回链接地址 仅支持小程序中展示 cloud协议
         // cloud://text-wx55c.7465-text-wx55c-1254351324/img/1594809942978.jpg
         fileID : "cloud://cloud1-5grrxptx9b5595f3.636c-cloud1-5grrxptx9b5595f3-1306261487/logo2.png",
         success:res=>{
           console.log(res)
           this.setData({
            img_intro:res.tempFilePath  
           })
          },
         fail(err){
           console.log(err);
         }
       })*/
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
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
        },
        data:['0', '1', '2', '3', '4', '5', '6','7', '8', '9', '10','11', '12', '13', '14', '15', '16','17', '18', '19', '20','21', '22', '23'],
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
        itemStyle:{
          normal:{
            color:'#993333'
          }
        },
        data: getApp().globalData.record.当日日光喷出次数//chartData.main.data,//
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
        itemStyle:{
          normal:{
            color:'#442299'
          }
        },
        data: getApp().globalData.record.紫外喷出次数//chartData.Uv.data,//
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
        itemStyle:{
          normal:{
            color:'#dddddd'
          }
        },
        data: [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0,0]
      }
    ]
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
      max:18,
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
      data: getApp().globalData.record.当日24小时流速//chartData.Vv.data
    }, ]
  };
}
