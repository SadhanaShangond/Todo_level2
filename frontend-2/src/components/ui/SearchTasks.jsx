// import React, { useCallback, useEffect, useRef } from 'react'
// import Search from "../../assets/search.svg";
// const SearchTasks = ({ tasks,
//     setFilteredTask,
//     searchQuery,
//     setSearchQuery}) => {

//         const timerIdref = useRef(null); 
//         useEffect(()=>{
//             //perform search logic and filter based on search query
//             const filteredTask = tasks.filter((task)=>{
//                 const case1 = task.title.toLowerCase().includes(searchQuery.toLowerCase());

//                 const case2 = task.description
//                   .toLowerCase()
//                   .includes(searchQuery.toLowerCase());
//                 return case1 || case2;
//             })
//             setFilteredTask(filteredTask);
//         },[searchQuery,setFilteredTask,tasks]);

//         //clear the prev timeout
//         clearTimeout(timerIdref.current);

//         //debounce search result for input change

//         const handleSearchInputChange = useCallback((event)=>{
//             const query = event.target.value;
//             //set a new timeout and update the ref

//             timerIdref.current = setTimeout(()=>{
//                 setSearchQuery(query);
//             },300);
//         },[setSearchQuery]);

//   return (
//     <div className="search-box-container">
//         <input 
//         type="text" 
//         onChange={handleSearchInputChange} 
//         placeholder="Search"        
//         /> 
//         <img src={Search} alt="Search icon" />
       
//     </div>
//   )
// }

// export default SearchTasks;



import React, {  useEffect, useState } from "react";
import Search from "../../assets/search.svg";
const SearchTasks = ({
    placeholder,
  tasks,
  setFilteredTask,
  searchQuery,
  setSearchQuery,
}) => {
 const [inputValue,setInputValue]= useState("");
 useEffect(()=>{
    //1.Set a timeout to update the actual searchquery state
    const handler = setTimeout(()=>{
        setSearchQuery(inputValue);
    },300)
    //2.Return a clean up function
    clearInterval(handler);
 },[inputValue,setSearchQuery]);
  useEffect(() => {
    //perform search logic and filter based on search query
    const filteredTask = tasks.filter((task) => {
      const case1 = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const case2 = task.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return case1 || case2;
    });
    setFilteredTask(filteredTask);
  }, [searchQuery, setFilteredTask, tasks]);

//   //clear the prev timeout
//   clearTimeout(timerIdref.current);

//   //debounce search result for input change

//   const handleSearchInputChange = useCallback(
//     (event) => {
//       const query = event.target.value;
//       //set a new timeout and update the ref

//       timerIdref.current = setTimeout(() => {
//         setSearchQuery(query);
//       }, 300);
//     },
//     [setSearchQuery]
//   );

  return (
    <div className="search-box-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <img src={Search} alt="Search icon" />
    </div>
  );
};

export default SearchTasks;

