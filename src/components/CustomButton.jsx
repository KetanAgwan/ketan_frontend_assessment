import { Button } from "antd";
import React from "react";

const CustomButton = ({ children, ...props }) => {
  return (
    <Button size="middle" className="px-5 py-5" {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
