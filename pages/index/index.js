let fileID = '';
var WxAutoImage = require('../../js/wxAutoImageCal.js');
let app = getApp();
Page({
  data:{
    notice:app.globalData.notice,
    img_intro:'',
      imgUrls: [
        '../../images/logo1.png',
        '../../images/logo3.png',
        '../../images/logo4.png',
        '../../images/logo2.png'
    ],
    iconArray: [
      {
        id:'company',
        "iconUrl": '../../image/icon-qiandao.png',
        "iconText": '公司简介'
      },
      {
        id:'tuxiang',
        "iconUrl": '../../image/icon-fujin.png',
        "iconText": '图像检测'
      },
      {
        id:'automan',
        "iconUrl": '../../image/icon-zhanhui.png',
        "iconText": '自动物流'
      },
      {
        id:'esystem',
          "iconUrl": '../../image/icon-fuli.png',
          "iconText": 'E系统'
      },
      {
          id:'history',
          "iconUrl": '../../image/icon-muma.png',
          "iconText": '历程与荣誉'
      },
      {
          id:'contract',
          "iconUrl": '../../image/icon-xingxing.png',
          "iconText": '联系我们'
      },
      
  ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
  },

  onLoad:async function(options){
    console.log('start ')// 读出的值可以直接赋值给全局变量使用
    const db = wx.cloud.database();
    const collections = await db.collection('news');
    const db2 = collections.doc('f6e08a646317f45616cd01a6598674e7');
    await db2.get({
      success:res=>{
        console.log(res.data.guangbo)// 读出的值可以直接赋值给全局变量使用
        getApp().globalData.notice = res.data.guangbo
      },
      fail:err=>{ 
        console.log(err)
      }
      })
    this.setData({
       notice:app.globalData.notice, 
    })
  },
  onShow: function (options){
    console.log("hello");
     // 下载文件
     /*wx.cloud.downloadFile({
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
    testi:function(){
      wx.cloud.callFunction({
        name:'manage_node',
        data:{
          a:1,
          b:2
        },
        success:function(res){
          console.log(res.result)
        },
        fail:console.err
      })
        
    },
    cusImageLoad: function(e){
      var that = this;
      that.setData(WxAutoImage.wxAutoImageCal(e));
  },
  allDraw(event){
    console.log(event.detail.value);
  },

  
  })

  //<image src="{{img_intro}}" mode="aspectFit"></image>