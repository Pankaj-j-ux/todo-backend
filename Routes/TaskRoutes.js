/** @format */

const express = require("express");
const {
  createTask,
  updateTask,
  taskStatus,
  deleteTask,
  getTask,
} = require("../Controllers/TaskControllers");
const router = express.Router();

router.route("/createtask").post(createTask);
router.route("/updatetask").post(updateTask);
router.route("/taskstatus").post(taskStatus);
router.route("/deletetask").post(deleteTask);
router.route("/gettask").post(getTask);

module.exports = router;
