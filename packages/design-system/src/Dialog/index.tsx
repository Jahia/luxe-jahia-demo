import React, { useEffect } from "react";
import clsx from "clsx";
import classes from "./styles.module.css";

interface DialogProps extends Omit<React.ComponentPropsWithoutRef<"dialog">, "onClick"> {
	title: string;
	children: React.ReactNode;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export const Dialog = ({
	title,
	children,
	className,
	isOpen = false,
	setIsOpen,
	...props
}: DialogProps) => {
	const dialogRef = React.useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef?.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
			document.body.classList.add(classes.noScroll);
		} else {
			dialog.close();
			document.body.classList.remove(classes.noScroll);
		}
	}, [isOpen]);

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Escape") handleClose();
	};
	const handleClose = () => setIsOpen(false);

	const handleBackdropClose = (event: React.MouseEvent) => {
		if (event.target === dialogRef.current) {
			handleClose();
		}
	};
	return (
		<dialog
			ref={dialogRef}
			className={clsx(classes.dialog, className)}
			onClick={handleBackdropClose}
			onDoubleClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
			onKeyDown={handleKeyDown}
			{...props}
		>
			<div className={classes.container}>
				<header className={classes.heading}>
					<button type="button" onClick={handleClose} aria-label="Close dialog">
						x
					</button>
					<h2 className={classes.title} aria-labelledby="modalTitle">
						{title}
					</h2>
				</header>

				{children}
			</div>
		</dialog>
	);
};
