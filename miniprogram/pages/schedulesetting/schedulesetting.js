// pages/schedulesetting/schedulesetting.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kcmc:'',
    mcerr:'',
    skcd:'',
    cderr:'',
    skjc:'',
    jcerr:'',
    xqj:'',
    xqerr:''
  },

  getKcmc:function(e){
    // console.log(e.detail.value)
    this.setData({
      kcmc:e.detail.value
    })
  },
  getSkcd:function(e){
    // console.log(e.detail.value)
    this.setData({
      skcd:e.detail.value
    })
  },
  getSkjc:function(e){
    // console.log(e.detail.value)
    this.setData({
      skjc:e.detail.value
    })
  },
  getXqj:function(e){
    // console.log(e.detail.value)
    this.setData({
      xqj:e.detail.value
    })
  },
  submit:function(){
    let obj=this.data
    var arr = [0,0,0,0]
    // 名称
    if(obj.kcmc!=''){
      arr[0]=1
    }else{
      Dialog.alert({
        title: '错误',
        message: '信息输入不正确，请修改标红处',
        theme: 'round-button',
      })
      this.setData({
        mcerr:true
      })
    }
    // 长度
    if(obj.skcd==1||obj.skcd==2){
      arr[1]=1
    }else{
      Dialog.alert({
        title: '错误',
        message: '信息输入不正确，请修改标红处',
        theme: 'round-button',
      })
      this.setData({
        cderr:true
      })
    }
    // 时间
    if(obj.skjc>0&&obj.skjc<=10&&((parseInt(obj.skjc)+1)%2==0)){
      arr[2]=1
    }else{
      Dialog.alert({
        title: '错误',
        message: '信息输入不正确，请修改标红处',
        theme: 'round-button',
      })
      this.setData({
        jcerr:true
      })
    }
    // 星期几
    if(obj.xqj>0&&obj.xqj<=7){
      arr[3]=1
    }else{
      Dialog.alert({
        title: '错误',
        message: '信息输入不正确，请修改标红处',
        theme: 'round-button',
      })
      this.setData({
        xqerr:true
      })
    }
    console.log(arr)
    if(arr[0]==arr[1]==arr[2]==arr[3]==1){
      const db = wx.cloud.database();
      const schedule = db.collection('schedule');
      schedule.add({
        data:{
          kcmc:obj.kcmc,
          skcd:obj.skcd,
          skjc:obj.skjc,
          xqj:obj.xqj
        }
      })
    }

  },
  focus1:function(){
    this.setData({
      mcerr:''
    })
  },
  focus2:function(){
    this.setData({
      cderr:''
    })
  },
  focus3:function(){
    this.setData({
      jcerr:''
    })
  },
  focus4:function(){
    this.setData({
      xqerr:''
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