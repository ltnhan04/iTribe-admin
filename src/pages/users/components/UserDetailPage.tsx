// export default UserDetailPage;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User, Order, ProductVariant } from "../types";
import {
  Spin,
  Pagination,
  Button,
  message,
  Badge,
  Card,
  Table,
  Select,
  Modal,
  Space,
  Tag,
  Input,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  DollarOutlined,
  HomeOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  getUserDetails,
  getUserOrders,
  getProductVariantDetail,
  banUser,
  unBanUser,
} from "../../../api/services/users/usersApi";
import { formatCurrency } from "../../../utils/format-currency";
import moment from "moment";
import "moment/locale/vi";
const { Search } = Input;
const { Option } = Select;

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const itemsPerPage = 3;
  const [orderDetails, setOrderDetails] = useState<{
    [key: string]: ProductVariant[];
  }>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderVariants, setSelectedOrderVariants] = useState<
    ProductVariant[]
  >([]);

  const handleViewAllProductDetails = (order: Order) => {
    const variants: ProductVariant[] = orderDetails[order._id] || [];

    if (variants.length === 0) {
      // Handle case where there are no variants available in the `orderDetails`
      message.warning("No product details available.");
    }

    setSelectedOrderVariants(variants);
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrderVariants([]);
  };
  useEffect(() => {
    if (!userId) return;

    const fetchUserDetails = async () => {
      try {
        const userResponse = await getUserDetails(userId);
        setUser(userResponse.data);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch user details.");
      }
    };

    const fetchUserOrders = async () => {
      try {
        const ordersResponse = await getUserOrders(userId);
        setOrders(ordersResponse.data.orderHistory || []);
        const orderVariants: { [key: string]: ProductVariant[] } = {};
        for (const order of ordersResponse.data.orderHistory) {
          const variants: ProductVariant[] = [];
          for (const productItem of order.productVariants) {
            if (productItem.productVariant) {
              const variantId = productItem.productVariant._id;
              if (variantId) {
                try {
                  const response = await getProductVariantDetail(variantId);
                  variants.push(response.data.productVariant);
                } catch (error) {
                  console.error(
                    "Error fetching product variant details:",
                    error
                  );
                }
              }
            }
          }
          orderVariants[order._id] = variants;
        }
        console.log(orderVariants);
        setOrderDetails(orderVariants);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch user orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
    fetchUserOrders();
  }, [userId]);

  const handleBanUser = async () => {
    if (!userId) return;
    try {
      await banUser(userId);
      setUser((prevUser) => ({ ...prevUser!, active: false }));
      message.success(`User ${user?.name} has been banned successfully.`);
    } catch (error) {
      console.error(error);
      message.error("Failed to ban user.");
    }
  };

  const handleUnbanUser = async () => {
    if (!userId) return;
    try {
      await unBanUser(userId);
      setUser((prevUser) => ({ ...prevUser!, active: true }));
      message.success(`User ${user?.name} has been unbanned successfully.`);
    } catch (error) {
      console.error(error);
      message.error("Failed to unban user.");
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleStatusFilterChange = (value: string | undefined) => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to first page after filter change
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "yellow";
      case "shipped":
        return "blue";
      case "delivered":
        return "green";
      case "cancel":
        return "red";
      default:
        return "default";
    }
  };

  const filteredOrders = orders.filter((order) => {
    // Search filtering
    const searchMatch =
      order.status.toLowerCase().includes(searchText.toLowerCase()) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      order.productVariants.some((productItem: any) =>
        productItem.productVariant.name
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );

    // Status filter
    const statusMatch = !statusFilter || order.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const columns = [
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => <span>{formatCurrency(amount)}</span>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <span>
          {moment(createdAt)
            .locale("vi")
            .format("DD [tháng] MM YYYY [vào lúc] h:mm A")}
        </span>
        // This will display the month as "tháng" followed by the month number in Vietnamese
      ),
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (address: string) => <span>{address}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          color={statusColor(status)}
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Order) => (
        <Button
          icon={<EyeOutlined />}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
            border: 0,
          }}
          onClick={() => handleViewAllProductDetails(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <Spin size="large" className="flex justify-center my-8" />;
  }

  if (!user) {
    return <p className="text-center">User not found</p>;
  }

  return (
    <div className="bg-gray-100 py-8  flex justify-center">
      <div className="w-full max-w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center">
              <UserOutlined className="text-2xl text-gray-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mt-3">{user.name}</h3>
          <p className="text-gray-500 text-sm mt-1 break-all sm:whitespace-normal">
            {user.email}
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          {/* User Information */}
          <Card
            title={
              <>
                <PhoneOutlined className="mr-2 text-green-500" />
                User Information
              </>
            }
            bordered={false}
            className="w-full"
          >
            <ul className="space-y-2">
              <li>
                <strong>Name:</strong> {user.name}
              </li>
              <li>
                <PhoneOutlined className="mr-2 text-green-500" />
                <strong>Mobile:</strong> {user.mobile || "Not available"}
              </li>
              <li>
                <strong>Role:</strong> {user.role}
              </li>
              <li>
                <strong>Status:</strong>{" "}
                <Badge
                  color={user.active ? "green" : "red"}
                  text={user.active ? "Active" : "Banned"}
                />
              </li>
              <li>
                <MailOutlined className="mr-2 text-green-500" />
                <strong>Email:</strong> {user.email}
              </li>
              <li>
                <HomeOutlined className="mr-2 text-green-500" />
                <strong>Address:</strong>{" "}
                {user.address
                  ? `${user.address.street}, ${user.address.city}`
                  : "No address available"}
              </li>
            </ul>
          </Card>

          {/* Order History */}
          <Card
            title={
              <>
                <DollarOutlined className="mr-2 text-green-500" /> Order History
              </>
            }
            bordered={false}
            className="w-full"
          >
            <div className="flex justify-between mb-4">
              <Search
                placeholder="Search by order status or product name"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                enterButton="Search"
                style={{ width: 300 }}
              />
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                style={{ width: 200 }}
                placeholder="Filter by Status"
                allowClear
              >
                <Option value="pending">Pending</Option>
                <Option value="processing">Processing</Option>
                <Option value="shipped">Shipped</Option>
                <Option value="delivered">Delivered</Option>
                <Option value="cancel">Cancelled</Option>
              </Select>
            </div>

            <Table
              columns={columns}
              dataSource={currentData}
              pagination={false}
              rowKey="_id"
              className="w-full"
            />
            <Modal
              title="Product Variants"
              visible={isModalVisible}
              onCancel={handleModalClose}
              footer={
                <Button type="primary" onClick={handleModalClose}>
                  Close
                </Button>
              }
              width={600} // Set width for better content display
              className="product-variants-modal"
              destroyOnClose // Ensures modal data is reset when closed
            >
              {selectedOrderVariants.length > 0 ? (
                selectedOrderVariants.map((variant) => (
                  <div
                    key={variant._id}
                    className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-lg"
                  >
                    <Space
                      direction="vertical"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      <h4 className="font-semibold text-xl text-gray-900 flex items-center">
                        <InfoCircleOutlined className="text-blue-500 mr-2" />
                        {variant.name || "Unnamed Product"}
                      </h4>

                      {/* Display Color */}
                      <div className="flex items-center">
                        <strong className="mr-2">Color:</strong>
                        {variant.color ? (
                          <Tag
                            color="green"
                            icon={<CheckCircleOutlined />}
                            className="font-bold"
                          >
                            {variant.color.colorName}
                          </Tag>
                        ) : (
                          <Tag
                            color="red"
                            icon={<CloseCircleOutlined />}
                            className="font-bold"
                          >
                            N/A
                          </Tag>
                        )}
                      </div>

                      {/* Display Price */}
                      <div className="flex items-center">
                        <strong className="mr-2">Price:</strong>
                        <span>{formatCurrency(variant.price) || "N/A"}</span>
                      </div>

                      {/* Display Storage */}
                      <div className="flex items-center">
                        <strong className="mr-2">Storage:</strong>
                        <span>{variant.storage || "N/A"}</span>
                      </div>
                    </Space>
                    <hr className="border-gray-300 my-4" />
                  </div>
                ))
              ) : (
                <p>No product variants available.</p>
              )}
            </Modal>
            <Pagination
              current={currentPage}
              total={filteredOrders.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              className="mt-4"
            />
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          {user.active ? (
            <Button danger onClick={handleBanUser}>
              Ban User
            </Button>
          ) : (
            <Button type="primary" onClick={handleUnbanUser}>
              Unban User
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
