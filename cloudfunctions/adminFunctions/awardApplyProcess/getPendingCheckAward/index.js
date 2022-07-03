/**
 * @description 获取待审核的任务列表
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
      .collection("award_list")
      .where({
        agree: null,
      })
      .get();
    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("获取待审核列表失败", error);
    return ERROR.GET_PENDING_CHECK_AWARD_FAIL;
  }
};
