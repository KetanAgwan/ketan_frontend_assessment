import { Col, Row, Select, Input, Typography, Alert } from "antd";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DrawerForm from "../components/DrawerForm";
import {
  useCreateDomainMutation,
  useDeleteDomainMutation,
  useGetDomainsQuery,
  useUpdateDomainMutation,
} from "../api/domain_api/domainSliceApi";
import DomainTable from "../components/DomainTable";

const { Title } = Typography;

const Home = () => {
  // Separate visibility states for each alert type
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  //srearch and sort query states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("asc");

  // Fetch data from the API
  const fetchedData = useGetDomainsQuery();

  // Define mutations for the domain
  const [
    createDomain,
    {
      isLoading: isCreating,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
    },
  ] = useCreateDomainMutation();

  const [
    updateDomain,
    {
      isLoading: isUpdating,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
    },
  ] = useUpdateDomainMutation();

  const [
    deleteDomain,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isErrorWhileDeleting,
    },
  ] = useDeleteDomainMutation();

  // State to handle drawer form
  const [openDrawer, setOpenDrawer] = useState(false);
  const [domainData, setDomainData] = useState(null);

  // Handle alerts for different mutations
  useEffect(() => {
    if (isDeleteSuccess || isErrorWhileDeleting) {
      setShowDeleteAlert(true);
      const timer = setTimeout(() => setShowDeleteAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isDeleteSuccess, isErrorWhileDeleting]);

  useEffect(() => {
    if (isCreateSuccess || isCreateError) {
      setShowCreateAlert(true);
      const timer = setTimeout(() => setShowCreateAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isCreateSuccess, isCreateError]);

  useEffect(() => {
    if (isUpdateSuccess || isUpdateError) {
      setShowUpdateAlert(true);
      const timer = setTimeout(() => setShowUpdateAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isUpdateSuccess, isUpdateError]);

  useEffect(() => {
    if (fetchedData.isError) {
      setShowErrorAlert(true);
      const timer = setTimeout(() => setShowErrorAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [fetchedData.isError]);

  const showDrawer = (domainData = null) => {
    setDomainData(domainData);
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setDomainData(null);
  };

  const onSearch = (value) => {
    setSearchQuery(value);
  };

  // Filter options
  const options = [
    { value: "asc", label: "Order by Ascending" },
    { value: "desc", label: "Order by Descending" },
  ];

  // Modified renderAlert to use specific alert states
  const renderAlert = (visible, message, type) => {
    return visible ? (
      <Alert
        message={message}
        type={type}
        showIcon
        className="w-full rounded-md shadow-lg py-3 px-2"
      />
    ) : null;
  };

  return (
    <Row className="px-2 md:px-2 lg:px-5" gutter={[16, 24]}>
      {/* Title */}
      <Col span={24}>
        <Title level={2} className="mb-0">
          Domains
        </Title>
      </Col>

      {/* Button, Select, and Search Row */}
      <Col span={24}>
        <Row
          gutter={[16, 16]}
          className="w-full pr-0 !m-0"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {/* Button Column */}
          <Col className="!p-0" xs={24} md={6} lg={6}>
            <CustomButton
              type="primary"
              onClick={() => showDrawer()} // Open drawer in insert mode
              icon={<PlusOutlined />}
              block
              className="h-10 md:!max-w-40"
            >
              Add Domain
            </CustomButton>
            <DrawerForm
              openDrawer={openDrawer}
              closeDrawer={closeDrawer}
              domainData={domainData}
              isCreating={isCreating}
              createDomain={createDomain}
              isUpdating={isUpdating}
              updateDomain={updateDomain}
            />
          </Col>

          {/* Select and Search Columns Wrapper */}
          <Col
            {...{ xs: 24, md: 18, lg: 18 }}
            className="flex justify-end flex-wrap gap-4 xs:mt-4 md:mt-0 !p-0"
          >
            {/* Select Column */}
            <Col className="!p-0" xs={24} md={8} lg={6}>
              <Select
                defaultValue="Order by Ascending"
                className="w-full"
                onChange={(value) =>
                  setSortType(value === "asc" ? "asc" : "desc")
                }
                options={options}
                size="large"
              />
            </Col>

            {/* Search Column */}
            <Col className="!p-0" xs={24} md={12} lg={10}>
              <Input
                addonBefore={<SearchOutlined />}
                placeholder="input search text"
                allowClear
                onKeyUp={(e) => onSearch(e.target.value)}
                size="large"
                className="w-full custom-input-with-transparent-addon"
              />
            </Col>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <div
          className={`w-full mx-auto mt-5 overflow-hidden transition-all duration-500 ease-in-out 
          ${
            showErrorAlert ||
            showDeleteAlert ||
            showCreateAlert ||
            showUpdateAlert
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          {renderAlert(showErrorAlert, "Something went wrong", "error")}
          {renderAlert(
            showDeleteAlert && isErrorWhileDeleting,
            "Something went wrong",
            "error"
          )}
          {renderAlert(
            showDeleteAlert && isDeleteSuccess,
            "Domain deleted successfully",
            "success"
          )}
          {renderAlert(
            showCreateAlert && isCreateSuccess,
            "Domain created successfully",
            "success"
          )}
          {renderAlert(
            showCreateAlert && isCreateError,
            "Creation failed",
            "error"
          )}
          {renderAlert(
            showUpdateAlert && isUpdateSuccess,
            "Domain updated successfully",
            "success"
          )}
          {renderAlert(
            showUpdateAlert && isUpdateError,
            "Update failed",
            "error"
          )}
        </div>

        <DomainTable
          fetchedData={fetchedData}
          sortType={sortType}
          showDrawer={showDrawer}
          deleteDomain={deleteDomain}
          isErrorWhileDeleting={isErrorWhileDeleting}
          isDeleting={isDeleting}
          searchQuery={searchQuery}
          updateDomain={updateDomain}
        />
      </Col>
    </Row>
  );
};

export default Home;
