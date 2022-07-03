/**
 * @description 任务新增申请
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
    let { content, score } = event.awardInfo;

    if (!content || !score) {
      return ERROR.NO_PARAMS;
    }

    let res = await db.collection("award_list").add({
      data: {
        type: "award",
        content,
        score,
        agree: null,
      },
    });

    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("申请奖励失败：", error);
    return ERROR.APPLY_AWARD_FAIL;
  }
};
