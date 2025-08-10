import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import ArrowDown from "../../assets/arrow-down.svg";

const DropdownSortBy = ({ placeholder, value, onChange, options }) => {
  //State to manage menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //refrence to select the element
  const selectRef = useRef(null);

  const toggleMenuDisplay = useCallback(
    () => setIsMenuOpen((isMenuOpen) => !isMenuOpen),
    []
  );

  //close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionChange = useCallback(
    function (option) {
      onChange(option);
      setIsMenuOpen(false);
    },
    [onChange]
  );

  //Memoized selected options
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  return (
    <div className="dropdown-container" ref={selectRef}>
      <div className="value-container" onClick={toggleMenuDisplay}>
        {/* Display selected value or placeholder */}
        <span
          className={clsx("dropdown-value", !value && "dropdown-placeholder")}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <img src={ArrowDown} alt="Dropdown icon" />
      </div>
      {/* display sort options */}
      {isMenuOpen && (
        <div className="menu-list">
          {options.map((option) => {
            return (
              <div
                key={option.value + "-option"}
                className="menu-list-option"
                onClick={() => handleOptionChange(option.value)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownSortBy;
