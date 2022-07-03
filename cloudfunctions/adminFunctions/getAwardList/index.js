/**
 * @description 获取奖励列表
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
      .collection("award_list")
      .where({
        agree: true,
      })
      .get();
    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("获取可兑换奖励列表失败", error);
    return ERROR.GET_AWARD_LIST_FAIL;
  }
};
