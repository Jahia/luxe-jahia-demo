import React, { useEffect } from "react";
import clsx from "clsx";
import classes from "./Dialog.client.module.css";

interface DialogProps
	extends Omit<
		React.ComponentPropsWithoutRef<"dialog">,
		"className" | "id" | "onClick" | "onClose"
	> {
	id?: string;
	children: React.ReactNode;
	className?: string;
	isOpen?: boolean;
	onClose?: (event: React.SyntheticEvent<HTMLDialogElement>) => void;
}

export const DialogClient = ({
	id,
	children,
	className,
	isOpen = false,
	onClose,
	...props
}: DialogProps & { ref?: React.RefObject<HTMLDialogElement> }) => {
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
		if (event.key === 'Escape') handleClose();
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
			<button type="button" onClick={handleClose} aria-label="Close gallery">
				×
			</button>
			{children}
		</dialog>
	);
};

DialogClient.displayName = "Dialog";
