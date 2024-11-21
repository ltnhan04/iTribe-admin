import { useState, useEffect } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import {
  Table,
  Modal,
  Input,
  Button,
  Form,
  DatePicker,
  message,
  Badge,
  Space,
  FloatButton,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";

import { DataType, FormValues } from "./types";
import {
  promotionNameRules,
  startDateRules,
  endDateRules,
  discountRules,
  maxUsageRules,
  minOrderAmountRules,
} from "../../schemaValidation/promotion.schema";
import { pageSize } from "../products/constants";
import {
  fetchPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../../api/services/promotion/promotionApi";
import { formatCurrency } from "../../utils/format-currency";

interface ErrorType {
  response: {
    data: {
      error: string;
    };
  };
}

const Promotions = () => {
  const [, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promotions, setPromotions] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPromotionId, setCurrentPromotionId] = useState<string | null>(
    null
  );
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchPromotions();
      if (response?.promotions && Array.isArray(response.promotions)) {
        const data: DataType[] = response.promotions.map((item: DataType) => ({
          ...item,
          key: item._id,
          status: item.isActive ? "Active" : "Inactive",
          maxUsage: item.maxUsage,
        }));
        setPromotions(data);
      }
    } catch (error: unknown) {
      const typedError = error as ErrorType;
      const errorMsg = typedError?.response?.data?.error;
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
    fetchData();
  };

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      const startDate = values.startDate;
      const endDate = values.endDate;
      const promotionData = {
        code: values.code,
        discountPercentage: values.discount,
        validFrom: startDate,
        validTo: endDate,
        maxUsage: values.maxUsage,
        minOrderAmount: values.minOrderAmount,
        isActive: true,
      };

      if (currentPromotionId) {
        const response = await updatePromotion(
          currentPromotionId,
          promotionData
        );
        message.success(response.data.message);
      } else {
        const response = await createPromotion(promotionData);
        message.success(response.data.message);
      }
      handleOk();
    } catch (error: unknown) {
      console.log(error);
      const typedError = error as ErrorType;
      const errorMsg = typedError?.response?.data?.error;
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (record: DataType) => {
    form.setFieldsValue({
      code: record.code,
      discount: record.discountPercentage,
      startDate: dayjs(record.validFrom),
      endDate: dayjs(record.validTo),
      maxUsage: record.maxUsage,
      minOrderAmount: record.minOrderAmount,
    });
    setCurrentPromotionId(record._id);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deletePromotion(id);
      message.success(response.data.message);
      fetchData();
    } catch (error: unknown) {
      const typedError = error as ErrorType;
      const errorMsg = typedError?.response?.data?.error;
      message.error(errorMsg);
    }
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: "Promotion Code",
      dataIndex: "code",
      key: "code",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search by code"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters?.();
                confirm(); // Apply reset
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) =>
        record.code.toLowerCase().includes((value as string).toLowerCase()),
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Discount (%)",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      render: (discount) => `${discount}%`,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Filter by Discount"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters?.();
                confirm(); // Apply reset
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.discountPercentage
          .toString()
          .includes((value as string).toLowerCase()),
    },
    {
      title: "Min Order Amount",
      dataIndex: "minOrderAmount",
      key: "minOrderAmount",
      sorter: (a, b) => a.minOrderAmount - b.minOrderAmount,
      render: (text: number) => formatCurrency(text),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Filter by Min Order Amount"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters?.();
                confirm(); // Apply reset
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.minOrderAmount
          .toString()
          .includes((value as string).toLowerCase()),
    },
    {
      title: "Start Date",
      dataIndex: "validFrom",
      key: "validFrom",
      render: (text: string) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => {
        const dateA = new Date(a.validFrom).getTime();
        const dateB = new Date(b.validFrom).getTime();
        return dateA - dateB; // Sort ascending
      },
      sortDirections: ["ascend", "descend"], // Optional: specifies sorting directions
    },
    {
      title: "End Date",
      dataIndex: "validTo",
      key: "validTo",
      render: (text: string) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => {
        const dateA = new Date(a.validTo).getTime();
        const dateB = new Date(b.validTo).getTime();
        return dateA - dateB;
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: DataType) => (
        <Badge status={record.isActive ? "success" : "default"} text={text} />
      ),
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Button
            type="link"
            onClick={() => {
              setSelectedKeys(["active"]);
              confirm?.();  // Optional chaining to ensure confirm is called safely
            }}
          >
            Active
          </Button>
          <Button
            type="link"
            onClick={() => {
              setSelectedKeys(["inactive"]);
              confirm?.();  // Optional chaining to ensure confirm is called safely
            }}
          >
            Inactive
          </Button>
          <Button
            type="link"
            onClick={() => {
              clearFilters?.();  // Optional chaining to ensure clearFilters is called safely
              confirm?.();
            }}
          >
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        if (value === "active") {
          return record.isActive === true;
        } else if (value === "inactive") {
          return record.isActive === false;
        }
        return true;
      },
      sortDirections: ["ascend", "descend"],
    },    
    {
      title: "Action",
      key: "action",
      render: (record: DataType) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleUpdate(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this promotion?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  return (
    <>
      <FloatButton
        icon={<PlusOutlined />}
        type="default"
        style={{ insetInlineEnd: 94 }}
        onClick={() => setIsModalVisible(true)}
      />
      <Table
        columns={columns}
        dataSource={promotions}
        loading={loading}
        rowKey="_id"
        pagination={{
          pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
        className="text-sm"
      />
      <Modal
        title={currentPromotionId ? "Edit Promotion" : "Add Promotion"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="Promotion Code"
              name="code"
              rules={promotionNameRules}
            >
              <Input placeholder="Enter promotion code" />
            </Form.Item>
            <Form.Item
              label="Discount (%)"
              name="discount"
              rules={discountRules}
            >
              <Input disabled={loading} placeholder="Enter discount" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={startDateRules}
            >
              <DatePicker
                disabled={loading}
                className="w-full"
                format="DD-MM-YYYY"
              />
            </Form.Item>
            <Form.Item label="End Date" name="endDate" rules={endDateRules}>
              <DatePicker
                disabled={loading}
                className="w-full"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label="Max Usage" name="maxUsage" rules={maxUsageRules}>
              <Input disabled={loading} placeholder="Enter max usage" />
            </Form.Item>
            <Form.Item
              label="Min Order Amount"
              name="minOrderAmount"
              rules={minOrderAmountRules}
            >
              <Input disabled={loading} placeholder="Enter min order amount" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {currentPromotionId ? "Save Changes" : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Promotions;
