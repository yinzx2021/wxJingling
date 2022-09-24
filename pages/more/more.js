//more.js
import { formatTime } from "../../utils/util";
//获取应用实例
var app = getApp();

// 获取云数据库引用
const db = wx.cloud.database();
const admin = db.collection('user');
Page({
  data: {
    //用户基本信息(头像、昵称)
    userinfo: {
      avatarUrl:'../../images/user.png',
      nickName:'未授权'
    },
    //是否已经获取用户信息
    hasUserInfo: false,
    //是否可以调用获取信息得函数
    canIUseGetUserProfile: false,
    bMobilePhone:false,//是否获取了手机号
  //  bUserInfo:false,//是否获取了用户信息
    MobilePhone:'',
    is_bind2:false
  },
  onLoad(){    
   // console.log('app.globalData.openID is '+ app.globalData.openId)
    if (!app.globalData.is_bind){//只要没有绑定，统一复位
        wx.removeStorage({  
          key: 'userinfo',
        });
        this.setData({
          hasUserInfo : false,
          userinfo:{
            avatarUrl:'../../images/user.png',
            nickName:'未授权' 
          }
        })    
        app.globalData.is_userinfo = false
    }
    this.setData({
      canIUseGetUserProfile : true,
      bMobilePhone:app.globalData.haveOpenId,
      hasUserInfo:app.globalData.is_userinfo,
      MobilePhone:app.globalData.MobilePhone,
      is_bind2:app.globalData.is_bind,
      userinfo:app.globalData.userinfo
    })
    
    //获取用户的本地缓存数据，userinfo信息是在用户授权登录时保存的
    var n = wx.getStorageSync("userinfo");
    //当本地缓存的用户名称不为""或者null时，设置userinfo信息
    if(n.nickName != '' && n.nickName != null){
        this.setData({
            userinfo: n,
            hasUserInfo:true,
            canIUseGetUserProfile:true
        })
    } 
  },
  
  login :function(e){
    var that = this;    
     //清空缓存信息，测试使用
     wx.removeStorage({ 
      key: 'userinfo',
    });
    this.setData({
      hasUserInfo : false,
      is_bind2:false,
      bMobilePhone:false,
      userinfo:{
        avatarUrl:'../../images/user.png',
        nickName:'未授权' 
      }
    })    
    app.globalData.is_bind = this.data.hasUserInfo;
    app.globalData.userinfo=this.data.userinfo;
    wx.showLoading({
      title: '正在解绑！',
      duration: 2000
    })
  // this.onLoad(); 
  },
  saveUserInfo(){//
    console.log('saveuserinfo')
    this.setData({is_bind2:true})
    app.globalData.is_bind = true;
    app.globalData.username_login ='abc'
    app.globalData.haveOpenId= true;
    app.globalData.is_userinfo=true;
    app.globalData.MobilePhone= this.data.MobilePhone;
    app.globalData.userinfo=this.data.userinfo;
    admin.where({mobilephone:app.globalData.userinfo.MobilePhone,_openid:app.globalData.openId}).get(
      {//要不要刷新一一下子手机号信息        
        success(res){    
          if (res.data.length >0 ){ 
            console.log('db is '+res.data[0])   
            wx.showModal({ 
              title:'欢迎回来',
              content: '请联系经纬新技术进行设备绑定!',
              showCancel:false,           
            })   
          }           
          if (res.data[0].mobilephone == app.globalData.MobilePhone)   {
           // console.log('phone is the same')
            return
          }             
          admin.doc(res.data[0]._id).update({
            data:{
              mobilephone:app.globalData.MobilePhone
            },
            success:res=>{
              console.log('update is ok '+ res)
            },
            fail:err=>{
              console.log(err)
            }
            }) 
            return
        }
      }
    )
    console.log('admin.add here'+ app.globalData.openId)
    admin.add({
      data:{
        _id:app.globalData.openId,
        mobilephone:app.globalData.MobilePhone,
        userinfo:{          
          userphoto:app.globalData.userinfo.avatarUrl,
          username:app.globalData.userinfo.nickName,         
          _openid:app.globalData.openId,
          name:'abc',
          password:'123',
          isVIP:false,
          login:true,
          time:formatTime(new Date())
        },        
      },
      success(result){
        console.log(result)    
        wx.showModal({
          title:'绑定成功',
          content: '请联系经纬新技术进行设备绑定！!',
          showCancel:false          
        })        
        if(app.globalData.fenxiang=="true"){
          app.globalData.fenxiang=="false"
          wx.navigateTo({
            //url: `/pages/query/index?username_query=${username_login}`,
          })
        }
      }
    })
  },
 
  //第一次获取用户信息
  getUserProfile : function(e){
    var that = this;
    console.log("this.data.hasUserInfo in getuserprofile is"+ this.data.hasUserInfo)
    if (!this.data.hasUserInfo)//没有信息
    wx.getUserProfile({
      desc: '获取您的微信个人信息',
      success:(res)=>{
          this.setData({
            userinfo:res.userInfo,
            hasUserInfo:true,
          })
          wx.setStorageSync('userinfo', res.userInfo)
          console.log(res.userInfo)
          if (this.data.bMobilePhone)
            this.saveUserInfo()
      },
      fail:function(e){
          wx.showToast({
            title: '你选择了取消',
            icon: "none",
            duration: 1500,
            mask: true
          })
      }
    })
  },
  onShow: function(){
   // this.getData();
    //获取用户的本地缓存数据，userinfo信息是在用户授权登录时保存的
    var n = wx.getStorageSync("userinfo");
    //当本地缓存的用户名称不为""或者null时，设置userinfo信息
    if(n.nickName != '' && n.nickName != null){
        this.setData({
            userinfo: n,
            hasUserInfo:true,
            canIUseGetUserProfile:true
        })
    } 
  },
  onReady: function () {
   
  }, 
  getData: function(){
    var _this = this;
    var days = ['一','二','三','四','五','六','日'];
    _this.setData({
      'user': app._user,
      'time': {
        'term': app._time.term,
        'week': app._time.week,
        'day': days[app._time.day - 1]
      },
      'is_bind': !!app._user.is_bind
    });
  },
  //getPhoneNumber 返回的 code 与 wx.login 返回的 code 作用是不一样的，不能混用
  getPhoneNumber(e){
    var that = this   
    console.log(this.data.is_bind2) 
    console.log("this.data.bMobilePhone in getnumberphone is"+ this.data.bMobilePhone)
    if (this.data.bMobilePhone) return
    if (e.detail.errMsg.indexOf("fail")>0){
       console.log('dfdi is '+e.detail.errMsg);
       return
    }      
    wx.cloud.callFunction({ 
      name: 'decodephone',  
      data: {  
        weRunData: wx.cloud.CloudID(e.detail.cloudID),  
        weRunOrNot:true
      }  
    }).then(res => {  
      that.setData({  
        MobilePhone: res.result.result,
        bMobilePhone:true 
      }) 
     console.log("phone number is "+ res.result.result); 
     if (this.data.hasUserInfo)
           this.saveUserInfo()
    }).catch(err => {
      console.error(err);
    }); 
},
});