// components/taskItem/index.js
const { finishTask, deleteTask } = require("../../api/api");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    _id: String,
    content: String,
    score: Number,
    achieved: Boolean,
    // dailyTask => 完成任务页，  taskList => 新增任务页
    type: "dailyTask" | "taskList",
    // 选择的日期是否为当天，不为当天，则不能点击完成按钮
    isNowDay: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    touchPoint: {
      start: {
        x: 0,
        y: 0,
        timeStamp: 0,
      },
      timeStamp: 0,
    },
    // 显示删除按钮
    showDelBtn: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 触摸开始事件
     */
    touchstartHandler: function (event) {
      let x = event.changedTouches[0].pageX,
        y = event.changedTouches[0].pageY;
      this.setData({
        ["touchPoint.start"]: {
          x,
          y,
          timeStamp: event.timeStamp,
        },
      });
      // 判断是否为左滑
    },

    /**
     * 触摸结束事件
     */
    touchendHandler: function (event) {
      let endX = event.changedTouches[0].pageX,
        endY = event.changedTouches[0].pageY,
        endTimeStamp = event.timeStamp;
      let spendTime = endTimeStamp - this.data.touchPoint.start.timeStamp;

      // 如果花费的时间大于1000毫秒，则直接返回
      if (spendTime > 1000) {
        return;
      }

      // 移动开始与结束之间X,Y的距离
      let diffY = Math.abs(this.data.touchPoint.start.y - endY);
      let diffX = this.data.touchPoint.start.x - endX;
      // 角度极限
      let deg_limit = Math.sin((Math.PI / 180) * 20);
      // 如果滑动的角度过大，同样返回
      if (diffY / Math.abs(diffX) > deg_limit) {
        return;
      }

      // 滑动速度小于1.5即被认定为左滑
      let speed = Math.abs(diffX / spendTime);
      if (diffX > 0 && speed < 1.5) {
        this.setData({
          showDelBtn: true,
        });
      }

      // 右滑关闭按钮
      if (diffX < 0 && speed < 1.5) {
        this.setData({
          showDelBtn: false,
        });
      }
    },

    /**
     * 点击完成任务
     */
    finishTask: async function (event) {
      // 先提供反馈，显示已完成
      this.triggerEvent("changeAchievedState", { state: true });
      try {
        let res = await finishTask(this.properties._id);

        if (res.result.code !== 200) {
          this.triggerEvent("changeAchievedState", { state: false });
          throw res.result.errorMsg;
        }
      } catch (error) {
        wx.showToast({
          icon: "error",
          title: error,
        });
      }
    },

    /**
     * 点击删除任务
     */
    deleteTask: async function () {
      wx.showLoading({
        title: "删除中...",
      });

      try {
        let res = await deleteTask(this.properties._id);

        if (res.result.code !== 200) {
          throw res.result.errorMsg;
        }

        // 删除成功
        this.triggerEvent("deleteSuccess", {});
      } catch (error) {
        wx.showToast({
          title: error,
        });
      }

      wx.hideLoading({
        success: (res) => {},
      });
    },
  },

  lifetimes: {
    ready: function () {
      console.log(this.properties.isNowDay);
    },
  },
});
