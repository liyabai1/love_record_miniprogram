// pages/taskApplyProcess/taskApply/taskApply.js
const { taskApply } = require("../../../api/api");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    score: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

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
   * 提交申请
   */
  submit: async function () {
    let score = parseInt(this.data.score);
    let content = this.data.content.toString();

    wx.showLoading({
      title: "提交中...",
    });

    try {
      let res = await taskApply({ content, score });

      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }

      wx.showToast({
        icon: "success",
        title: "提交成功",
        success: function () {
          wx.navigateBack({
            delta: 1,
          });
        },
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
});
