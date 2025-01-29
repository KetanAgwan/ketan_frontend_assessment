import React from "react";
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import CustomButton from "./CustomButton";
import { validateUrlStructure } from "../utils/validateUrl";
const { Option } = Select;

const DrawerForm = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const createdDate = Math.floor(Date.now() / 1000);

    // Concatenate protocol and domain
    const fullDomain = `${values.protocol}${values.domain}`;
    const { protocol, ...rest } = values;

    const formData = {
      ...rest,
      createdDate,
      domain: fullDomain, // Add the concatenated domain
    };

    console.log("Form Data:", formData);
    onClose();
  };

  return (
    <Drawer
      title="Create a new domain"
      width={window.innerWidth < 768 ? "90%" : 720}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form form={form} layout="vertical" hideRequiredMark onFinish={onFinish}>
        {/* Hidden field for createdDate */}
        <Form.Item name="createdDate" hidden>
          <Input type="hidden" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="domain"
              label="Domain"
              rules={[
                {
                  required: true,
                  message: "Please enter the domain",
                },
                {
                  validator: async (_, value) => {
                    if (!value) return Promise.resolve();
                    if (validateUrlStructure(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Please enter a valid domain URL (e.g. example.com)"
                      )
                    );
                  },
                  validateTrigger: ["onBlur"],
                },
              ]}
            >
              <Input
                addonBefore={
                  <Form.Item name="protocol" noStyle initialValue="http://">
                    <Select
                      style={{ width: window.innerWidth < 768 ? 80 : 100 }}
                    >
                      <Option value="http://">http://</Option>
                      <Option value="https://">https://</Option>
                    </Select>
                  </Form.Item>
                }
                placeholder="Please enter the domain"
                onBlur={(e) => {
                  form.validateFields(["domain"]);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please select the status",
                },
              ]}
            >
              <Select placeholder="Please select the status">
                <Option value="pending">Pending</Option>
                <Option value="verified">Verified</Option>
                <Option value="rejected">Rejected</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="isActive"
              label="Is Active"
              rules={[
                {
                  required: true,
                  message: "Please select the active status",
                },
              ]}
            >
              <Select placeholder="Please select the active status">
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Space>
            <CustomButton onClick={onClose}>Cancel</CustomButton>
            <CustomButton onClick={() => form.submit()} type="primary">
              Submit
            </CustomButton>
          </Space>
        </Row>
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
