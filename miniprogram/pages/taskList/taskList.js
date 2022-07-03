// pages/taskList/taskList.js
const { getTaskList } = require("../../api/api");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    taskList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTaskList();
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
    this.getTaskList();
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
   * 获取任务列表
   */
  getTaskList: async function () {
    wx.showLoading({
      title: "加载中",
    });

    try {
      // 获取完成的任务列表
      let res = await getTaskList();

      // 关闭loading
      wx.hideLoading({
        success: (res) => {},
      });

      // 判断是否获取到数据
      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }
      let taskList = res.result.result.data;

      // 赋值
      this.setData({
        taskList: taskList,
      });

      // 将taskList返回
      return taskList;
    } catch (error) {
      wx.hideLoading({
        success: (res) => {},
      });
    }
  },

  /**
   * 点击新增任务页面跳转
   */
  navTo: function () {
    wx.navigateTo({
      url: "/pages/taskApplyProcess/taskApply/taskApply",
    });
  },

  /**
   * 删除成功
   */
  deleteSuccess: function (event) {
    let { index } = event.currentTarget.dataset;
    let taskList = this.data.taskList;
    taskList.splice(index, 1);
    this.setData({
      taskList,
    });
  },
});
