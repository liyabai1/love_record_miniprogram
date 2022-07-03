/**
 * @description 获取当前的总积分
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
      .collection("score_details")
      .aggregate()
      .sort({ achieveTime: -1 })
      .skip(0)
      .limit(1)
      .end();

    // 如果获取的列表为空，则表示当前为初始状态，返回积分为0
    if (res.list.length === 0) {
      res.list[0] = {
        nowScore: 0,
      };
    }

    return {
      code: 200,
      result: res.list[0].nowScore,
    };
  } catch (error) {
    console.error("获取当前总积分失败", error);
    return ERROR.GET_NOW_SCORE_FAIL;
  }
};
