/**
 * @description 获取积分明细
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
    let { offset, limit } = event;

    if ((!offset && offset !== 0) || !limit) {
      return ERROR.NO_PARAMS;
    }
    offset = parseInt(offset);
    limit = parseInt(limit);

    // 积分详情总数
    let total = await db.collection("score_details").count();
    // 每页的数据
    let res = await db
      .collection("score_details")
      .aggregate()
      .sort({ achieveTime: -1 })
      .skip(offset)
      .limit(limit)
      .end();

    return {
      code: 200,
      result: {
        total: total.total,
        list: res.list,
      },
    };
  } catch (error) {
    console.error("查询积分明细失败:", error);
    return ERROR.GET_SCORE_DETAILS_FAIL;
  }
};
