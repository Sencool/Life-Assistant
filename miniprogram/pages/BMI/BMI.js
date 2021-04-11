// pages/BMI/BMI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hight:null,
    weight:null,
    bmi:''
  },
  getHight(e){
    // console.log(e.detail)
    this.setData({
      height: e.detail.value
  })
  },
  getWeight(e){
    // console.log(e.detail)
    this.setData({
      weight: e.detail.value
  })
  },
  onClickLeft() {
    wx.navigateBack()
  },
  submit(){
    var weightnum=parseInt(this.data.weight)
    var heightnum=parseInt(this.data.height)
    // console.log(weightnum)
    var bmi=(weightnum/(heightnum/100)/(heightnum/100)).toFixed(2)
    this.setData({
      bmi:bmi
    })
    console.log(bmi)
    wx.cloud.database().collection("BMI").doc('1')
    .update({
      data:{
        bmi:bmi
      }
    })
    .then(res=>{
      console.log('修改成功',res)
    })
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