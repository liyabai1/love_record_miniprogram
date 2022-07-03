const process = require("process");
const ERROR = require("./error/error");
const permissionmap = require("./permission/permissionmap");
const getOpenid = require("./getOpenid/index");
const getDailyTask = require("./getDailyTask/index");
const taskApply = require("./taskApplyProcess/taskApply/index");
const taskCheck = require("./taskApplyProcess/taskCheck/index");
const getPendingCheckTask = require("./taskApplyProcess/getPendingCheckTask/index");
const getTaskDetails = require("./taskApplyProcess/getTaskDetails/index");
const finishTask = require("./finishTask/index");
const getTaskList = require("./getTaskList/index");
const getAwardList = require("./getAwardList/index");
const awardApply = require("./awardApplyProcess/awardApply/index");
const getPendingCheckAward = require("./awardApplyProcess/getPendingCheckAward/index");
const getAwardDetails = require("./awardApplyProcess/getAwardDetails/index");
const awardCheck = require("./awardApplyProcess/awardCheck/index");
const getScoreDetails = require("./getScoreDetails/index");
const exchangeApply = require("./exchangeAward/exchangeApply/index");
const getExchangeList = require("./exchangeAward/getExchangeList/index");
const getExchangeDetails = require("./exchangeAward/getExchangeDetails/index");
const confirmExchange = require("./exchangeAward/confirmExchange/index");
const getNowScore = require("./getNowScore/index");
const deleteTask = require("./deleteTask/index");
const deleteAward = require("./deleteAward/index");

// 云函数入口函数
exports.main = async (event, context) => {
  // 判断发起请求的用户是否为配置的用户
  let { openid, unionid } = await getOpenid(event, context);
  let { boy_openid, girl_openid } = process.env;
  /* 没有配置环境变量 */
  if (!boy_openid || !girl_openid) {
    console.error("暂未配置环境变量，请查阅文档，配置云函数的相关环境变量");
    return {
      errorCode: 3,
      errorMsg: "暂未配置环境变量",
    };
  }

  /* 如果请求的用户openid与配置的环境变量不符，则直接返回 */
  if (!(openid === boy_openid || openid === girl_openid)) {
    console.warn("该用户暂未配置权限，用户unionid", unionid);
    return {
      errorCode: 2,
      errorMsg: "暂无权限",
    };
  }

  let user = null;
  /* 识别是♂还是♀ , user 的名称必须与permissionmap中的字段名一致 */
  if (openid === boy_openid) {
    user = "boy";
  } else {
    user = "girl";
  }

  let res = null;
  switch (event.type) {
    case "getDailyTask":
      res = permissionmap[event.type][user]
        ? await getDailyTask.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "taskApply":
      res = permissionmap[event.type][user]
        ? await taskApply.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "taskCheck":
      res = permissionmap[event.type][user]
        ? await taskCheck.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getPendingCheckTask":
      res = permissionmap[event.type][user]
        ? await getPendingCheckTask.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getTaskDetails":
      res = permissionmap[event.type][user]
        ? await getTaskDetails.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "finishTask":
      res = permissionmap[event.type][user]
        ? await finishTask.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getTaskList":
      res = permissionmap[event.type][user]
        ? await getTaskList.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getAwardList":
      res = permissionmap[event.type][user]
        ? await getAwardList.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "awardApply":
      res = permissionmap[event.type][user]
        ? await awardApply.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getPendingCheckAward":
      res = permissionmap[event.type][user]
        ? await getPendingCheckAward.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getAwardDetails":
      res = permissionmap[event.type][user]
        ? await getAwardDetails.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "awardCheck":
      res = permissionmap[event.type][user]
        ? await awardCheck.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getScoreDetails":
      res = permissionmap[event.type][user]
        ? await getScoreDetails.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "exchangeApply":
      res = permissionmap[event.type][user]
        ? await exchangeApply.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getExchangeList":
      res = permissionmap[event.type][user]
        ? await getExchangeList.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getExchangeDetails":
      res = permissionmap[event.type][user]
        ? await getExchangeDetails.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "confirmExchange":
      res = permissionmap[event.type][user]
        ? await confirmExchange.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getNowScore":
      res = permissionmap[event.type][user]
        ? await getNowScore.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "deleteTask":
      res = permissionmap[event.type][user]
        ? await deleteTask.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "deleteAward":
      res = permissionmap[event.type][user]
        ? await deleteAward.main(event, context)
        : ERROR.NO_PERMISSSION;
      return res;
    case "getOpenid":
      return {openid, userGender: user};
    default:
      return {
        errorCode: 1,
        errorMessage: "没有该云函数",
      };
  }
};
