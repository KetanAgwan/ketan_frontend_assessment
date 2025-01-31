import React, { useEffect, useState } from "react";
import { Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import CustomButton from "./CustomButton";
import {
  extractProtocolAndDomain,
  validateUrlStructure,
} from "../utils/validateUrl";

const { Option } = Select;

const DrawerForm = ({
  openDrawer,
  closeDrawer,
  domainData,
  isCreating,
  isUpdating,
  createDomain,
  updateDomain,
}) => {
  const [form] = Form.useForm();
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (openDrawer) {
      if (domainData) {
        const { protocol, domain } = extractProtocolAndDomain(
          domainData?.domain || ""
        );
        form.setFieldsValue({
          protocol,
          domain,
          status: domainData.status,
          isActive: domainData.isActive,
        });
        setIsFormChanged(false);
      } else {
        form.resetFields();
        setIsFormChanged(true);
      }
    }
  }, [domainData, openDrawer, form]);

  const onValuesChange = () => {
    if (domainData) {
      const currentValues = form.getFieldsValue();
      const { protocol: currentProtocol, domain: currentDomain } =
        extractProtocolAndDomain(domainData?.domain || "");

      const isChanged =
        currentValues.protocol !== currentProtocol ||
        currentValues.domain !== currentDomain ||
        currentValues.status !== domainData.status ||
        currentValues.isActive !== domainData.isActive;

      setIsFormChanged(isChanged);
    }
  };

  const onFinish = async (values) => {
    const createdDate = Math.floor(Date.now() / 1000);
    const fullDomain = `${values.protocol}${values.domain}`;
    const { protocol, ...rest } = values;

    const formData = { ...rest, domain: fullDomain };

    let response;
    if (domainData) {
      response = await updateDomain({ id: domainData.id, ...formData });
    } else {
      response = await createDomain({ ...formData, createdDate });
    }

    if (response.data) {
      form.resetFields();
      closeDrawer();
    }
    if (response.error) {
      form.resetFields();
      closeDrawer();
    }
  };

  return (
    <Drawer
      title={domainData ? "Update domain" : "Create a new domain"}
      width={window.innerWidth < 768 ? "90%" : 720}
      onClose={closeDrawer}
      open={openDrawer}
      styles={{ body: { paddingBottom: 80 } }}
    >
      <Form
        form={form}
        name="drawerForm"
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item name="createdDate" hidden>
          <Input type="hidden" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="domain"
              label="Domain"
              rules={[
                { required: true, message: "Please enter the domain" },
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
                onBlur={() => form.validateFields(["domain"])}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="status"
              label="Verification status"
              rules={[{ required: true, message: "Please select the status" }]}
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
              label="Active status"
              rules={[
                { required: true, message: "Please select the active status" },
              ]}
            >
              <Select placeholder="Please select the active status">
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row className="px-2">
          <Space>
            <CustomButton onClick={closeDrawer}>Cancel</CustomButton>
            <CustomButton
              onClick={() => form.submit()}
              loading={domainData ? isUpdating : isCreating}
              type="primary"
              disabled={domainData && !isFormChanged}
            >
              {domainData ? "Update" : "Submit"}
            </CustomButton>
          </Space>
        </Row>
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
