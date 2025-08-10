import React, { useCallback, useMemo, useState } from 'react'
import TaskListSidebar from './TaskListSidebar';
import clsx from 'clsx';
import FolderImg from "../assets/folder.svg"
import SearchTasks from './ui/SearchTasks';
import TaskTile from "./TaskTile";

const TaskList = ({
  tasks,
  fetchAlltasks,
  showViewTaskScreen,
  showEditTaskScreen,
  setActiveTaskId,
  setTasks,
  changeTaskStatus,
  boardView,
  setBoardView,
  showCreateTaskScreen
}) => {

  const [searchQuery ,setSearchQuery]=useState("");
  const [filteredTask,setFilteredTask]= useState([]);

  const showSearchResults = useMemo(()=>Boolean(searchQuery.trim().length),[]);

  const handleViewTask = useCallback((taskId)=>{
    setActiveTaskId(taskId);
    showViewTaskScreen();
  },[])
 
  return (
    <div className="task-list-screen content-section">
      {/*left Sidebar */}
      <div className="task-list-lef-container">
        <p className="task-heading">🔥 Task</p>
        {/*Task Sidebar */}
        <TaskListSidebar
          boardView={boardView}
          setBoardView={setBoardView}
          setTasks={setTasks}
        />
      </div>
      {/* Right SideBar*/}

      {/**right sidebar */}
      <div className="task-list-right-conatiner">
        {/*Header with search and add task button*/}
        <div className="task-list-right-header">
          {/**search tasks componets */}
          <SearchTasks
            placeholder="Search title and description"
            tasks={tasks}
            setFilteredTask={setFilteredTask}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
       
          {/**Button to add new task */}
          <button
            className="add-task-btn cursor-pointer"
            onClick={showCreateTaskScreen}
          >
            <img src={FolderImg} alt="add task icon" />
            Add New Task
          </button>
        </div>

        {/**Task List Section */}
        <div
          className={clsx("task-list-right-section", boardView && "board-view")}
        >
          {/**if user has searched anything ,show search results ; otherwise show tasks based on sidebar options */}

          {showSearchResults
            ? filteredTask
            : tasks.map((task) => (
                <TaskTile
                  key={`${task._id}-${
                    showSearchResults ? "result-tile" : "task-tile"
                  }`}
                  task={task}
                  onClick={() => handleViewTask(task._id)}
                fetchAllTasks={fetchAlltasks}
                  changeTaskStatus={changeTaskStatus}
                  setActiveTaskId={setActiveTaskId}
                  showEditTaskScreen={showEditTaskScreen}
                  boardView={boardView}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;