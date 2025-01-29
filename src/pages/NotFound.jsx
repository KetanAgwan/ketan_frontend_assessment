import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <CustomButton
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => navigate("/")}
          >
            Back Home
          </CustomButton>
        }
      />
    </div>
  );
};

export default NotFound;
