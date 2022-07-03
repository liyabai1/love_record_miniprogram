/**
 * @description 获取待通过的任务
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
    let res = await db
      .collection("task_list")
      .where({
        agree: null,
      })
      .get();

    return {
      code: 200,
      result: res,
    };
  } catch (err) {
    console.error("获取待通过的任务失败:", err);
    return ERROR.GET_PENDING_CHECK_TASK_FAIL;
  }
};
