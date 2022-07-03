/**
 * @description 任务审批
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
  try {
    let { _id, agree, content, score } = event.taskAgreeInfo;
    if (!_id || !(Object.is(agree, true) || Object.is(agree, false))) {
      return ERROR.NO_PARAMS;
    }

    // 开始修改任务的审批状态
    let res = await db
      .collection("task_list")
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
    console.log("任务审核失败：", error);
    return ERROR.CHECK_TASK_FAIL;
  }
};
