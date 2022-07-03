// pages/awardApplyProcess/awardApplyList/awardApplyList.js
const { getPendingApplyAwardList } = require("../../../api/api");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPendingCheckAwardList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  /**
   * 获取待审核的奖励列表
   */
  getPendingCheckAwardList: async function () {
    try {
      let res = await getPendingApplyAwardList();
      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }
      console.log(res);
      this.setData({
        list: res.result.result.data,
      });
    } catch (error) {
      wx.showToast({
        title: error,
      });
    }
  },

  /**
   * 点击跳转详情页面
   */
  navTo: function (event) {
    let { _id, content, score } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/awardApplyProcess/awardCheck/awardCheck?_id=${_id}&content=${content}&score=${score}`,
    });
  },
});
