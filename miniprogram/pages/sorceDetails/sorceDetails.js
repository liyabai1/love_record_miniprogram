// pages/sorceDetails/sorceDetails.js
const { getScoreDetails } = require("../../api/api");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    total: 0, // 积分总条数
    limit: 10,
    offset: 0,
    scoreDetailsList: [],
    isLastData: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getScoreDetails({ offset: this.data.offset, limit: this.data.limit });
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
   * 下拉至底部事件
   */
  loadMoreData: function () {
    this.getScoreDetails({ offset: this.data.offset, limit: this.data.limit });
  },

  /**
   * 获取积分详情
   */
  getScoreDetails: async function ({ offset, limit }) {
    // 判断当前offset是否已经超出了total范围
    if (this.data.isLastData) {
      wx.showToast({
        title: "到底啦！🙂",
      });
      return;
    }

    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    try {
      let res = await getScoreDetails({ offset, limit });
      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }

      let { list, total } = res.result.result;

      // 修改时间格式
      list.forEach((item, index, arr) => {
        let date = new Date(item.achieveTime);
        let time = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        arr[index].achieveTime = time;
      });

      let nowOffset = this.data.offset + this.data.limit;

      // 判断是否数据到底了
      if (nowOffset >= total) {
        this.setData({
          isLastData: true,
        });
      }

      this.setData({
        total,
        scoreDetailsList: [...this.data.scoreDetailsList, ...list],
        offset: nowOffset,
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
