/**
 * @description 获取待确定的兑换列表
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
      .collection("exchange_list")
      .where({
        accomplish: false,
      })
      .get();

    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("获取兑换列表失败", error);
    return ERROR.GET_EXCHANGE_LIST_FAIL;
  }
};
