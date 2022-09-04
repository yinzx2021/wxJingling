// pages/deviceInfo/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ProModel: '',
    userName: '',
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
    console.log(app.globalData.listNo)
    if ((app.globalData.listNo > 0)|(app.globalData.tiyan))
    {
    this.setData(
      {
        ProModel :  app.globalData.headers.设备型号,   
        userName:   app.globalData.headers.公司名称,
        Address:    app.globalData.headers.地址,
        Phone:      app.globalData.headers.联系方式,
        CPass:      app.globalData.passdevice.普通密码,
        SPass:      app.globalData.passdevice.信号密码,
        VPass:      app.globalData.passdevice.超级密码,
        TCode:      app.globalData.headers.远控码,
        Installer:  app.globalData.headers.安装人员,
        DateInstall:app.globalData.headers.安装时间
      }
    )
    }
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