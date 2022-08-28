// pages/register/index.js
let app = getApp();
//获取云数据库引用
const db = wx.cloud.database();
const admin = db.collection('adminlist');
 let name1 = null;
 let password = null; 

Page({
  data: {
  },
  //输入用户名
  inputName:function(event){
    name1 = event.detail.detail.value
  },
  //输入密码
  inputPassword(event){
    password = event.detail.detail.value
  },


// .where({
//      _openid: app.globalData.openid  // 填入当前用户 openid
//   })

  // wx.showModal({
  //   title: '提示',
  //   content: '您已注册，确定要更新账号密码吗？',
  //   success: function (res) {
  //     if (res.confirm) {
  //       console.log('用户点击确定')
  //       that.saveuserinfo();
  //     }
  //   }
  // })

   //注册
  register(){ 
    let that = this;
    let flag = false  //是否存在 true为存在
    if (name1 !== null)  {
      if (password !== null){
    //查询用户是否已经注册
    admin.get({
      success:(res)=> {
        let admins = res.data;  //获取到的对象数组数据
       // console.log(name1);
        for (let i=0; i<admins.length; i++){  //遍历数据库对象集合
          if (name1 === admins[i].name){ //用户名存在
            flag = true;
         //   break;
          }
        }
        if(flag === true){    //已注册
          //console.log('账号已注册！');
          wx.showToast({
          title: '账号已注册！',
          icon: 'success',
          duration: 2500
          })
        }
        if(flag !== true){  //未注册
          that.saveuserinfo()
        }
      }
    })
    }
    if (password === null) {
      console.log('密码不能为空！');
      wx.showToast({
      title: '密码不能为空！',
      icon: 'success',
      duration: 2500
    })
  }
  }
  if (name1 === null) {
      console.log('账号不能为空！');
      wx.showToast({
      title: '账号不能为空！',
      icon: 'success',
      duration: 2500
    })
  }  
},
  //注册用户信息
  saveuserinfo() {
   // let that = this;
   console.log(name1);
    admin.add({  //添加数据
      data:{
        name:name1,
        password: password
      }
    }).then(res => {
      console.log('注册成功！')
      wx.showToast({
        title: '注册成功！',
        icon: 'success',
        duration: 3000
      })
      wx.redirectTo({
        url: '/pages/login/index',
      })
    })
  },
})