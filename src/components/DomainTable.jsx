import {
  CheckCircleFilled,
  ExportOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Popconfirm, Row, Space, Table, Tag } from "antd";
import React from "react";
import { sortByCreatedDate } from "../utils/sort";
import { filterDomainsBySearch } from "../utils/search";

const DomainTable = ({
  fetchedData,
  showDrawer,
  deleteDomain,
  isDeleting,
  sortType,
  searchQuery,
  updateDomain,
}) => {
  //accesing the states of the mutation hooks
  const { data: domainList, isLoading, isError } = fetchedData;

  const columns = [
    {
      title: "Domain url",
      dataIndex: "domain",
      key: "domain",
      render: (url, record) => (
        <a href={url} target="_blank" rel="noreferrer">
          {!record.isActive ? (
            <InfoCircleOutlined className="text-red-500 mr-2" />
          ) : (
            <CheckCircleFilled className="text-green-500 mr-2" />
          )}
          {url}
          <ExportOutlined className="text-[12px] ml-2 opacity-70" />
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
      {/* Table */}
      <Table
        className="w-full mt-2"
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
          pageSize: 10,
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
