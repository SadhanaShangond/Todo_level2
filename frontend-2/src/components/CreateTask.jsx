import React, { useCallback, useState } from "react";
import UserIcon from "../assets/user-icon.png";
import TitleImg from "../assets/title-placeholder-img.svg";
import Memo from "../assets/memo.svg";
import  InputField  from "./ui/inputField";
// import { Calendar } from "lucide-react";
import Calendar from "../assets/calendar.svg";
import createTaskAPI from "./api/createTaskAPI";
import clsx from "clsx";

export const CreateTask = ({
  fetchAlltasks,
  showTaskListScreen,
  showNoTaskScreen,
  tasks,
}) => {
  const [taskTitle, setTaskTile] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState();
  const [loading, setLoading] = useState(false);

  // 3 states related to our tasks
  const handleTitleChange = useCallback(function (e) {
    setTaskTile(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback(function (e) {
    setTaskDescription(e.target.value);
  }, []);

  const handleDatechange = useCallback(function (date) {
    setTaskDueDate(date);
  }, []);

  const handleCancelButton = useCallback(
    function () {
      if (tasks.length) {
        showTaskListScreen();
      } else {
        showNoTaskScreen();
      }
    },
    [tasks.length]
  );

  // Validation
  const validate = useCallback(function (values) {
    const { taskTitle, taskDescription } = values;
    if (taskTitle && taskDescription) {
      return true;
    } else {
      const errorMsg = "Please fill out the title and description";
      console.error(errorMsg);
      return false;
    }
  }, []);
  const handleResponse = useCallback(
    function (responseData) {
      if (responseData.success) {
        console.log("Handled Successfully");
        fetchAlltasks();
      }
    },
    [fetchAlltasks]
  );

  const handleError = useCallback(function (errorMsg) {
    alert(errorMsg);
    console.log(errorMsg);
  }, []);

  const createNewTask = useCallback(
    function (values) {
      createTaskAPI(values, handleResponse, handleError, setLoading);
    },
    [handleError, handleResponse]
  );

  const handleAddTask = useCallback(() => {
    const values = {
      taskTitle,
      taskDescription,
      taskDueDate,
    };
    const isValid = validate(values);
    if (isValid) createNewTask(values);
  }, [createNewTask, taskDescription, taskTitle, taskDueDate, validate]);

  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={UserIcon} alt="" width={263} />
        <h1 className="create-task-title-text">Create New Task</h1>
        {/* custom input feild  for title*/}
        <InputField
          name={"new-task-title"}
          value={taskTitle}
          onChange={handleTitleChange}
          label={"Title"}
          type={"text"}
          inputImg={TitleImg}
          placeholder={"Title"}
        />
        {/* custom input feild  for description*/}
        <InputField
          name={"new-task-description"}
          value={taskDescription}
          onChange={handleDescriptionChange}
          label={"Description"}
          type={"textarea"}
          inputImg={Memo}
          placeholder={"description"}
          className={"input-margin"}
        />
        {/* custom input feild  for due date*/}
        <InputField
          name={"new-task-due-date"}
          value={taskDueDate}
          onChange={handleDatechange}
          label={"Due Date"}
          type={"date"}
          inputImg={Calendar}
          placeholder={"due date"}
          className={"input-margin"}
        />
        <div className="add-edit-task-btns">
          <button
            className={clsx(
              "btn",
              "add-task-btn",
              loading ? "disabled-add-task-btn" : "cursor-pointer"
            )}
            disabled={loading}
            onClick={handleAddTask}
          >
            {loading ? "Adding Task" : "Add Task"}
          </button>
          <button
            className="btn cancel-btn cursor-pointer"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;