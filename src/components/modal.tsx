import React from "react";
import { Button } from "./ui/button";

type buttonProps = {
  onClick: () => void;
  label: string;
};

interface ModalProps {
  isOpen: boolean;
  closeProps?: buttonProps;
  confirmProps?: buttonProps;
  children: React.ReactNode;
}

const Modal = ({ isOpen, closeProps, confirmProps, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="pointer-events-auto absolute inset-0 bg-transparent" />
      <div
        className="relative mx-auto w-full max-w-md rounded-lg border border-gray-300 bg-white p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-4">{children}</div>

        <div className="flex justify-end gap-2">
          {closeProps && (
            <Button variant={"outline"} onClick={closeProps.onClick}>
              {closeProps.label}
            </Button>
          )}
          {confirmProps && (
            <Button variant={"outline"} onClick={confirmProps.onClick}>
              {confirmProps.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
