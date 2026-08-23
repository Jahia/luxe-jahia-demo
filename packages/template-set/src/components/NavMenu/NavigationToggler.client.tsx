import { useState } from "react";
import classes from "~/components/NavMenu/NavigationToggler.client.module.css";
import clsx from "clsx";
import type { RefinedNavMenuProps } from "~/components/NavMenu/NavigationToggler";
import { useTranslation } from "react-i18next";

export default function NavigationTogglerClient({ menu }: { menu: RefinedNavMenuProps[] }) {
	const { t } = useTranslation();
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
				aria-label={t("nav.toggle")}
				onClick={togglerHandler}
			>
				<span className={classes.icon} />
			</button>
			<div id="navbarSupportedContent" className={clsx(classes.collapse, { show: isOpen })}>
				<ul className={classes.nav}>
					{menu.map(({ uuid, label, anchor, active }) => (
						<li key={uuid}>
							{anchor.href ? (
								<a
									{...anchor}
									className={clsx(classes.link, {
										active: active,
									})}
								>
									{label}
								</a>
							) : (
								<span className={classes.link}>{label}</span>
							)}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
