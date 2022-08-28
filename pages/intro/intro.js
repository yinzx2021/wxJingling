// pages/intro/intro.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_intro:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      // 下载文件
     wx.cloud.downloadFile({
      //   // 返回链接地址 仅支持小程序中展示 cloud协议
         // cloud://text-wx55c.7465-text-wx55c-1254351324/img/1594809942978.jpg
         fileID : "cloud://cloud1-5grrxptx9b5595f3.636c-cloud1-5grrxptx9b5595f3-1306261487/intro-2.png",
         success:res=>{
           console.log(res)
           this.setData({
            img_intro:res.tempFilePath  
           })
          },
         fail(err){
           console.log(err);
         }
       })
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