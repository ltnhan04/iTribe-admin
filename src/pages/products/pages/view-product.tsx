import { Link, useLocation } from "react-router-dom";
import {
  Badge,
  Image,
  Input,
  Button,
  Table,
  message,
  Popconfirm,
  Tag,
  Rate,
  Card,
  Tooltip,
  Space,
} from "antd";
import { useGetProductQuery } from "../../../redux/api/productApi";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { desc, pageSize } from "../constants";
import { formatCurrency } from "../../../utils/format-currency";
import type { Variant } from "../../../redux/types";
import { useDeleteProductVariantMutation } from "../../../redux/api/productVariantApi";

interface ErrorType {
  data: {
    error: string;
  };
}

const ViewProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, error, isLoading, refetch } = useGetProductQuery(id);
  const [deleteProductVariant, { isLoading: isDeleting }] =
    useDeleteProductVariantMutation();

  useEffect(() => {
    if (error) {
      const typedError = error as ErrorType;
      const errorMsg = typedError?.data?.error;
      message.error(errorMsg);
    }
  }, [error]);

  const columns: TableColumnsType<Variant> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (_, _record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Variant Name",
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
            placeholder="Search Name"
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
      title: "Storage",
      dataIndex: "storage",
      key: "storage",
      filters: [
        { text: "64 GB", value: "64 GB" },
        { text: "128 GB", value: "128 GB" },
        { text: "256 GB", value: "256 GB" },
        { text: "512 GB", value: "512 GB" },
        { text: "1 TB", value: "1 TB" },
      ],
      onFilter: (value, record) => record.storage === value,
      render: (storage: string) => <span>{storage}</span>,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      filters: [
        { text: "Trắng", value: "Trắng" },
        { text: "Đen", value: "Đen" },
        { text: "Black", value: "black" },
      ],
      onFilter: (value, record) => record.color.colorName === value,
      render: (color) => (
        <div className="flex items-center space-x-2">
          <span
            style={{
              backgroundColor: color.colorCode,
              display: "inline-block",
              borderWidth: 2,
              width: 16,
              height: 16,
              borderRadius: "50%",
            }}
          ></span>
          <span>{color.colorName}</span>
        </div>
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
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => (
        <Badge
          count={stock}
          style={{
            backgroundColor: stock > 10 ? "#52c41a" : "#ff4d4f",
          }}
        />
      ),
      filters: [
        { text: "Below 10", value: "below" },
        { text: "Above 10", value: "above" },
      ],
      onFilter: (value, record) => {
        if (value === "below") {
          return record.stock < 10;
        }
        if (value === "above") {
          return record.stock > 10;
        }
        return false;
      },
    },

    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <Rate allowHalf defaultValue={0} value={rating} tooltips={desc} />
      ),
      filters: [
        { text: "1 Star", value: 1 },
        { text: "2 Stars", value: 2 },
        { text: "3 Stars", value: 3 },
        { text: "4 Stars", value: 4 },
        { text: "5 Stars", value: 5 },
      ],
      onFilter: (value, record) => Math.floor(record.rating || 0) === value,
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images: string[]) =>
        images.map((url) => (
          <Image
            key={url}
            src={url}
            alt="Product"
            width={50}
            height={50}
            className="object-cover rounded-md border border-white shadow-sm"
            style={{ borderRadius: 4 }}
            preview={{
              maskClassName: "bg-gray-900/50",
              mask: (
                <span className="text-white text-center text-xs">View</span>
              ),
            }}
          />
        )),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space>
          <Tooltip title="View Details">
            <Link to={`/products/details/${record._id}`}>
              <EyeOutlined />
            </Link>
          </Tooltip>
          <Tooltip title="Edit Variant">
            <Link to={`/products/details/${record._id}/edit`}>
              <EditOutlined />
            </Link>
          </Tooltip>
          <Tooltip title="Delete Variant">
            <Popconfirm
              title="Are you sure to delete this variant?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProductVariant(id).unwrap();
      console.log(response);
      if (response) {
        message.success(response.message);
        refetch();
      }
    } catch (error: unknown) {
      const typedError = error as ErrorType;
      const errorMsg = typedError?.data?.error || "Oops something went wrong!";
      message.error(errorMsg);
    }
  };

  return (
    <Card title={`${data?.product.name}'s Variants`}>
      <Table
        dataSource={data?.product.variants || []}
        columns={columns}
        rowKey="_id"
        loading={isLoading || isDeleting}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
        scroll={{ x: "1000px" }}
      />
    </Card>
  );
};

export default ViewProduct;
