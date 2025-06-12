import React, { useState, useRef, useEffect } from "react";
import styles from "./MultiSelectDropdown.module.css";

export type Option = {
  value: string;
  label: string;
  isActive?: boolean; // Optional property to indicate if the option is initially selected
};

type MultiSelectDropdownProps = {
  options: Option[];
  placeholder?: string;
  onChange?: (selected: Option[]) => void;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  placeholder = "Sélectionnez...",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    options.filter((option) => option.isActive),
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: Option) => {
    const alreadySelected = selectedOptions.some((o) => o.value === option.value);
    let newSelected: Option[];
    if (alreadySelected) {
      newSelected = selectedOptions.filter((o) => o.value !== option.value);
    } else {
      newSelected = [...selectedOptions, option];
    }
    setSelectedOptions(newSelected);
    onChange?.(newSelected);
  };

  const isSelected = (option: Option) => selectedOptions.some((o) => o.value === option.value);

  return (
    <div className={styles.dropdown} ref={ref}>
      <div
        className={styles.dropdownHeader}
        onClick={() => setIsOpen((open) => !open)}
        tabIndex={0}
        onBlur={() => setIsOpen(false)}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((o) => o.label).join(", ")
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className={styles.dropdownList} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${isSelected(option) ? styles.selected : ""}`}
              onClick={() => toggleOption(option)}
              role="option"
              aria-selected={isSelected(option)}
            >
              <input type="checkbox" checked={isSelected(option)} readOnly tabIndex={-1} />
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
