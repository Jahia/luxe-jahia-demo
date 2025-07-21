import { type MouseEvent, useRef, useState } from "react";
import LoginFormClient from "./LoginForm.client.js";
import WorkspaceNavigationClient from "./WorkspaceNavigation.client.js";
import { t } from "i18next";
import type { JahiaUrlsProps, LoginPersonaProps } from "./types";
import classes from "~/components/Form/Login/Login.client.module.css";
import alert from "~/templates/css/alert.module.css";
import clsx from "clsx";
import { DialogClient } from "~/commons/Dialog.client";

interface LoginClientProps {
	isLoggedIn: boolean;
	userHydrated?: string;
	urls: JahiaUrlsProps;
	mode: string;
	nodePath: string;
	isShowRememberMe: boolean;
	siteKey?: string;
	persona: LoginPersonaProps[];
}

export default function LoginClient({
	isLoggedIn,
	userHydrated,
	urls,
	mode,
	nodePath,
	isShowRememberMe,
	siteKey,
	persona,
}: LoginClientProps) {
	const [user, setUser] = useState(userHydrated);
	const [loggedIn, setLoggedIn] = useState(isLoggedIn);
	const [isOpen, setIsOpen] = useState(false);

	const showModal = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		setIsOpen(true);
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Escape") setIsOpen(false);
	};

	const logout = async () => {
		await fetch(urls.logoutUrl);
		setLoggedIn(false);
	};

	const handleLoggedIn = () => {
		setLoggedIn(true);
		setIsOpen(false);
	};

	if (mode === "edit") {
		return (
			<div className={clsx(alert.dark, classes.fs6)} role="alert">
				{t("form.login.editModeWarning")}
			</div>
		);
	}

	return loggedIn ? (
		<>
			<h5 className={classes.capitalize}>{user}</h5>
			<ul className={classes.list}>
				<WorkspaceNavigationClient
					{...{
						urls,
						mode,
						nodePath,
					}}
				/>
				<li>
					<button type="button" className={classes.btn} onClick={logout}>
						{t("form.login.logout")}
					</button>
				</li>
			</ul>
		</>
	) : (
		<>
			<h5 className={classes.capitalize}>{t("footer.backOffice")}</h5>
			<DialogClient isOpen={isOpen} onClose={() => setIsOpen(false)} onKeyDown={handleKeyDown}>
				<div className={classes.content} aria-labelledby="loginModalTitle">
					<LoginFormClient
						loginUrl={urls.loginUrl}
						isShowRememberMe={isShowRememberMe}
						setUser={setUser}
						handleLoggedIn={handleLoggedIn}
						siteKey={siteKey}
						persona={persona}
					/>
				</div>
			</DialogClient>
			<p>
				<a href={urls.loginUrl} className={classes.capitalize} onClick={showModal}>
					{t("form.login.login")}
				</a>
			</p>
		</>
	);
}
