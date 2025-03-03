import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

export const LanguageSwitcherComponent = ({ currentLocaleName, localesAndUrls }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className="dropdown">
      <button
        className={clsx("btn dropdown-toggle lux-capitalize", { show: isOpen })}
        type="button"
        aria-expanded={isOpen}
        onClick={dropdownHandler}
      >
        {currentLocaleName}
      </button>
      <ul
        className={clsx("dropdown-menu dropdown-menu-end", { show: isOpen })}
        {...(isOpen ? { "data-bs-popper": "none" } : {})}
      >
        {localesAndUrls?.map(({ localeName, isCurrent, url }) => {
          return (
            <li key={localeName}>
              <a
                href={url}
                className={clsx("dropdown-item", "lux-capitalize", { active: isCurrent })}
                aria-current={isCurrent}
              >
                {localeName}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

LanguageSwitcherComponent.propTypes = {
  currentLocaleName: PropTypes.string.isRequired,
  localesAndUrls: PropTypes.arrayOf(
    PropTypes.shape({
      localeName: PropTypes.string.isRequired,
      isCurrent: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default LanguageSwitcherComponent;
