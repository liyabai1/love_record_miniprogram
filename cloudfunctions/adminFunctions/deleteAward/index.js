/**
 * @description 删除奖励
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

    let res = await db.collection("award_list").doc(_id).remove();

    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("删除奖励失败", error);
    return ERROR.DELETE_AWARD_FAIL;
  }
};
