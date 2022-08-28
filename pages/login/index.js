// pages/login/login.js
//"i-input": "../../dist/input/index",
let app = getApp();
// 获取云数据库引用
const db = wx.cloud.database();
const admin = db.collection('adminlist');
let name1 = 'abc';
let password = '123'; 
let loginflag = 0;
let username_login ='';

Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    username:'abc',
    phone:'123',
  },
  //输入用户名
  inputName: function (event) {
    name1 = event.detail.detail.value
  },
  //输入密码
  inputPassword(event) {
    password = event.detail.detail.value
  },
  //登陆
  login(){
    let that = this;
     //登陆获取用户信息
    admin.get({
      success:(res)=>{
        let user = res.data;
        console.log(res.data);
        loginflag = 0;
        for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
          console.log(user[i].name);
          console.log(name1);
          if ((name1 === user[i].name) && (name1 !== null)) { //用户名存在 
            if (password !== user[i].password) {  //判断密码是否正确
              loginflag = 1;
              console.log('密码错误！！');
              wx.showToast({
                title: '密码错误！！',
                icon: 'success',
                duration: 2500
              })
            }             
            if (loginflag === 0 ) {
              console.log('登陆成功！');
              loginflag = 2;
              username_login = name1; 
              console.log(username_login);             
              wx.showToast({
                title: '登陆成功！2！',
                icon: 'success',
                duration: 2500
              })
            //  wx.switchTab({   //跳转首页
           //     url: '/pages/register/index',  //这里的URL是你登录完成后跳转的界面
            //  })
            //app.global.user_name = name1;
          //  wx.navigateTo({
             //   url: '/pages/query/index',
           //  })
           wx.navigateTo({
                url: `/pages/query/index?username_query=${username_login}`,
               // url: '/pages/device/index',//将用户名或ID传输到查询界面
              })  
            }
          }
        }
          if ((loginflag === 0) && (name1 !== null)) {   //不存在
            console.log('无此用户名2！');
            wx.showToast({
              title: '无此用户名！2！',
              icon: 'success',
              duration: 2500
            })
          }
      }
    })
  },
  
  register(){
    console.log('regi');
    wx.navigateTo({
      url: '/pages/register/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 页面显示/切入前台时触发
   */
  onShow: function () {

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
})