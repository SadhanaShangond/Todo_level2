import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import List from "../assets/list-view.svg";
import Board from "../assets/board.svg";
import CheckBox from "./ui/CheckBox";
import toast from "react-hot-toast";
import getLabelsAPI from "./api/getLabelsAPI";
import DropdownSortBy from "./ui/DropdownSortBy";
import fetchTaskAPI from "./api/fetchTaskAPI";

const statusOptions = [
  { display: "Open", value: "Open" },
  { display: "In-Progress", value: "In-Progress" },
  { display: "Completed", value: "Completed" },
];

const sortOptions = [
  { label: "Date Added", value: "added_on" },
  { label: "Due Date", value: "Due Date" },
];

const TaskListSidebar = ({ boardView, setBoardView, setTasks }) => {
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [sortOption, setSortOption] = useState([]);

  //fetch all labels
  useEffect(() => {
    const handleResponse = (responseData) => {
      console.log(responseData.labels);
      setLabels(responseData.labels);
    };

    const handleError = (errorMessage) => {
      toast.error("Failed to fetch labels");
      console.log(errorMessage);
    };

    getLabelsAPI(handleResponse, handleError);
  }, []);

  const enableBoardView = useCallback(() => {
    setBoardView(true);
  }, [setBoardView]);

  const enableListView = useCallback(() => {
    setBoardView(false);
  }, [setBoardView]);

  const selectStatus = useCallback(function (statusToAdd) {
    setSelectedStatus((prevStatus) =>
      prevStatus.includes(statusToAdd)
        ? prevStatus
        : [...prevStatus, statusToAdd]
    );
  }, []);

  const selectLabel = useCallback(function (labelToAdd) {
    setSelectedLabels((prevLabel) =>
      prevLabel.includes(labelToAdd) ? prevLabel : [...prevLabel, labelToAdd]
    );
  }, []);

  const removeStatus = useCallback(function (statusToRemove) {
    setSelectedStatus((selectStatus) =>
      selectStatus.filter((status) => status !== statusToRemove)
    );
  }, []);

  const removeLabel = useCallback(function (labelToRemove) {
    setSelectedLabels((selectLabel) =>
      selectLabel.filter((label) => label !== labelToRemove)
    );
  }, []);

  const handleStatusCheckbox = (e, value) => {
    if (e.target.checked) {
      selectStatus(value);
    } else {
      removeStatus(value);
    }
  };

  const handleLabelCheckBox = (e, value) => {
    if (e.target.checked) {
      selectLabel(value);
    } else {
      removeLabel(value);
    }
  };

  const handleResponse = useCallback(
    (responseData) => setTasks(responseData.tasks),
    [setTasks]
  );

  const handleError = useCallback(function (errorMsg) {
    toast.error(errorMsg);
    console.log(errorMsg);
  }, []);

  //Fetch tasks API based on selected options
  useEffect(() => {
    const options = {
      sortOption,
      selectedLabels,
      selectedStatus,
    };
    fetchTaskAPI(handleResponse, handleError, options);
  }, [handleError, handleResponse, sortOption, selectedLabels, selectedStatus]);

  return (
    <aside className="task-list-left-section">
      <div>
        <p className="left-section-label">View</p>
        <div className="view-toggle-container">
          {/* list view toggle */}

          <div
            className={clsx("view-toggle", !boardView && "active-toggle")}
            onClick={enableListView}
          >

            <img src={List} alt="List Icon" />
            <p className="list-label">List</p>
          </div>
          

          {/* Board view Toggle */}
          <div
            className={clsx("view-toggle", boardView && "active-toggle")}
            onClick={enableBoardView}
          >
            <img src={Board} alt="board icon" />
            <p className="list-label">Board</p>
          </div>
        </div>
      </div>

      <div className="task-sidebar-child-section">
        <p className="left-section-label">Task Status</p>
        {/* render checkboxes for each status option */}
        {statusOptions.map((status) => {
          const handelClick = (event) =>
            handleStatusCheckbox(event, status.value);
          return (
            <CheckBox
              key={status.value + "-status"}
              label={status.display}
              onClick={handelClick}
            />
          );
        })}
      </div>

      {/* sort by section */}
      <div className="task-sidebar-child-section">
        <p className="left-section-label">Sort By</p>
        {/* Dropdown for sorting options  */}
        <DropdownSortBy
          placeholder="Select"
          value={sortOption}
          onChange={setSortOption}
          options={sortOptions}
        />
      </div>

      {/* Filter by label */}

      <div className="task-sidebar-child-section">
        <p className="left-section-label">Label</p>
        {!labels.length && (
          <span className="no-label-text">No Label Created yet</span>
        )}
        {/* render checkboxes for each label  */}
        {labels.map((label) => {
          const handleClick = (event) => handleLabelCheckBox(event, label);
          return <CheckBox key={label} label={label} onClick={handleClick} />;
        })}
      </div>
    </aside>
  );
};

export default TaskListSidebar;
