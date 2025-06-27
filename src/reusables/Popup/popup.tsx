import { type ReactNode } from "react";
import styles from "./popup.module.css";

interface PopupProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const popup = ({ children, isOpen, onClose }: PopupProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupBackground}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default popup;
