import style from "./style.module.css";
import css from "classnames";
import React, { ReactElement } from "react";
import { useState } from "react";
interface AlertProps {
  children?: ReactElement;
  type: string;
  message?: string;
}
export default function Alert({ children, type, message } : AlertProps) {
  const [isShow, setIsShow] = useState(true);

  const renderElAlert = function () {
    return React.cloneElement(children as ReactElement);
  };

  const handleClose = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setIsShow(false);
  };

  return (
    <div className={css(style.alert, style[type], !isShow && style.hide)}>
      <span className={style.closebtn} onClick={handleClose}>
        &times;
      </span>
      {children ? renderElAlert() : message}
    </div>
  );
}
