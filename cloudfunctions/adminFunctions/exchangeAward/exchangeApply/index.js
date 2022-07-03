/**
 * @description 奖励兑换申请
 * @author Null_Li
 */
const getAwardDetails = require("../../awardApplyProcess/getAwardDetails/index");
const addRecordOnScoreDetails = require("../../addRecordOnScoreDetails/index");

const ERROR = require("../../error/error");

const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    let { _id } = event.awardInfo;
    if (!_id) {
      return ERROR.NO_PARAMS;
    }

    // 获取兑换的奖励信息
    let awardInfo = await getAwardDetails.main({ awardInfo: { _id: _id } }, null);
    awardInfo = awardInfo.result.data;

    // 获取当前的总积分
    let score = await db
      .collection("score_details")
      .aggregate()
      .sort({ achieveTime: -1 })
      .skip(0)
      .limit(1)
      .end();
    score = score.list[0].nowScore || 0;

    // 判断当前积分是否满足兑换奖励
    if (score < awardInfo.score) {
      return {
        code: 201,
        result: "当前积分不足",
      };
    }

    // 添加记录
    let res = await db.collection("exchange_list").add({
      data: {
        date: new Date(),
        awardInfo: awardInfo,
        accomplish: false,
      },
    });

    // 给积分明细里添加兑换的奖励
    await addRecordOnScoreDetails.main(awardInfo);

    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("申请兑换失败", error);
    return ERROR.APPLY_EXCHANGE_FAIL;
  }
};
