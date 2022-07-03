/**
 * @description 获取兑换的详情
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
    let { _id } = event.exchangeInfo;
    if (!_id) {
      return ERROR.NO_PARAMS;
    }

    let res = await db.collection("exchange_list").doc(_id).get();

    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("获取待兑换的奖励详情失败", error);
    return ERROR.GET_EXCHANGE_DETAILS_FAIL;
  }
};
