import clsx from "clsx";
import { useState } from "react";

export default function LanguageSwitcherClient({
  currentLocaleName,
  localesAndUrls,
}: {
  currentLocaleName: string;
  localesAndUrls: {
    localeName: string;
    isCurrent: boolean;
    url: string;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
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
}
