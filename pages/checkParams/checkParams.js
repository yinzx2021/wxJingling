// pages/checkParams/checkParams.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ModalNameDevice:'20220512',
    currentValue : 50,
    currentValueZ : 50,
    currentValueP : 50,
    currentValueI : 50
  },
  // 滑动计数器处理逻辑
    onDrag(event) {
      this.setData({
        currentValue: event.detail.value,
      });
    },
    onDragZ(event) {
      this.setData({
        currentValueZ: event.detail.value,
      });
    },
    onDragP(event) {
      this.setData({
        currentValueP: event.detail.value,
      });
    },
    onDragI(event) {
      this.setData({
        currentValueI: event.detail.value,
      });
    },                

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if ((getApp().globalData.listNo > 0)|(app.globalData.tiyan))
    this.setData(
      {
        ModalNameDevice:app.globalData.settings.ModelName,
        currentValue :  app.globalData.settings.色彩灵敏度,
        currentValueZ : app.globalData.settings.荧光灵敏度,
        currentValueP : app.globalData.settings.偏振灵敏度,
        currentValueI : app.globalData.settings.红外灵敏度
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