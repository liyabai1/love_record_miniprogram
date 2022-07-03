/**
 * @description 增加任务申请
 * @author Null_Li
 */
const ERROR = require("../../error/error");

const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  let { content, score } = event.taskInfo;
  if (!content || !score) {
    return ERROR.NO_PARAMS;
  }

  try {
    // 向数据库中写入记录
    let res = await db.collection("task_list").add({
      data: {
        type: "task",
        content,
        score,
        agree: null,
      },
    });

    

    return {
      code: 200,
      result: res,
    };
  } catch (err) {
    console.error("任务申请失败", err);
    return ERROR.APPLY_TASK_FAIL;
  }
};
