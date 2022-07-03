/* 配置权限表 */
module.exports = {
  // 获取每日任务的完成情况
  getDailyTask: {
    boy: true,
    girl: true,
  },
  // 提交新增任务
  taskApply: {
    boy: true,
    girl: false,
  },
  // 任务审核
  taskCheck: {
    boy: false, // false
    girl: true,
  },
  // 获取待审核的任务
  getPendingCheckTask: {
    boy: true,
    girl: true,
  },
  // 获取待审核任务详情
  getTaskDetails: {
    boy: true,
    girl: true,
  },
  // 完成任务
  finishTask: {
    boy: false, // false
    girl: true,
  },
  // 获取任务列表
  getTaskList: {
    boy: true,
    girl: true,
  },
  // 获取奖励列表
  getAwardList: {
    boy: true,
    girl: true,
  },
  // 奖励新增申请
  awardApply: {
    boy: false, // false
    girl: true,
  },
  // 获取待审核的奖励列表
  getPendingCheckAward: {
    boy: true,
    girl: true,
  },
  // 获取奖励详情
  getAwardDetails: {
    boy: true,
    girl: true,
  },
  // 奖励审核
  awardCheck: {
    boy: true,
    girl: false,
  },
  // 获取积分详情
  getScoreDetails: {
    boy: true,
    girl: true,
  },
  // 申请兑换
  exchangeApply: {
    boy: false, //false
    girl: true,
  },
  // 获取待兑换的列表
  getExchangeList: {
    boy: true,
    girl: true,
  },
  // 获取兑换的详情
  getExchangeDetails: {
    boy: true,
    girl: true,
  },
  // 确认兑换
  confirmExchange: {
    boy: true,
    girl: false,
  },
  // 获取当前总积分
  getNowScore: {
    boy: true,
    girl: true,
  },
  // 删除任务
  deleteTask: {
    boy: true,
    girl: true,
  },
  // 删除奖励
  deleteAward: {
    boy: true,
    girl: true,
  },
};
