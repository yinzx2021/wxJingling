//login.js
//获取应用实例
var app = getApp();
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
    canIUseGetUserProfile: false
  },
  onLoad(){
    this.setData({canIUseGetUserProfile : true})
  },
  onReady: function(){
    var _this = this;     
  }, 
  //第一次获取用户信息
  getUserProfile : function(e){
    var that = this;
    wx.getUserProfile({
      desc: '获取您的微信个人信息',
      success:(res)=>{
          this.setData({
            userinfo:res.userInfo,
            hasUserInfo:true
          })
          wx.setStorageSync('userinfo', res.userInfo)
          console.log(res.userInfo)
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
  onShow(){
    //获取用户的本地缓存数据，userinfo信息是在用户授权登录时保存的
    var n = wx.getStorageSync("userinfo");
    //当本地缓存的用户名称不为""或者null时，设置userinfo信息
    if(n.nickName != '' && n.nickName != null){
        this.setData({
            userinfo: n,
            hasUserInfo:true,
            canIUseGetUserProfile:true
        })
       
        // 通过wx.login获取登录凭证（code），然后通过code去获取我们用户的openid
        wx.login({
          success:(res)=>{
              console.log('userinfo is '+res.code);
              if (res.code) {
                //发起网络请求              
                console.log('code '+res.code)
              } else {
                console.log('登录失败！' + res.errMsg)
              }
          },
        })
    }
    //清空缓存信息，测试使用
     wx.removeStorage({
         key: 'userinfo',
     });
  }
});