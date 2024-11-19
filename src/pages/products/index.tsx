import {
  Badge,
  Image,
  Input,
  Button,
  Table,
  message,
  Popconfirm,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { pageSize } from "./constants";
import { formatCurrency } from "../../utils/format-currency";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../redux/api/productApi";
import { ProductList } from "../../redux/types";

interface ErrorResponse {
  message: string;
}

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const {
    data,
    error,
    isLoading: isProductLoading,
  } = useGetProductsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (error && "data" in error) {
      const errorData = (error as FetchBaseQueryError).data as ErrorResponse;
      const errorMsg = errorData.message;
      message.error(errorMsg);
    }
  }, [error]);

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProduct(id).unwrap();
      if (response?.message) {
        message.success(response.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to delete product.");
    }
  };

  const columns: TableColumnsType<ProductList> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_, _record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      className: "font-semibold text-gray-700",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="p-4">
          <Input
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            className="mb-2"
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            className="mr-2"
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small">
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        return (
          typeof record.name === "string" &&
          record.name.toLowerCase().includes((value as string).toLowerCase())
        );
      },
      render: (name: string) => (
        <Tag className="text-xs font-semibold px-3 py-1 rounded-lg ">
          {name}
        </Tag>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageUrl: string) => (
        <Image
          src={imageUrl}
          alt="Product"
          width={80}
          height={80}
          className="object-cover rounded-md border border-white shadow-sm"
          style={{ borderRadius: 4 }}
          preview={{
            maskClassName: "bg-gray-900/50",
            mask: <span className="text-white text-center text-xs">View</span>,
          }}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <Tag
          color="gold"
          className="text-xs font-semibold px-3 py-1 rounded-lg "
        >
          {formatCurrency(price)}
        </Tag>
      ),
      filters: [
        { text: "Below 10M", value: 10000000 },
        { text: "10M - 20M", value: 20000000 },
        { text: "Above 20M", value: 20000001 },
      ],
      onFilter: (value, record) => {
        if (value === 10000000) return record.price < value;
        if (value === 20000000)
          return record.price >= 10000000 && record.price <= value;
        return record.price > 20000000;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "font-medium",
      render: (status: string) => (
        <Badge
          color={status === "active" ? "green" : "red"}
          text={status === "active" ? "Active" : "Inactive"}
          className="font-medium"
        />
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex items-center space-x-4">
          <Link
            to={`/products/${record._id}`}
            className="transition-colors duration-300 ease-in hover:underline flex items-center space-x-1"
          >
            <EyeOutlined />
            <span>View</span>
          </Link>
          <Link
            to={`/products/${record._id}/edit`}
            className="transition-colors duration-300 ease-in hover:underline flex items-center space-x-1"
          >
            <EditOutlined />
            <span>Edit</span>
          </Link>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <span className="text-red-500 cursor-pointer transition-colors duration-300 ease-in hover:text-red-700 flex items-center space-x-1">
              <DeleteOutlined />
              <span>Delete</span>
            </span>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-3">
        <Button className="mb-4" onClick={() => navigate("/products/create")}>
          <PlusCircleOutlined />
          Add New Product
        </Button>
        <Button
          className="mb-4"
          onClick={() => navigate("/products/create/variant")}
        >
          <PlusCircleOutlined />
          Add New Product Variant
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isProductLoading || isDeleteLoading}
        pagination={{
          pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
        className="text-sm"
        rowKey={(record) => `${record._id}-${record.name}`}
      />
    </div>
  );
};

export default Products;
