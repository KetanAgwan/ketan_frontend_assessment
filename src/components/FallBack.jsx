import { Row, Spin } from "antd";
import React from "react";

export const FallBack = () => {
  return (
    <Row
      style={{ height: "100vh", width: "100%" }}
      justify="center"
      align="middle"
    >
      <Spin size="large" />
    </Row>
  );
};
