/**
 * @description 奖励新增审核
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
    let { _id, agree, content, score } = event.awardAgreeInfo;
    if (!_id || !(Object.is(agree, true) || Object.is(agree, false))) {
      return ERROR.NO_PARAMS;
    }

    let res = await db
      .collection("award_list")
      .doc(_id)
      .update({
        data: {
          agree: agree,
        },
      });
    
    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("审核奖励失败：", error);
    return ERROR.CHECK_AWARD_FAIL;
  }
};
