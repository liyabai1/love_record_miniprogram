/**
 * @description 新增记录至积分明细
 * @author Null_Li
 */
const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

exports.main = async (info) => {
  let score = 0; // 上一次的积分

  // 获取上一条记录的最后积分
  let res = await db
    .collection("score_details")
    .aggregate()
    .sort({ achieveTime: -1 })
    .skip(0)
    .limit(1)
    .end();
  console.log("上一个结果", res.list);

  // 如果上一条记录没有，则说明积分明细才初始化，应该为初始值0
  if (res.list.length !== 0) {
    score = res.list[0].nowScore;
  }

  let nowScore = score;
  // 判断当前的是完成任务还是兑换积分
  if (info.type === "task") {
    nowScore = score + info.score;
  } else {
    nowScore = score - info.score;
  }

  return db.collection("score_details").add({
    data: {
      achieveTime: new Date(),
      details: info,
      nowScore: nowScore,
    },
  });
};
