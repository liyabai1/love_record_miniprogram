/**
 * @description 获取奖励详情
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
    let awardInfo = event.awardInfo;

    if (!awardInfo._id) {
      return ERROR.NO_PARAMS;
    }

    let res = await db.collection("award_list").doc(awardInfo._id).get();

    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("获取奖励详情失败：", error);
    return ERROR.GET_AWARD_DETAILS_FAIL;
  }
};
