import { login } from "./utils.client";
import { t } from "i18next";
import type { LoginCommonProps } from "./types";
import classes from "~/components/Form/Login/LoginCard.client.module.css";
import { useRef, useState } from "react";

interface LoginCardClientProps {
	username: string;
	password: string;
	userinfo: {
		fullname: string;
		function?: string;
		description?: string;
		avatar: {
			image: {
				url: string;
				alt: string;
			};
			video: {
				url: string;
			};
		};
	};
	loginCommonProps: LoginCommonProps;
	className?: string;
}

export const LoginCardClient = ({
	username,
	password,
	userinfo,
	loginCommonProps,
	...props
}: LoginCardClientProps) => {
	const handleClick = () =>
		login({
			username,
			password,
			rememberMe: true,
			...loginCommonProps,
		});

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			videoRef.current.play();
		}
	};

	const handleMouseLeave = () => {
		if (videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0; // reset to start
		}
		setIsHovered(false);
	};

	return (
		<div
			role="button"
			className={classes.card}
			{...props}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
		>
			{userinfo.avatar.image && !isHovered && (
				<img src={userinfo.avatar.image.url} alt={t(userinfo.avatar.image.alt, { username })} />
			)}

			<video
				ref={videoRef}
				src={userinfo.avatar.video.url}
				style={{
					display: isHovered ? "block" : "none",
				}}
				muted
				playsInline
				onEnded={() => setIsHovered(false)} // hide video after one play
			/>

			<div>
				<h2>{userinfo.fullname}</h2>
				{userinfo.function && <h4>{t(userinfo.function)}</h4>}
				{userinfo.description && <p>{t(userinfo.description)}</p>}
			</div>
		</div>
	);
};

export default LoginCardClient;
