let fileID = '';
var WxAutoImage = require('../../js/wxAutoImageCal.js');
let app = getApp();
const db = wx.cloud.database();
const admin = db.collection('user');
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
  login3(){
    //console.log("into login3")
    wx.cloud.callFunction({
      name: 'decodephone',
      data: {  
        weRunData: 0,  
        weRunOrNot:false
      } ,
      complete: res => {
        // 将获取到的openid存入全局变量中
        app.globalData.openId = res.result.openid
        console.log("app.globalData.openId is "+ app.globalData.openId)
        app.globalData.haveOpenId = false
        // 判断数据库中是否已经有数据
        admin.where({
          _openid: app.globalData.openId,
        }).get({
          success: res => {
           // console.log(res)
            if (res.data.length == 0) {
              // 没找到数据
              console.log("没找到数据  "+res.data[0].userinfo.mobilephone) 
              app.globalData.haveOpenId = false
              app.globalData.fenxiang = true
            } else {
              // 找到了数据  
              console.log("找到了数据  "+res.data[0].mobilephone)           
              app.globalData.username_login = res.data[0].userinfo.name//登录密码
              app.globalData.mobilephone = res.data[0].mobilephone// 手机号码
              app.globalData.is_bind = app.globalData.is_userinfo
              app.globalData.haveOpenId = true
              console.log("bind is "+ app.globalData.is_bind)
            }
          }
        })
      }
    })
  },
  onLoad:async function(options){
   // console.log('start ')// 读出的值可以直接赋值给全局变量使用
    const db = wx.cloud.database();
    const collections = await db.collection('news');
    const db2 = collections.doc('0a185578632ad0ec001e071b1bfad42c');
    await db2.get({
      success:res=>{
       // console.log(res.data.guangbo)// 读出的值可以直接赋值给全局变量使用
        getApp().globalData.notice = res.data.guangbo
        this.setData({
          notice:app.globalData.notice, 
       })
      },
      fail:err=>{ 
        console.log(err)
      }
      })   
        //获取用户的本地缓存数据，userinfo信息是在用户授权登录时保存的
     var n = wx.getStorageSync("userinfo");
    //当本地缓存的用户名称不为""或者null时，设置userinfo信息
    app.globalData.is_userinfo = false
     if(n.nickName != '' && n.nickName != null){        
        app.globalData.is_userinfo = true
        app.globalData.userinfo.nickName = n.nickName// 昵称
        app.globalData.userinfo.avatarUrl = n.avatarUrl//头像图片地址
        app.globalData.is_bind = app.globalData.haveOpenId  //s是否绑定了
      //  console.log("userinfo is already"+app.globalData.userinfo.nickName)
    }  
    this.login3()
  },
  
  cloudLogin(){
  } ,
  onReady:function(options){
    
  },
  onShow: function (options){
  
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
      this.setData({
          notice:app.globalData.notice, 
      })
      //console.log("hello");
      //this.cloudLogin()
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