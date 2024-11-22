import React from "react";

const Input = ({ value, onChange, style, placeholder, type,className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      style={style}
      placeholder={placeholder}
      type={type}
      className={className}
    />
  );
};

export default Input;
