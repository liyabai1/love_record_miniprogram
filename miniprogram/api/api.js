const cloudFunctionName = "adminFunctions";

/**
 * 获取每日需完成的任务
 */
export const getTaskList = () => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "getTaskList",
    },
  });
};

/**
 * 获取已完成的任务列表
 */
export const getDailyTask = (date) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "getDailyTask",
      date: date,
    },
  });
};

/**
 * 获取总积分
 */
export const getAllScore = () => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "getNowScore",
    },
  });
};

/**
 * 获取积分明细
 */
export const getScoreDetails = ({ offset = 0, limit = 10 }) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "getScoreDetails",
      limit,
      offset,
    },
  });
};

/**
 * 申请新增任务
 */
export const taskApply = ({ content, score }) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "taskApply",
      taskInfo: {
        content,
        score,
      },
    },
  });
};

/**
 * 获取待审核的任务列表
 */
export const getPendingApplyTaskList = () => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "getPendingCheckTask",
    },
  });
};

/**
 * 获取任务详情
 */
export const getTaskDetails = (_id) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "getTaskDetails",
      id: _id,
    },
  });
};

/**
 * 审核新增任务
 */
export const checkTask = ({ _id, agree, content, score }) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "taskCheck",
      taskAgreeInfo: {
        _id,
        agree,
        content,
        score,
      },
    },
  });
};

/**
 * 获取奖励列表
 */
export const getAwardList = () => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "getAwardList",
    },
  });
};

/**
 * 兑换奖励
 */
export const exchangeAward = (_id) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "exchangeApply",
      awardInfo: {
        _id,
      },
    },
  });
};

/**
 * 完成任务
 */
export const finishTask = (_id) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "finishTask",
      finishTaskInfo: {
        _id,
      },
    },
  });
};

/**
 * 删除任务
 */
export const deleteTask = (_id) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "deleteTask",
      _id,
    },
  });
};

/**
 * 奖励新增申请
 */
export const awardApply = ({ content, score }) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "awardApply",
      awardInfo: {
        content,
        score,
      },
    },
  });
};

/**
 * 获取待审核的奖励列表
 */
export const getPendingApplyAwardList = () => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "getPendingCheckAward",
    },
  });
};

/**
 * 获取奖励详情
 */
export const getAwardDetails = (_id) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "getAwardDetails",
      awardInfo: {
        _id,
      },
    },
  });
};

/**
 * 奖励审核
 */
export const awardCheck = ({ _id, agree, content, score }) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "awardCheck",
      awardAgreeInfo: {
        _id,
        agree,
        content,
        score,
      },
    },
  });
};

/**
 * 获取待兑换的奖励列表
 */
export const getPendingExchangeList = () => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "getExchangeList",
    },
  });
};

/**
 * 确认兑换
 */
export const confirmExchange = (_id) => {
  return wx.cloud.callFunction({
    name: cloudFunctionName,
    data: {
      type: "confirmExchange",
      _id,
    },
  });
};

/**
 * 获取openid
 */
export const getOpenid = () => {
  return wx.cloud.callFunction({
    name:cloudFunctionName,
    data:{
      type: "getOpenid",
    }
  })
}

export default {
  getTaskList,
  getDailyTask,
  getAllScore,
  getScoreDetails,
  taskApply,
  getPendingApplyTaskList,
  getTaskDetails,
  checkTask,
  getAwardList,
  exchangeAward,
  finishTask,
  deleteTask,
  awardApply,
  getPendingApplyAwardList,
  awardCheck,
  getAwardDetails,
  getPendingExchangeList,
  confirmExchange,
  getOpenid,
};
