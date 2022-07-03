// pages/mine/mine.js
const appInstance = getApp();
const { getAllScore, getOpenid } = require("../../api/api");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    score: 0,
    functionlist: [
      {
        name: "积分明细",
        path: "/pages/sorceDetails/sorceDetails",
      },
      {
        name: "奖励申请列表",
        path: "/pages/awardApplyProcess/awardApplyList/awardApplyList",
      },
      {
        name: "任务申请列表",
        path: "/pages/taskApplyProcess/taskApplyList/taskApplyList",
      },
      {
        name: "确认兑换列表",
        path: "/pages/pendingExchangeList/pendingExchangeList",
      },
    ],
    userGender: "girl", // 如果是女，则不显示第二个订阅消息按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (appInstance.globalData.userinfo) {
      this.setData({
        userInfo: appInstance.globalData.userinfo,
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getScore();
    // 如果没有获取到openid，则获取openid
    if (!appInstance.globalData.openid) {
      getOpenid().then((res) => {
        let { openid, userGender } = res.result;
        console.log(openid, userGender);
        this.setData({
          userGender,
        });
        appInstance.globalData.openid = openid;
      });
    }
  },

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
   * 获取用户信息
   */
  getUserInfo: function () {
    let _this = this;
    wx.getUserProfile({
      desc: "获取用户头像、昵称等信息",
      success: function (res) {
        _this.setData({
          userInfo: res.userInfo,
        });

        wx.setStorage({
          key: "userinfo",
          data: res.userInfo,
        }).then((res) => {
          wx.showToast({
            icon: "success",
            title: "登录成功",
          });
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
  },

  /**
   * 获取积分
   */
  getScore: async function () {
    try {
      let res = await getAllScore();
      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }
      this.setData({
        score: res.result.result,
      });
    } catch (error) {
      console.log("获取总积分失败", error);
      wx.showToast({
        icon: "error",
        title: error,
      });
    }
  },

  /**
   * 点击跳转
   */
  navTo: function (event) {
    let path = event.currentTarget.dataset.path;
    console.log(path);
    wx.navigateTo({
      url: path,
    })
      .then((res) => {})
      .catch((err) => {});
  }
});
