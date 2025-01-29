import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => navigate("/")}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
