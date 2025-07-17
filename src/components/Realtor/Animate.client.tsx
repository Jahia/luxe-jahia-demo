import classes from "~/components/Realtor/default.module.css";
import { useRef, useState } from "react";
import type { ImageDataProps } from "~/commons/types";

interface AnimateClientProps {
	firstName: string;
	lastName: string;
	jobPosition: string;
	image: ImageDataProps;
	videoUrl?: string;
	currentNodeUrl: string;
}

export default function AnimateClient({
	firstName,
	lastName,
	jobPosition,
	image,
	videoUrl,
	currentNodeUrl,
}: AnimateClientProps) {
	const isVideoAvailable = !!videoUrl;
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
		<a
			href={currentNodeUrl}
			className={classes.card}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{(!isVideoAvailable || !isHovered) && (
				<img src={image.src} alt={image.alt} width="250px" height="250px" />
			)}
			{isVideoAvailable && (
				<video
					ref={videoRef}
					src={videoUrl}
					muted
					playsInline
					preload="auto"
					style={{
						height: "250px",
						display: isHovered ? "block" : "none",
					}}
					onEnded={() => setIsHovered(false)}
				/>
			)}
			<div className={classes.main}>
				<h4>
					{firstName} {lastName}
				</h4>
				<p className={classes.jobPosition}>{jobPosition}</p>
			</div>
		</a>
	);
}
