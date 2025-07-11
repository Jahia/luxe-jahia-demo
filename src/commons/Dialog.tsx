import React, { useEffect } from "react";
import clsx from "clsx";
import classes from "./Dialog.module.css";

interface DialogProps extends Omit<React.ComponentPropsWithoutRef<'dialog'>, 'className' | 'id' | 'onClick' | 'onClose'> {
  id: string;
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: (event: React.MouseEvent) => void;
}

export const Dialog = ({
  id,
  children,
  className,
  isOpen,
  onClose,
  ...props
}: DialogProps & { ref?: React.RefObject<HTMLDialogElement> }) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  
  useEffect(() => {
    const dialog = dialogRef?.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen, dialogRef]);

  const handleClose = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose?.(event);
    }
  };
  return (
    <dialog
      ref={dialogRef}
      id={id}
      className={clsx(classes.dialog, className)}
      onClick={handleClose}
      // onClose={e => handleClose(e: React.MouseEvent)}
      {...props}
    >
      {children}
    </dialog>
  );
};

Dialog.displayName = 'Dialog';
