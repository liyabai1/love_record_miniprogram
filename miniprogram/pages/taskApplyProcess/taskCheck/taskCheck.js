// pages/taskApplyProcess/taskCheck/taskCheck.js
const { getTaskDetails, checkTask } = require("../../../api/api");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    _id: "",
    content: "",
    score: "",
    scene: 0, //场景值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 确定是从模板消息过来的
    if (options.source === "template") {
      // 获取场景值
      let { scene } = wx.getLaunchOptionsSync();
      this.setData({
        scene,
      });
    }

    let { _id, content, score } = options;

    // 当传入的参数没有content或者score时，请求数据
    if (!content || !score) {
      let awardInfo = await this.getTaskDetails(options._id);
      content = awardInfo.content;
      score = awardInfo.score;
    }

    // 对content解码
    content = decodeURIComponent(content);

    this.setData({
      _id: _id,
      content,
      score,
    });
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
   * 获取任务详情
   */
  getTaskDetails: async function (_id) {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    try {
      let res = await getTaskDetails(_id);

      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }

      wx.hideLoading({
        success: (res) => {},
      });

      return res.result.result.data;
    } catch (error) {
      wx.hideLoading({
        success: (res) => {},
      });

      wx.showToast({
        icon: "error",
        title: error,
      });
    }
  },

  /**
   * 点击按钮审核通过或拒绝
   */
  checkTask: async function (event) {
    wx.showLoading({
      title: "提交中...",
      mask: true,
    });

    try {
      let _id = this.data._id;
      let agree = event.target.dataset.agree;
      let { content, score } = this.data;
      let res = await checkTask({ _id, agree, content, score });

      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }

      // 如果场景值为1014或1107 ，则为订阅消息跳转，直接返回首页
      if (this.data.scene === 1014 || this.data.scene === 1107) {
        wx.switchTab({
          url: "/pages/dailyTask/dailyTask",
        });
        return;
      }

      wx.navigateBack({
        delta: 1,
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
