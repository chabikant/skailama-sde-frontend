import React from "react";

const Button = ({ style, text, onClick, child, className }) => {
  return (
    <button
      style={{ cursor: "pointer", ...style }}
      onClick={onClick}
      className={className}
    >
      {text} {child}
    </button>
  );
};

export default Button;
