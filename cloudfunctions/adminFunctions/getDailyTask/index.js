/**
 * @description 根据日期获取每日任务完成情况
 * @author Null_Li
 */
const ERROR = require("../error/error");

const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, content) => {
  console.log("传入时间: ", event.date);
  let date = new Date(new Date(event.date).getTime() + 1000 * 60 * 60 * 8); // 注意服务器端使用的是格林标准时间
  console.log("转换后时间: ", date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  console.log("年 月 日", year, month, day);
  let startTime = new Date(`${year}/${month}/${day} 00:00:00`);
  let endTime = new Date(`${year}/${month}/${day} 23:59:59`);
  try {
    let res = await db
      .collection("everyday_task")
      .where({
        date: _.and(_.gte(startTime), _.lte(endTime)),
      })
      .get();
    return {
      code: 200,
      result: res,
    };
  } catch (error) {
    console.log("获取每日任务失败");
    console.error(error);
    return ERROR.GET_DAILY_TASK_FAIL;
  }
};
