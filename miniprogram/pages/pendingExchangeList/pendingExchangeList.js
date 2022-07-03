// pages/pendingExchangeList/pendingExchangeList.js
const { getPendingExchangeList, confirmExchange } = require("../../api/api");
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
    this.getPendingExchangeList();
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
   * 获取兑换列表
   */
  getPendingExchangeList: async function () {
    wx.showLoading({
      title: "获取中...",
      mask: true,
    });
    try {
      let res = await getPendingExchangeList();

      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }

      let list = res.result.result.data;

      // 格式化list中的时间
      list.forEach((item, index, arr) => {
        let date = new Date(item.date);
        arr[index].date = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
      });

      this.setData({
        list,
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
   * 点击确认兑换
   */
  confirmExchange: async function (event) {
    let { _id, index } = event.currentTarget.dataset;
    wx.showLoading({
      title: "确认兑换中...",
    });
    try {
      let res = await confirmExchange(_id);

      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }

      // 兑换成功,从列表中删除
      let list = this.data.list;
      list.splice(index, 1);
      this.setData({
        list,
      });
    } catch (error) {
      wx.showToast({
        title: error,
        icon: "error",
      });
    }
    wx.hideLoading({
      success: (res) => {},
    });
  },
});
