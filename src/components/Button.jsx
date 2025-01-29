import React from "react";

const Button = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default Button;
