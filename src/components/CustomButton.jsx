import { Button } from "antd";
import React from "react";

const CustomButton = ({ children, ...props }) => {
  return (
    <Button className="px-5 py-5 border" {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
