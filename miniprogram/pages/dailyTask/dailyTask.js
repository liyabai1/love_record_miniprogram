// index.js
// const app = getApp()
const { envList } = require("../../envList.js");
const { getTaskList, getDailyTask } = require("../../api/api");
const Toast = require("../../miniprogram_npm/@vant/weapp/toast/toast.js").default;
/**
 * TODO: 不是当前日期不能点击完成任务
 */
Page({
  data: {
    vantCalendar: {
      calendarShow: false, // 日历显示
      minDate: new Date().getTime() - 1000 * 60 * 60 * 24 * 365, // 可选择的最小日期
      maxDate: new Date().getTime(),
    },
    selectedDate: {
      date: new Date().getDate(),
      time: new Date(),
    }, // 选择的日期
    isNowDay: true, // 选择的日期是否为当天
    dateArr: [
      {
        day: "一",
        date: 0,
        time: 0,
      },
      {
        day: "二",
        date: 0,
        time: 0,
      },
      {
        day: "三",
        date: 0,
        time: 0,
      },
      {
        day: "四",
        date: 0,
        time: 0,
      },
      {
        day: "五",
        date: 0,
        time: 0,
      },
      {
        day: "六",
        date: 0,
        time: 0,
      },
      {
        day: "日",
        date: 0,
        time: 0,
      },
    ], // 顶部日期
    taskList: [], // 需完成的任务列表
    achievedTaskList: [], // 已完成的任务列表
  },

  async onLoad() {
    // 设置顶部日期格式
    this.setDateArr();
    // 获取需完成的任务
    let taskList = await this.getTaskList();
    // 获取当天完成的任务
    let achieveTask = await this.getDailyTask(new Date());
    // 当日任务是否完成
    this.checkAchieved(taskList, achieveTask);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    // 日期变为原来的日期
    this.setData({
      selectedDate: {
        date: new Date().getDate(),
        time: new Date(),
      },
      isNowDay: true,
    });
    // 设置顶部日期格式
    this.setDateArr();
    // 获取需完成的任务
    let taskList = await this.getTaskList();
    // 获取当天完成的任务
    let achieveTask = await this.getDailyTask(new Date());
    // 当日任务是否完成
    this.checkAchieved(taskList, achieveTask);
    // 关闭下拉刷新
    wx.stopPullDownRefresh({
      success: (res) => {},
    });
  },

  /**
   * 设置日期
   * @param {Date} now 当前选择的日期
   */
  setDateArr: function (now = new Date()) {
    // let now = new Date();
    let day = now.getDay();
    let arr1 = [];
    let arr2 = [];
    for (let index = 0; index < day - 1; index++) {
      let time = new Date(now.getTime() - (day - 1 - index) * (1000 * 60 * 60 * 24));
      let date = time.getDate();
      arr1[index] = {
        date,
        time,
      };
    }

    // 如果day为0，星期天
    if (day === 0) {
      for (let index = 0; index < 7; index++) {
        let time = new Date(now.getTime() - (6 - index) * (1000 * 60 * 60 * 24));
        let date = time.getDate();
        arr2[index] = {
          time,
          date,
        };
      }
    } else {
      for (let index = 0; index <= 7 - day; index++) {
        let time = new Date(now.getTime() + index * (1000 * 60 * 60 * 24));
        let date = time.getDate();
        arr2[index] = {
          date,
          time,
        };
      }
    }
    let arr = [...arr1, ...arr2];

    arr.forEach(({ date, time }, index) => {
      this.setData({
        [`dateArr[${index}].date`]: date,
        [`dateArr[${index}].time`]: time.getTime(),
      });
    });
  },

  /**
   * 显示切换日历选择器
   */
  showCalendar: function () {
    this.setData({
      [`vantCalendar.calendarShow`]: !this.data.vantCalendar.calendarShow,
    });
  },

  /**
   * 确定选择日期
   * @param {*} event
   */
  changeDate: async function (event) {
    // 改变顶部的日期选择器
    this.setDateArr(event.detail);
    // 改变选择的日期
    this.setData({
      [`selectedDate.date`]: event.detail.getDate(),
      [`selectedDate.time`]: event.detail,
      isNowDay: event.detail.toLocaleDateString() === new Date().toLocaleDateString(),
    });
    // 关闭日期选择器
    this.showCalendar();

    // 获取该天的已完成任务
    await this.getDailyTask(event.detail);
    // 检查该天任务的完成情况
    this.checkAchieved(this.data.taskList, this.data.achievedTaskList);
  },

  /**
   * 顶部日期选择器确定选择日期
   */
  changeDateOnTopCalendar: async function (event) {
    let date = new Date(event.currentTarget.dataset.time);

    // 如果当前的时间选择大于当天，则不能被选择
    if (date > new Date()) {
      Toast("无法选择");
      return;
    }

    // 改变当前选择的日期
    this.setData({
      [`selectedDate.date`]: date.getDate(),
      [`selectedDate.time`]: date,
      isNowDay: date.toLocaleDateString() === new Date().toLocaleDateString(),
    });

    // 获取该天的已完成任务
    await this.getDailyTask(date);
    // 检查该天任务的完成情况
    this.checkAchieved(this.data.taskList, this.data.achievedTaskList);
  },

  /**
   * 获取需完成的任务列表
   */
  getTaskList: async function () {
    try {
      // 获取完成的任务列表
      let res = await getTaskList();

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
      console.error("获取失败", error);
      wx.showToast({
        icon: "error",
        title: error,
      });
    }
  },

  /**
   * 获取该天的完成任务情况
   */
  getDailyTask: async function (date) {
    wx.showLoading({
      mask: true,
      title: "加载中",
    });

    try {
      // 获取这一天完成的任务
      let res = await getDailyTask(date);

      // 判断是否获取到该有的数据
      if (res.result.code !== 200) {
        throw res.result.errorMsg;
      }
      let dailyTask = res.result.result.data[0];

      if (dailyTask) {
        dailyTask = dailyTask.achieveTasks;
      } else {
        dailyTask = [];
      }
      console.log("已完成的任务", dailyTask);
      // 赋值
      this.setData({
        achievedTaskList: dailyTask,
      });

      wx.hideLoading({
        success: (res) => {},
      });

      // 返回
      return dailyTask;
    } catch (error) {
      console.error("获取该天完成的任务失败", error);
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
   * 检查当日任务的完成情况
   */
  checkAchieved: function (taskList, achieveTask) {
    // 判断传入的参数不为undefined
    if (!taskList || !achieveTask) {
      wx.showToast({
        icon: "error",
        title: "遇到了预期之外的错误",
      });
      return;
    }

    // 循环taskList，判断其中是否有已完成的任务
    taskList.forEach((taskItem, index, list) => {
      let achieveItem = false;
      for (let index = 0; index < achieveTask.length; index++) {
        const element = achieveTask[index];
        if (element._id === taskItem._id) {
          achieveItem = true;
        }
      }
      list[index].achieved = achieveItem;
    });

    // 将新的带有是否完成任务的taskList赋值
    this.setData({
      taskList: taskList,
    });

    console.table(this.data.taskList);
  },

  /**
   * task-item组件传递事件，点击完成任务按钮
   */
  finishTask: function (event) {
    let { index } = event.currentTarget.dataset;
    let { state } = event.detail;
    this.setData({
      [`taskList[${index}].achieved`]: state,
    });
  },
});
