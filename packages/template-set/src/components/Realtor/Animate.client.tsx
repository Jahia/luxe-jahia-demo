import classes from "~/components/Realtor/default.module.css";
import React, { useRef, useState } from "react";
import { Image } from "design-system";

interface AnimateClientProps {
	firstName: string;
	lastName: string;
	jobPosition: string;
	image: React.ImgHTMLAttributes<HTMLImageElement>;
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
			{(!isVideoAvailable || !isHovered) && <Image className={classes.image} {...image} />}
			{isVideoAvailable && (
				<video
					ref={videoRef}
					src={videoUrl}
					muted
					playsInline
					preload="auto"
					style={{
						maxWidth: "100%",
						objectFit: "cover",
						borderRadius: "16px",
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
