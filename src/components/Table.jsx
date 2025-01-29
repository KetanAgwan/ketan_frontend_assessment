/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  CheckCircleFilled,
  DownOutlined,
  ExportOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Alert, Dropdown, Popconfirm, Row, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useGetDomainsQuery } from "../api/domain_api/domainSlice";
import { sortDomains } from "../utils/sort";

const CustomeTable = () => {
  const [visible, setVisible] = useState(false); // State to control alert visibility
  const { data: domainList, isLoading, isError, error } = useGetDomainsQuery();

  // Show alert when there's an error
  useEffect(() => {
    if (isError) {
      setVisible(true); // Slide in the alert
      const timer = setTimeout(() => {
        setVisible(false); // Slide out the alert after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isError]);

  const columns = [
    {
      title: "Domain url",
      dataIndex: "domain",
      key: "domain",
      render: (url, record) => (
        <a href="#">
          {!record.isActive ? (
            <InfoCircleOutlined className="text-red-500 mr-2" />
          ) : (
            <CheckCircleFilled className="text-green-500 mr-2" />
          )}
          {url} <ExportOutlined className="text-[12px] ml-2 opacity-70" />
        </a>
      ),
    },
    {
      title: "Active status",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, record) => (
        <Space size="middle">
          <Tag color={record.isActive ? "green" : "red"}>
            {record.isActive ? "Active" : "Inactive"}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Verification status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Space size="middle">
          {record.status === "verified" ? (
            <Tag color="green">Verified</Tag>
          ) : record.status === "pending" ? (
            <Tag color="yellow">Pending</Tag>
          ) : record.status === "rejected" ? (
            <Tag color="red">Rejected</Tag>
          ) : null}
        </Space>
      ),
    },
    {
      title: "",
      key: "options",
      render: (_id, record) => {
        const dropdownItems = [
          {
            label: "Edit details",
            key: "1",
            onClick: () => {
              //   handleEditProjectFile(record); //call the edit function function
            },
          },
          {
            label: (
              <Popconfirm
                title="Delete domain"
                description="Are you sure to delete this domain"
                onConfirm={() => {
                  //   deleteHousePlanHandler(_id); // call delete function
                }}
                okText="Yes"
                cancelText="No"
              >
                <p
                  style={{
                    opacity: 1,
                  }}
                >
                  Delete
                </p>
              </Popconfirm>
            ),
            key: "2",
            danger: true,
          },
        ];

        return (
          <Row justify="end" align="middle">
            <Dropdown
              menu={{
                items: dropdownItems,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <p> Actions</p>
                  <DownOutlined
                    style={{
                      fontSize: "0.8rem",
                    }}
                  />
                </Space>
              </a>
            </Dropdown>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <div
        className={`w-full mx-auto mt-5 overflow-hidden transition-all duration-500 ease-in-out 
                  ${
                    visible ? "max-h-40 opacity-100" : "max-h-0 opacity-0 mt-0"
                  }`}
      >
        {error && (
          <Alert
            message={`Error: ${error.status}`}
            description={error.data}
            type="error"
            showIcon
            className="w-full rounded-md shadow-lg py-3 px-2"
          />
        )}
      </div>

      {/* Table */}
      <Table
        className="w-full mt-10"
        columns={columns || []}
        dataSource={domainList || []} //here we will be sorting the domains
        loading={isLoading}
        locale={{
          emptyText: isError ? "Failed to load data" : "No data available",
        }}
        pagination={{
          pageSize: 10,
          size: "default",
          showSizeChanger: false,
        }}
        scroll={{
          x: 1000,
        }}
      />
    </>
  );
};

export default CustomeTable;
