// pages/deviceInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ProModel: 'wer',
    userName: 'ssdsad',
    Address:'',
    Phone:'',
    CPass:'',
    SPass:'',
    VPass:'',
    TCode:'',
    Installer:'',
    DateInstall:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData(
      {
        ProModel :  getApp().globalData.headers.设备型号,   
        userName:   getApp().globalData.headers.公司名称,
        Address:    getApp().globalData.headers.地址,
        Phone:      getApp().globalData.headers.联系方式,
        CPass:      getApp().globalData.passdevice.普通密码,
        SPass:      getApp().globalData.passdevice.信号密码,
        VPass:      getApp().globalData.passdevice.超级密码,
        TCode:      getApp().globalData.headers.远控码,
        Installer:  getApp().globalData.headers.安装人员,
        DateInstall:getApp().globalData.headers.安装时间
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})