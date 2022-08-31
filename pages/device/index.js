// pages/device/index.js
import * as echarts from '../../ec-canvas/echarts';
var wxCharts = require('../../dist/wxcharts.js');
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
  
  iconArray: [
    {
      id:'intro',
      "iconUrl": '../../image/icon-qiandao.png',
      "iconText": '公司简介'
    },
    {
      id:'intro',
      "iconUrl": '../../image/icon-fujin.png',
      "iconText": '图像检测'
    },
    {
      id:'intro',
      "iconUrl": '../../image/icon-zhanhui.png',
      "iconText": '自动物流'
    },
    {
      id:'intro',
        "iconUrl": '../../image/icon-fuli.png',
        "iconText": 'E系统'
    },
    {
        id:'news',
        "iconUrl": '../../image/icon-muma.png',
        "iconText": '新闻资讯'
    },
    {
        id:'intro',
        "iconUrl": '../../image/icon-xingxing.png',
        "iconText": '联系我们'
    },
    
],
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      deviceid:options.deviceid,
     // img_intro:"../../images/test01.png",
    })
    
    console.log(this.data.deviceid);//锁定用户查看的设备ID号，查询其信息并显示
    //1、引用数据库
    //const db = wx.cloud.database({ envs: "tjnk3u19"})
    const db = wx.cloud.database({});
    const cont = db.collection('adminlist3').where({DeviceNo:this.data.deviceid});
    //2、开始查询数据了  news对应的是集合的名称
    cont.get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        console.log(res.data);
        that.setData({ 
          list: res.data, 
          //提取喷出次数与流速信息
          daycount :res.data[0].daycount,
          uvcount:res.data[0].uvcount,
          vv:res.data[0].vv,
          //img_intro:`cloud://cloud1-5grrxptx9b5595f3.636c-cloud1-5grrxptx9b5595f3-1306261487/${res.data[0].DeviceNo}.png`,
          //`/pages/device/index?deviceid=${res.data[0].DeviceNo}.png`
        });
        //showChart(that.data.daycount);
        var countinfo =   that.showChart(that.data.daycount,this.data.uvcount,this.data.vv);
        console.log("countinfo");
        console.log(countinfo);
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
    //if (that.data.img_intro != "../../images/test01.png") {    
     // that.setData({
       // imgsrc:that.data.img_intro
     // })            
    // };
     //console.log("imgsrc");
     //console.log(this.data.img_intro);//锁定用户查看的设备ID号，查询其信息并显示  
  
     
  },
  
  showChart:function(daycount,uvcount,vv){
    ///////////////////////
    console.log("into showChart");
    var countDayin = [];var countDayout = [];
    var countUVin = []; var countUVout  = [];
    var vvin=[];var vvout=[];
    countDayin = daycount.split(',');
    countUVin  = uvcount.split(',');
    vvin       = vv.split(',');
    for (var i=0;i<24;i++)
    {
      chartData.main.data[i] = 0;
      chartData.Uv.data[i] = 0;
      chartData.Vv.data[i] = 0;
    }
    for (var i=0;i<countDayin.length;i++)
    {
      chartData.main.data[i] = +countDayin[i];
    }
    console.log(chartData.main.data);
    for (var i=0;i<countUVin.length;i++)
    {
      chartData.Uv.data[i] = +countUVin[i];
    }
    console.log(chartData.Uv.data);
    for (var i=0;i<vvin.length;i++)
    {
      chartData.Vv.data[i] = +vvin[i];
    }
    console.log(chartData.Vv.data);
    ////////////////////
    //var createSimulationData= that.createSimulationData(that.data.daycount);
   //  var datatest = createSimulationData.dataCount;
     var windowWidth = 320;
        try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          console.error('getSystemInfoSync failed!');
        }
     columnChart = new wxCharts({
        canvasId:'columnCanvas',
        type:'column',
        animation: true,
        categories: chartData.main.categories,
        series: [{
            name: 'day',
            data: chartData.main.data,
          // format: function (val, name) {         
           //  return val.toFixed(0) + '次';
           // }
            },
            {
              name: 'UV',
              data: chartData.Uv.data,
            //  format: function (val, name) {return val.toFixed(0) + '次';}
              }
          ],
            yAxis: {
              format: function (val,name) {
              return val + '';},
           //   title: '喷出次数',
           min: 0,
          },
          xAxis: {
              disableGrid: false,
              type: 'calibration'
          },
          extra: {
              column: {
                  width: 15
              }
          },
          width: windowWidth,
          height: 180,
          dataLabel: false,
     })
     //console.log(columnChart);
     columnChart = new wxCharts({
      canvasId:'lineCanvas',
      type:'line',
      animation: true,
      categories: chartData.main.categories,
      series: [{
          name: 'v',
          data: chartData.Vv.data,
         //format: function (val, name) {return val.toFixed(0) + '次';}
          },          
        ],
          yAxis: {
          //  format: function (val) {return val + '次';},
          //  title: '流速',
            min: 0,
        },
        xAxis: {
            disableGrid: false,
            type: 'calibration'
        },
        extra: {
            column: {
                width: 15
            }
        },
        width: windowWidth,
        height: 180,
        dataLabel: false,
   })
  // console.log(columnChart);
   return true;
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
        itemStyle:{
          normal:{
            color:'#442299'
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
      data: getApp().globalData.record.当日24小时流速
    }, ]
  };
}
