// pages/awardList/awardList.js
const { getAwardList, exchangeAward } = require("../../api/api");
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
    this.getAwardList();
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
  onPullDownRefresh() {
    this.getAwardList();
    wx.stopPullDownRefresh({
      success: (res) => {},
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  /**
   * 获取可兑换列表
   */
  getAwardList: async function () {
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    try {
      let res = await getAwardList();
      console.log(res);
      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }

      this.setData({
        list: res.result.result.data,
      });
    } catch (error) {
      wx.showToast({
        icon: "error",
        title: error,
      });
    }
    wx.hideLoading({
      success: (res) => {},
    });
  },

  /**
   * 点击兑换奖励
   */
  exchangeAward: async function (event) {
    wx.showLoading({
      title: "兑换中...",
      mask: true,
    });
    try {
      let _id = event.target.dataset._id;
      let res = await exchangeAward(_id);

      // 当前积分不足
      if (res.result.code === 201) {
        throw res.result.result;
      }

      // 获取失败
      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }

      wx.showToast({
        icon: "success",
        title: "兑换成功",
      });
    } catch (error) {
      wx.showToast({
        icon: "error",
        title: error,
      });
    }
  },

  /**
   * 跳转至新增奖励申请页
   */
  navTo: function () {
    wx.navigateTo({
      url: "/pages/awardApplyProcess/awardApply/awardApply",
    });
  },
});
