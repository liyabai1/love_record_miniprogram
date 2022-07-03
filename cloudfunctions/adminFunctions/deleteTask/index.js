/**
 * @description 删除任务
 * @author Null_Li
 */

const ERROR = require("../error/error");

const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    let { _id } = event;

    if (!_id) {
      return ERROR.NO_PARAMS;
    }

    let res = await db.collection("task_list").doc(_id).remove();

    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("删除任务失败", error);
    return ERROR.DELETE_TASK_FAIL;
  }
};
