// pages/user/user.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    BMI:'',
    info:'',
    count:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('BMI')
    .get()
    .then(res=>{
      // console.log(res.data)
      this.setData({
        BMI:res.data[0].bmi
      })
      console.log(this.data.BMI)
      if(this.data.BMI<=18.4){
        this.setData({
          info:"偏瘦，建议对自己好一点，多吃点东西"
        })
      }else if(this.data.BMI>18.4&&this.data.BMI<=23.9){
        this.setData({
          info:"正常体重，请保持目前的生活状态"
        })
      }else if(this.data.BMI>23.9&&this.data.BMI<=27.9){
        this.setData({
          info:"偏胖，不要太过担心，有意识的控制体重"
        })
      }else if(this.data.BMI>27.9){
        this.setData({
          info:"超重了，该减肥了"
        })
      }
    })

    wx.cloud.database().collection('sCount').doc('1')
    .get()
    .then(res=>{
      this.setData({
        count:res.data.count
      })
    })
   
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
    this.onLoad()
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