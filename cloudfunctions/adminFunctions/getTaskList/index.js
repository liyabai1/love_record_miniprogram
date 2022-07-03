/**
 * @description 获取任务列表 用于展示在当日任务
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
    let res = await db
      .collection("task_list")
      .where({
        agree: true,
      })
      .get();

    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("获取任务列表失败", error);
    return;
  }
};
