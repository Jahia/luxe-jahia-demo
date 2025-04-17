import { useState } from "react";
import classes from "~/components/NavMenu/NavigationToggler.client.module.css";
import clsx from "clsx";
import type { RefinedNavMenuProps } from "~/components/NavMenu/NavigationToggler";

export default function NavigationTogglerClient({ menu }: { menu: RefinedNavMenuProps[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const togglerHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <>
      <button
        className={classes.toggler}
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={togglerHandler}
      >
        <span className={classes.icon} />
      </button>
      <div id="navbarSupportedContent" className={clsx(classes.collapse, { show: isOpen })}>
        <ul className={classes.nav}>
          {menu.map(({ node, active }) => (
            <li key={node.uuid}>
              <a
                href={node.url}
                className={clsx(classes.link, {
                  active: active,
                })}
              >
                {node.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
