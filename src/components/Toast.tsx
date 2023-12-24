import React from "react";

interface IProps {
  message: string;
  type: string;
}

const Toast = ({ message, type }: IProps) => {
  return (
    <div className="toast toast-end">
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
