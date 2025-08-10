
import moment from "moment-timezone";
import Task from "../models/taskmodel.js";

const newTask = async (req, res) => {
  try {
    //1. Extract data from body
    const { title, description, due_date,labels } = req.body;

    //2. Validation on the incomming data
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description not found" });
    }

    let isDueDate;
    if(due_date){
        isDueDate = moment.tz(due_date,"Asia/Kolkata").toDate();
    }
    //3. Create document based on the schema
    const newTask = await Task.create({ title, description, due_date:isDueDate,labels});

    //Success Response
    res.status(200).json({
      success: true,
      message: "Task Created successfully",
      task: newTask,
    });
  } 
  catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: "Failed to Create task",
    });
  }
};

const getTasks = async(req,res)=>{
  console.log(req.query);
  try {
    const { page, sort_by, sort_type, status, limit = 10, labels } = req.query;

    let options = {};
    let query = {};

    //set sort option
    if (sort_by && [`added_on`, `due_date`].includes(sort_by)) {
      const sortOptions = {};
      sortOptions[sort_by] = sort_type === "desc" ? -1 : 1;
      options.sort = sortOptions;

     
    }

    //set filter options
    //set status filter
    if(status && status.length>0){
      const statusItems = JSON.parse(status);
      query.status ={$in:statusItems};
    }
    //set labels options

    if(labels && labels.length>0){
      const labelItems = JSON.parse(labels);
      query.labels ={$in:labelItems};
    }
    //pagination
    if(page){
      options.limit=parseInt(limit);
      options.skip =(parent(page)-1)*parseInt(limit);
    }

    //fetch tasks

    const tasks = await Task.find(query, null, options);
    res.status(200).json({success:true,tasks});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message:error.message });
  }
}

const updatedTask = async (req,res)=>{
try {
  const {id}=req.params;
  const {title,description,due_date}=req.body;
  if(!id){
    return res.status(400).json({success:false,message:"Task Ide is required"});
  }

  const task = await Task.findById(id);
  if(!task){
    return res.status(404).json({success:false,message:"Task not found"});
  }

  if(title) task.title =title;
  if(due_date) task.due_date=due_date;
  if (!due_date) task.due_date = null;
  if(description) task.description = description;

  const updatedTask = await task.save();
  res.status(200).json({success:true,task:updatedTask});
} catch (error) {
  console.error("Failed to update the task",error);
  res.status(500).json({ success: false, message: error.message });
}
}

const getLabels = async (req,res)=>{
  try {
    const labels = await Task.distinct("labels");

    // if(!labels.length){
    //   return res.status(404).json({success:false,message:"no labels found"});
    // }

    return res.status(200).json({ success: true, labels });
  } catch (error) {
    console.error("Failed ", error);
    res.status(500).json({ success: false, message: error.message });
  }

}

const updateLabels = async (req,res)=>{
try {
  const {id} = req.params;
  const labels =req.body;

  if(!id || !labels ||!Array.isArray(labels)){
    return res.status(404).json({success:false,message:"invalid input data"});
  }
    const task = await Task.findById(id);
  if(!task){
    return res.status(404).json({success:false,message:"No Task found"});
  }
  task.labels = labels;//update labels with new array
  const updateTask = await task.save();
  res.status(200).json({success:true,task:updateTask});


} catch (error) {
  console.error("Failed to add label in task ", error);
  res.status(500).json({ success: false, message: error.message });
}
}


const updateStatus = async (req,res)=>{
try {
  const {id}=req.params;
  const {status}=req.body;
  if(!id || !status){
    return res
      .status(404)
      .json({ success: false, message: "invalid input" });
  }
  if(!["Open","In-Progress","Completed"].includes(status)){
    return res.status(404).json({ success: false, message: "invalid status value" });
  }
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ success: false, message: "No Task found" });
  }
  task.status =status;
  const updateStatus = await task.save();
  res.status(200).json({ success: true, task: updateStatus});

} catch (error) {
  console.error("Failed to add label in task ", error);
  res.status(500).json({ success: false, message: error.message });
}
}

const deleteTask = async (req,res)=>{
try {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "task id required" });
  }
  await Task.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
  
    message: "deleted task successfully",
  });
}
  
 catch (error) {
  console.log("delete the task", error.message);
  res.status(400).json({
    success: false,
    message: " delete the task was unsuccessfull",
  });
}
}

export {newTask,getTasks,updatedTask,getLabels,updateLabels,updateStatus,deleteTask};