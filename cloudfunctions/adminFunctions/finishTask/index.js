/**
 * @description 完成某一项任务
 * @author Null_Li
 */
const ERROR = require("../error/error");
const getDailyTask = require("../getDailyTask/index");
const getTaskDetails = require("../taskApplyProcess/getTaskDetails/index");
const addRecordOnScoreDetails = require("../addRecordOnScoreDetails/index");

const cloud = require("wx-server-sdk");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;

// 当天无记录，向数据库中增加记录
const addRecord = async (taskInfo) => {
  return db.collection("everyday_task").add({
    data: {
      date: new Date(),
      achieveTasks: [taskInfo],
    },
  });
};

// 当前有记录，向数据库中补充
const pushTask = async (_id, taskInfo) => {
  return db
    .collection("everyday_task")
    .doc(_id)
    .update({
      data: {
        achieveTasks: _.push([taskInfo]),
      },
    });
};

exports.main = async (event, context) => {
  try {
    let finishTaskInfo = event.finishTaskInfo;
    // 首先确定当天是否有完成的任务
    // 如果没有，则在everyday_task中新建一条记录
    // 如果有，则将其添加在everyday_task记录中的
    let recordOnToday = await getDailyTask.main({ date: new Date().getTime() }, null);
    if (recordOnToday.code !== 200) {
      throw new Error("获取当天完成的任务失败");
    }
    recordOnToday = recordOnToday.result.data[0];
    let taskInfo = await getTaskDetails.main({ id: finishTaskInfo._id }, null);
    if (taskInfo.code !== 200) {
      throw new Error("获取完成任务的信息失败");
    }
    taskInfo = taskInfo.result.data; // 任务详情

    if (!taskInfo) {
      throw new Error("获取完成任务的信息失败");
    }

    res = null;
    // recordOnToday为undefined,则表示改天没有记录,添加记录
    if (!recordOnToday) {
      res = await addRecord(taskInfo);

      // 向积分明细中添加记录
      await addRecordOnScoreDetails.main(taskInfo);
    } else {
      // 判断当前完成的任务中，在数据库中有没有被记录
      let hasThisTask = recordOnToday.achieveTasks.some((item) => item._id === finishTaskInfo._id);
      res = hasThisTask
        ? { code: 200, result: "已添加该条记录" }
        : await pushTask(recordOnToday._id, taskInfo);

      // 向积分明细中添加记录
      hasThisTask ? null : await addRecordOnScoreDetails.main(taskInfo);
    }


    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.error("完成任务失败", error);
    console.error(error)
    return ERROR.FINIASH_TASK_FAIL;
  }
};
