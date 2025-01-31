import {
  CheckCircleFilled,
  ExclamationCircleOutlined,
  ExportOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Popconfirm, Row, Space, Table } from "antd";
import React from "react";
import { sortByCreatedDate } from "../utils/sort";
import { filterDomainsBySearch } from "../utils/search";
import { Typography } from "antd";

const { Text } = Typography;

const DomainTable = ({
  fetchedData,
  showDrawer,
  deleteDomain,
  isDeleting,
  sortType,
  searchQuery,
  updateDomain,
  isUpdating,
  pageSize,
}) => {
  //accesing the states of the mutation hooks
  const { data: domainList, isLoading, isError } = fetchedData;

  //   columns for the table
  const columns = [
    {
      title: "Domain url",
      dataIndex: "domain",
      key: "domain",
      render: (url, record) => (
        <a href={url} target="_blank" rel="noreferrer ">
          {record.isActive ? (
            <CheckCircleFilled className="text-green-500 mr-3" />
          ) : (
            <ExclamationCircleOutlined className="text-red-500 mr-3" />
          )}
          <span>{url}</span>
          <ExportOutlined className="text-[12px] ml-3 text-gray-400" />
        </a>
      ),
    },
    {
      title: "Active status",
      dataIndex: "isActive",
      key: "isActive",
      render: (_, record) => (
        <Space size="middle">
          {record.isActive ? (
            <Text type="success">Active</Text>
          ) : (
            <Text type="danger">Not Active</Text>
          )}
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
            <Text type="success">Verified</Text>
          ) : record.status === "pending" ? (
            <Text type="warning">Pending</Text>
          ) : record.status === "rejected" ? (
            <Text type="danger">Rejected</Text>
          ) : null}
        </Space>
      ),
    },
    {
      title: "",
      key: "options",
      render: (_, record) => {
        const dropdownItems = [
          {
            label: "Edit details",
            key: "1",
            onClick: () => {
              showDrawer(record);
            },
          },
          {
            label:
              record.status === "verified"
                ? "Unverify domain"
                : "Verify domain",
            key: "2",
            onClick: () => {
              if (record.status === "verified") {
                updateDomain({ id: record.id, status: "pending" });
              } else {
                updateDomain({ id: record.id, status: "verified" });
              }
            },
          },
          {
            label: (
              <Popconfirm
                title="Delete domain"
                description="Are you sure to delete this domain?"
                onConfirm={() => deleteDomain(record.id)}
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                  loading: isDeleting,
                }}
              >
                <p
                  style={{
                    opacity: 1,
                    height: "100%",
                    width: "100%",
                  }}
                >
                  Delete
                </p>
              </Popconfirm>
            ),
            key: "3",
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
              placement="bottomRight"
            >
              <Space className="cursor-pointer">
                <MoreOutlined
                  style={{
                    fontSize: "0.8rem",
                  }}
                />
              </Space>
            </Dropdown>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <Table
        bordered
        className="custom-table global-border-radius w-full mt-2"
        columns={columns || []}
        dataSource={sortByCreatedDate(
          filterDomainsBySearch(domainList || [], searchQuery),
          sortType
        )}
        loading={isLoading}
        locale={{
          emptyText: isError ? "Failed to load data" : "No data available",
        }}
        pagination={{
          pageSize: pageSize,
          size: "small",
          showSizeChanger: false,
        }}
        scroll={{
          x: 1000,
        }}
      />
    </>
  );
};

export default DomainTable;
