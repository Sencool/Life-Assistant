// pages/schedule/schedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#FC9F9D", "#0A9A84",	"#00FFFF","#FFE4C4"],
    wlist: []
  },
  getList(){
    const db = wx.cloud.database();
    const schedule = db.collection('schedule');
    schedule.get()
    .then(res=>{
      this.setData({
        wlist:res.data
      })
    })
  },
  add(){
    console.log(1)
    wx.navigateTo({
      url: '../schedulesetting/schedulesetting',
    })
  },
  dda:async function(e){
    wx.showModal({
      title: '提示',
      content: '是否删除这条数据',
      success: function (res) {
        if (res.confirm) {
          var event = e.currentTarget.id;
          const db = wx.cloud.database();
          const schedule = db.collection('schedule');
          schedule.where({
            kcmc:event,
            // xqj:event[1]
          })
          .get()
          .then(r=>{
            schedule.doc(r.data[0]._id).remove()
          })
        }
      },
      complete:this.getList()
    }) 
    this.getList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    this.getList()
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