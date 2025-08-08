import { type Dispatch, type SetStateAction, useState } from "react";
import LoginCardClient from "./LoginCard.client";
import { t } from "i18next";
import { login } from "./utils.client";
import type { LoginCommonProps, LoginPersonaProps } from "./types";
import classes from "~/components/Form/Login/LoginForm.client.module.css";
import alert from "~/templates/css/alert.module.css";
import form from "~/templates/css/form.module.css";
import clsx from "clsx";

interface LoginFormClientProps {
	loginUrl: string;
	setUser: Dispatch<SetStateAction<string | undefined>>;
	handleLoggedIn: () => void;
	isShowRememberMe: boolean;
	siteKey?: string;
	persona: LoginPersonaProps[];
}

const LoginFormClient = ({
	loginUrl,
	setUser,
	handleLoggedIn,
	siteKey,
	isShowRememberMe = true,
	persona,
}: LoginFormClientProps) => {
	const [incorrectLogin, setIncorrectLogin] = useState(false);
	const [unknownError, setUnknownError] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	const loginCommonProps: LoginCommonProps = {
		siteKey,
		loginUrl,
		setUser,
		handleLoggedIn,
		setIncorrectLogin,
		setUnknownError,
	};

	const handleLogin = () =>
		login({
			username,
			password,
			rememberMe,
			...loginCommonProps,
		});

	return (
		<div className={classes.main}>
			<div className={classes.body}>
				<div className={classes.loginCardSection}>
					<h3>{t("form.login.sections.persona.title")}</h3>
					<p>{t("form.login.sections.persona.teaser")}</p>
					<div>
						{persona?.map((user) => (
							<LoginCardClient key={user.username} {...user} {...{ loginCommonProps }} />
						))}
					</div>
				</div>
				<div className={classes.loginFormSection}>
					<h3>{t("form.login.sections.login.title")}</h3>
					<p>{t("form.login.sections.login.teaser")}</p>
					<form id="loginForm" className={form.root}>
						{incorrectLogin && (
							<p className={clsx(alert.danger, classes.fs6)} role="alert">
								{t("form.login.badCreds")}
							</p>
						)}

						{unknownError && (
							<p className={clsx(alert.danger, classes.fs6)} role="alert">
								{t("form.login.unknownError")}
							</p>
						)}

						<div>
							<label htmlFor="inputUser" className={classes.label}>
								{t("form.login.username")}
							</label>
							<input
								autoFocus
								id="inputUser"
								type="text"
								name="username"
								placeholder="robin"
								className={form.control}
								autoComplete="username"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="inputPassword" className={classes.label}>
								{t("form.login.password")}
							</label>
							<input
								id="inputPassword"
								type="password"
								name="password"
								className={form.control}
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
								onKeyUp={(event) => {
									if (event.key === "Enter") {
										handleLogin();
									}
								}}
							/>
						</div>
						{isShowRememberMe && (
							<div className={classes.checkBox}>
								<input
									id="remember"
									type="checkbox"
									name="remember"
									className={classes.formCheckInput}
									defaultChecked={rememberMe}
									onChange={() => setRememberMe(!rememberMe)}
								/>
								<label htmlFor="remember" className={classes.formCheckLabel}>
									{t("form.login.rememberMe")}
								</label>
							</div>
						)}
						<button type="button" form="loginForm" className={classes.btn} onClick={handleLogin}>
							{t("form.login.login")}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginFormClient;
