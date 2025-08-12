import React, { useCallback, useEffect, useMemo, useState } from 'react'
import fetchTaskAPI from "../components/api/fetchTaskAPI"
import  NoTask  from './NoTask';
import Loading  from './ui/Loading';
import  TaskList  from './TaskList';
import CreateTask  from './CreateTask';
import  Viewtask  from './Viewtask';
import  EditTask  from './EditTask';

const TaskMain = ( )=> {
    const [currComponent, setCurrComponent] = useState("taskList");
    const [tasks,setTasks] = useState([]);
    const [activeTaskId,setActiveTaskId]=useState("");
    const [boardView,setBoardView]=useState(false);


    const activeTask = useMemo(()=>{
     return tasks.find((task)=>task._id === activeTaskId); 
    },[tasks,activeTaskId]);

    const showNoTaskScreen = useCallback(function(){
        setCurrComponent("noTask");
    },[]);

    const showCreateTaskScreen = useCallback(function () {
      setCurrComponent("createTask");
    }, []);

    const showTaskListScreen = useCallback(function () {
      setCurrComponent("taskList");
    }, []);

    const showEditTaskScreen = useCallback(function () {
      setCurrComponent("editTask");
    }, []);

    const showViewTaskScreen = useCallback(function () {
      setCurrComponent("viewTask");
    }, []);

    //api handling 
    const handleResponse = useCallback(function(responseData){
      const extractedTasks = responseData.tasks;
      setTasks(extractedTasks);

      if(extractedTasks.length){
        showTaskListScreen();
      }else{
        showNoTaskScreen();
      }
    },[]);

    const handleError = useCallback((errorMessage )=> {
      alert(errorMessage);
      console.log(errorMessage);
    },[]);

   const fetchAlltasks = useCallback(()=>{
    fetchTaskAPI(handleResponse,handleError);
   },[handleError,handleResponse]);

   useEffect(()=>{
    fetchAlltasks();
   },[fetchAlltasks]);

   const changeTaskStatus =useCallback(function(status,taskId){
    setTasks((prevTasks)=>{
      return prevTasks.map(task=>{
        if(task._id === taskId){
          return {...task,status};
        }
        return task;
      })
    })
   },[]);
  return (
    <>
    {currComponent ==="loading" && <Loading/>}
    <div id='container-div'>
    {currComponent ==="noTask" && <NoTask showCreateTaskScreen={showCreateTaskScreen}/>}
    {currComponent ==="taskList" && <TaskList
      tasks={tasks}
      fetchAlltasks={fetchAlltasks} 
      showViewTaskScreen={showViewTaskScreen} 
      showEditTaskScreen={showEditTaskScreen} 
      setActiveTaskId={setActiveTaskId}
      setTasks={setTasks}
      changeTaskStatus ={changeTaskStatus}
      boardView={boardView}
      setBoardView={setBoardView}
      showCreateTaskScreen={showCreateTaskScreen}
       />}
    {currComponent ==="createTask" &&<CreateTask showTaskListScreen={showTaskListScreen} fetchAlltasks ={fetchAlltasks} tasks={tasks}/>}
    {currComponent === "viewTask" && <Viewtask 
   task={activeTask} 
   setActiveTaskId ={setActiveTaskId} 
   fetchAlltasks={fetchAlltasks}
   showEditTaskScreen={showEditTaskScreen}
   showTaskListScreen={showTaskListScreen}
   changeTaskStatus={changeTaskStatus}
     />}
    {currComponent === "editTask" && <EditTask task={activeTask} fetchAlltasks={fetchAlltasks} showTaskListScreen={showTaskListScreen}/>}
    </div>
    </>
   
  )
}

export default TaskMain;