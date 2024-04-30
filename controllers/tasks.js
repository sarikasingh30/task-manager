const Tasks = require("../models/tasks");

const getAllTasks = async (req, res) => {
  // console.log("hello,,,,,,,,,,")
  try {
    const tasks = await Tasks.find({});
    res.status(201).json(tasks);
    // console.log(tasks);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// POST ROUTE
const createTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // res.end(`<h1>Add task</h1>`)
};

const getTask = async (req, res) => {
  try {
    let { id: ans } = req.params;
  //   console.log(ans)
  const task = await Tasks.findOne({ _id: ans });
  if (!task) {
    return res.status(400).json(`No task with id : ${ans}`);
  }
  res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // res.end(`<h1>Single Task</h1>`)
};
const updateTask = async (req, res) => {
  let { id: ans } = req.params;
  const task = await Tasks.findByIdAndUpdate({ _id: ans }, req.body);
  res.status(201).json({ task });
//   res.end(`<h1>Update Item</h1>`);
};
const deleteTask = async (req, res) => {
  let { id: ans } = req.params;
  const task = await Tasks.findOneAndDelete({ _id: ans });
  res.status(201).json({ task });
  res.end(`<h1>Delete Item</h1>`);
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
