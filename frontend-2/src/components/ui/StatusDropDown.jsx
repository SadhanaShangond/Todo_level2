import { ArrowDownSquare } from "lucide-react";
import React, {
 
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import clsx from "clsx";
import changeStatusAPI from "../../components/api/changeStatusApi";

let options = [
  {
    display: "Open",
    value: "Open",
    className: "status-open",
  },
  {
    display: "In-Progress",
    value: "In-Progress",
    className: "status-in-Progress",
  },
  {
    display: "Completed",
    value: "Completed",
    className: "status-completed",
  },
];

const StatusDropDown = ({
  value = options[0].value,
  taskId,
  changeTaskStatus,
}) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentStatus = useMemo(
    () => options.find((option) => option.value === value),
    [value]
  );

  // close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropDown = useCallback(function (event) {
    event.stopPropagation();
    setIsOpen((isOpen) => !isOpen);
  });

  const handleResponse = useCallback(
    (responseData) => {
      const { task } = responseData;

      //change status in Local state
      changeTaskStatus(task.status, task._id);
    },
    [changeTaskStatus]
  );

  const handleError = useCallback(function (errorMsg) {
    console.error(errorMsg);
    toast(errorMsg);
  });

  const handleStatusChange = useCallback((newValue) => {
    if (newValue !== value) {
      changeStatusAPI(
        newValue,
        taskId,
        handleResponse,
        handleError,
        setLoading
      );
      setIsOpen(false);
    }
  });

  const handleOptionClick = useCallback(
    (event, value) => {
      event.stopPropagation();
      handleStatusChange(value);
    },
    [value]
  );

  return (
    <div ref={dropdownRef} className="status-dropdown">
      {/* Button to toggle dropdown */}
      <button
        type="button"
        disabled={loading}
        className={clsx("status-btn", currentStatus.className)}
        onClick={toggleDropDown}
      >
        {currentStatus.display}
        {/* Display arrow icon if dropdown is not loading */}
        {!loading && <ArrowDownSquare />}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {/* Render option */}
          {options.map((option) => {
            const handleClick = (event) =>
              handleOptionClick(event, option.value);
            return (
              <li
                key={option.value}
                className="dropdown-item"
                onClick={handleClick}
              >
                {option.display}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StatusDropDown;
