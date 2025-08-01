import React, { useEffect } from "react";
import clsx from "clsx";
import classes from "./styles.module.css";

interface DialogProps
	extends Omit<
		React.ComponentPropsWithoutRef<"dialog">,
		"className" | "id" | "onClick" | "onClose"
	> {
	id?: string;
	title: string;
	children: React.ReactNode;
	className?: string;
	isOpen?: boolean;
	onClose?: (event: React.SyntheticEvent<HTMLDialogElement>) => void;
}

export const Dialog = ({
	id,
	title,
	children,
	className,
	isOpen = false,
	onClose,
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
	const handleClose = () => dialogRef.current?.close();

	const handleBackdropClose = (event: React.MouseEvent) => {
		if (event.target === dialogRef.current) {
			handleClose();
		}
	};
	return (
		<dialog
			ref={dialogRef}
			id={id}
			className={clsx(classes.dialog, className)}
			onClick={handleBackdropClose}
			onDoubleClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
			onClose={(e) => onClose?.(e)}
			onKeyDown={handleKeyDown}
			{...props}
		>
			<div className={classes.container}>
				<div className={classes.heading}>
					<button type="button" onClick={handleClose} aria-label="Close dialog-modal">
						x
					</button>
					<h2 className={classes.title}>{title}</h2>
				</div>

				{children}
			</div>
		</dialog>
	);
};
