// pages/schedule/schedule.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 标题
    all:0,
    income:0,
    out:0,
    // 列表
    list:[],
    pan:null,
    money:0,
    val:null,
    // 梦想
    dreamList:[],
    aim:0,
    dream:0,
    once:0,
    txt:''
  },
  // 获取收支列表数据
  getList(){
    // console.log(1)
    const db = wx.cloud.database();
    const iae = db.collection('IAE');
    iae.get()
    .then(res=>{
      // let mon=res.data.list[0]
      // console.log(res)
      this.setData({
        list:res.data
      })
      
    })
    // console.log(this.data.list)
  },
  
  // 获取收入信息
 
  getIcome(){
    const db = wx.cloud.database();
    const iae = db.collection('IAE');
    iae.where({
      icon:"plus"
    })
    .get()
    .then(res=>{
      let sum=0
      for (let i = 0; i < res.data.length; i++) {
        sum+= parseInt(res.data[i].money);
      }
      this.setData({
        income:sum
      })
      // console.log(sum)
      this.getOut()
    })
  },
  getOut(){
    const db = wx.cloud.database();
    const iae = db.collection('IAE');
    iae.where({
      icon:"minus"
    })
    .get()
    .then(res=>{
      let sum=0
      for (let i = 0; i < res.data.length; i++) {
        sum+= parseInt(res.data[i].money);
      }
      this.setData({
        out:sum
      })
      // console.log(sum)
      this.getAllMoney()
    })

  },
  getAllMoney(){
    var sum = this.data.income-this.data.out
    this.setData({
      all:sum
    })
  },
  // 添加列表项
  listAdd:function(){
    this.setData({
      IAEShow:true
    })
  },
  panInput:function(e){
    this.setData({
      pan: e.detail.value
    })
    // console.log(this.data.pan)
  },
  moneyInput:function(e)
  {
    this.setData({
      money: e.detail.value
    })
  },
  valInput:function(e)
  {
    this.setData({
      val: e.detail.value
    })
  },
  IAEsubmit:function(){
    const db = wx.cloud.database();
    const iae = db.collection('IAE');
    iae.get()
    .then(async res=>{
      // console.log(this.data.pan)
      let a = res.data.length+1
      if (this.data.pan=="+") {
        await iae.add({
          data:{
            _id:a,
            pan:this.data.pan,
            money:this.data.money,
            value:this.data.val,
            icon:"plus",
          }
        })
        
      }else{
        await iae.add({
          data:{
            _id:a,
            pan:this.data.pan,
            money:this.data.money,
            value:this.data.val,
            icon:"minus",
          }
        })
      }
      this.getList()
      this.getIcome()

    })
    
  },
  // 删除
  del:async function(e){
    // // console.log(e.target.id)
    var id = e.target.id
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success:function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name:'del',
            data:{
              _id:id
            }
          })
        }
      },
      complete:this.getList()
    }) 
    console.log(this)
    this.getList() 
  },



  // 获取梦想列表
  getDream(){
    const db = wx.cloud.database();
    const dream = db.collection('Dream');
    dream.get()
    .then(res=>{
      this.setData({
        dreamList:res.data
      })
      // console.log(res.data[0].aim-res.data[0].once*res.data[0].count)
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].aim-res.data[i].once*res.data[i].count<=1){
          dream.doc(res.data[i]._id)
          .update({
            data:{
              success:false
            }
          })
        }
      }
    })
  },
  // 梦想点击事件
  click:function(event){
    let id=event.currentTarget.id
    const db = wx.cloud.database();
    const dream = db.collection('Dream');
    dream.doc(id)
    .get()
    .then(async res=>{
      await dream.doc(id)
      .update({
        data:{
          count:res.data.count+1
        }
      })
      this.getDream()
    })
    
    
  },

  // 新的梦想
  addDream:function(){
    this.setData({
      dreamShow:true,
   })
  },
  aimInput:function(e)
  {
    this.setData({
      aim: e.detail.value
    })
    // console.log(this.data.aim)
  },
  onceInput:function(e)
  {
    this.setData({
      once: e.detail.value
    })
  },
  dreamInput:function(e)
  {
    this.setData({
      dream: e.detail.value
    })
  },
  submit:function(){
    const db = wx.cloud.database();
    const dream = db.collection('Dream');
    dream.get()
    .then(async res=>{
      let a = res.data.length+1
      await dream.add({
        data:{
          _id:'"'+a+'"',
          aim:this.data.aim,
          count:0,
          once:this.data.once,
          success:true,
          value:this.data.dream
        }
      })
     
      this.getDream()
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.getIcome()
    this.getDream()

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