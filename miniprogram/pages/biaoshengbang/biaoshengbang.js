// pages/biaoshengbang/biaoshengbang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
      wx.request({
        url: "http://localhost:3000/playlist/detail?id=3778678",
        hesader:{
          'Content-Type': 'application/json'
        },
        success:function(r){
          // console.log(r.data.result.songs[0].id)
          console.log(r.data.playlist.tracks)
          that.setData({
            musicList:r.data.playlist.tracks
          })
        
    },
    fail: function(res) {
    }
  })
  },
  click:function(e){
    console.log(e.currentTarget.dataset.index)
    var i = e.currentTarget.dataset.index
    this.data.musicList[i].id
    console.log(this.data.musicList[i].id)
    wx.setStorage({
      data: this.data.musicList[i].id,
      key: 'songId',
    })
    wx.navigateBack({
      delta: 0,
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