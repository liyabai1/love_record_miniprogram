/**
 * @description 确认奖励已被兑换
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
    let { _id } = event;

    if (!_id) {
      return ERROR.NO_PARAMS;
    }

    let res = await db
      .collection("exchange_list")
      .doc(_id)
      .update({
        data: {
          accomplish: true,
        },
      });

    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("确认兑换失败", error);
    return ERROR.CONFIRM_EXCHANGE_FAIL;
  }
};
