/** @format */
const Task = require("./../Models/task");

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, createdBy } = req.body;
    if (title == "") {
      throw new Error("Title is missing!");
    }

    const newtask = new Task({
      title,
      description,
      status: false,
      createdBy,
    });

    const result = await newtask.save();

    res.status(200).json({
      status: "success",
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Error form Create Task", err);
    res.status(500).json({
      status: "failure",
      success: false,
      message: err.message,
    });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, createdBy, _id } = req.body;

    const result = await Task.updateOne(
      { _id },
      {
        title,
        description,
      }
    );

    res.status(200).json({
      status: "success",
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Error form Update Task", err);
    res.stauts(500).json({
      status: "failure",
      success: false,
      message: err.message,
    });
  }
};

exports.taskStatus = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const result = await Task.updateOne({ _id }, { status: true });

    res.status(200).json({
      status: "success",
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Error form Task status", err);
    res.status(500).json({
      status: "failure",
      success: false,
      message: err.message,
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const result = await Task.deleteOne({ _id });

    res.status(200).json({
      status: "success",
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Error form Delete Task", err);
    res.status(500).json({
      status: "failure",
      success: false,
      message: err.message,
    });
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const incompleteTask = await Task.find({
      createdBy: userId,
      status: false,
    }).sort({ createdAt: -1 });
    const completeTask = await Task.find({
      createdBy: userId,
      status: true,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      success: true,
      data: {
        incompleteTask,
        completeTask,
      },
    });
  } catch (err) {
    console.log("Error form Get Task ", err);
    res.stauts(500).json({
      stauts: "failure",
      success: false,
      message: err.message,
    });
  }
};
