import clsx from "clsx";
import { useState } from "react";
import type { AnchorProps } from "@jahia/javascript-modules-library";
import classes from "./LanguageSwitcher.client.module.css";

export default function LanguageSwitcherClient({
	currentLocaleName,
	localesAndUrls,
	mode,
}: {
	currentLocaleName: string;
	localesAndUrls: {
		language: string;
		localeName: string;
		isCurrent: boolean;
		anchor: AnchorProps;
	}[];
	mode: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownHandler = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	// suppress the hydration warnings in edit mode, as JContent performs some DOM manipulations, messing up with React hydration process
	const suppressHydrationWarning = mode === "edit";

	return (
		<div className={classes.dropdown}>
			<button
				className={clsx(classes.btn, { show: isOpen })}
				type="button"
				aria-expanded={isOpen}
				onClick={dropdownHandler}
				suppressHydrationWarning={suppressHydrationWarning}
			>
				{currentLocaleName}
			</button>
			<ul className={clsx(classes.menu, { show: isOpen })}>
				{localesAndUrls?.map(({ language, localeName, isCurrent, anchor }) => {
					return (
						<li key={language}>
							<a
								{...anchor}
								// The target is the same page in another language, which is what
								// hreflang states — and it is how the tests find the locale links
								hrefLang={language}
								className={clsx(classes.item, {
									active: isCurrent,
								})}
								aria-current={isCurrent ? "page" : undefined}
								suppressHydrationWarning={suppressHydrationWarning}
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
