import { Rate, Badge, Image, Input, Button, Table } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import type { DataType } from "./types";
import { desc } from "./constants";
import { formatCurrency } from "../../utils/format-currency";
// import { useGetProductsQuery } from "../../redux/api";

const columns: TableColumnsType<DataType> = [
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
    render: (price: number) => formatCurrency(price),
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
    onFilter: (value, record) => Math.floor(record.rating) === value,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    className: "font-medium",
    render: (status: string) => (
      <Badge
        color={status === "Active" ? "green" : "red"}
        text={status}
        className="font-medium"
      />
    ),
    filters: [
      { text: "Active", value: "Active" },
      { text: "Inactive", value: "Inactive" },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <div className="flex justify-center items-center space-x-4">
        <Link
          to="/products/1/edit"
          className="transition-colors duration-300 ease-in hover:underline flex items-center space-x-1"
        >
          <EditOutlined />
          <span>Edit</span>
        </Link>
        <span className="text-red-500 cursor-pointer transition-colors duration-300 ease-in hover:text-red-700 flex items-center space-x-1">
          <DeleteOutlined />
          <span>Delete</span>
        </span>
      </div>
    ),
  },
];

const dataSource: DataType[] = Array.from({ length: 100 }).map((_, i) => ({
  key: i,
  name: `Product ${i + 1}`,
  image:
    "https://i.pinimg.com/564x/98/66/86/98668673a6787ee39af4e6320d980b1d.jpg",
  price: 30000000,
  rating: 4.8,
  status: "Active",
}));

const Products = () => {
  // const { data, error, isLoading } = useGetProductsQuery();
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
        className="ant-table-tbody text-sm"
      />
    </div>
  );
};

export default Products;
