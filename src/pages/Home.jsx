import { Col, Row, Select, Space } from "antd";
import React, { useState } from "react";
import { Typography } from "antd";
import CustomButton from "../components/CustomButton";
import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import CustomeTable from "../components/Table";
import DrawerForm from "../components/DrawerForm";
// import Table from "../components/Table";

const { Search } = Input;
const { Title } = Typography;

const Home = () => {
  // states to handle drawer formm
  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const options = [
    {
      value: "ascending",
      label: "Order by Ascending",
    },
    {
      value: "descending ",
      label: "Order by Descending",
    },
  ];

  return (
    <Row className="px-2 sm:px-5 md:px-10 lg:px-16" gutter={[16, 24]}>
      <Col span={24}>
        <Title level={2} className="mb-0">
          Domains
        </Title>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]} className="w-full">
          <Col xs={24} sm={24} md={12} lg={8} xl={4}>
            <CustomButton
              type="primary"
              onClick={showDrawer}
              icon={<PlusOutlined />}
              block
              className="h-10"
            >
              Add Domain
            </CustomButton>
            <DrawerForm open={openDrawer} onClose={onClose} />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={16}
            xl={20}
            className="border"
          >
            <Space direction="vertical" className="w-full" size="middle">
              <Row gutter={[8, 8]} className="w-full">
                <Col xs={24} sm={24} md={6}>
                  <Select
                    defaultValue="Order by Ascending"
                    className="w-full"
                    onChange={handleChange}
                    options={options}
                    size="large"
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Search
                    className="w-full"
                    placeholder="Search domains..."
                    onSearch={onSearch}
                    size="large"
                    enterButton
                  />
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <CustomeTable />
      </Col>
    </Row>
  );
};

export default Home;
