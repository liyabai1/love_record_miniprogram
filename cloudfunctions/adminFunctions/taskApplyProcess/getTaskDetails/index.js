/**
 * @description 获取任务详情
 * @author Null_Li
 */
const ERROR = require("../../error/error");

const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    let id = event.id;

    if (!id) {
      return ERROR.NO_PARAMS;
    }

    let res = await db.collection("task_list").doc(id).get();
    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.log("获取任务详情失败：", error);
    return ERROR.GET_TASK_DETAILS_FAIL;
  }
};
