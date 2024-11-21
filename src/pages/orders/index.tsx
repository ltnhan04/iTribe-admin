import React, { useEffect, useState } from "react";
import { Table, Tag,Select,Input, Button,message,Modal,Descriptions,Row,Col,Carousel, Image,} from "antd";
import { Order, Product, ErrorResponse } from "./types";
import {getOrders, updateOrderStatus,getOrderDetail} from "../../api/services/order/orderApi";
import { formatCurrency } from "../../utils/format-currency";

const { Search } = Input;

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await getOrders();
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
      } catch (error: any) {
        message.error(error.message || "Error fetching orders");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      const response = await updateOrderStatus(orderId, status);
      message.success(response.data.message || "Status updated successfully");
      const updatedOrders = orders.map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      );
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      message.error(typedError.response?.data?.message || "An error occurred.");
    }
  };

  const fetchOrderDetail = async (orderId: string) => {
    try {
      const response = await getOrderDetail(orderId);
      setSelectedOrder(response.data.order);
      setIsModalVisible(true);
    } catch (error: any) {
      message.error(error.response?.data?.message || "Error fetching order details");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      sorter: (a: Order, b: Order) => a.orderId.localeCompare(b.orderId),
    },
    {
      title: "User Name",
      dataIndex: ["user", "name"],
      key: "userName",
      sorter: (a: Order, b: Order) =>
        a.user?.name.localeCompare(b.user?.name || ""),
    },
    {
      title: "Products",
      dataIndex: "productVariants",
      key: "products",
      render: (productVariants: Product[]) =>
        productVariants.map((product) => (
          <Tag key={product.productVariantId} color="blue">
            {product.productName} (x{product.quantity})
          </Tag>
        )),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => formatCurrency(amount),
      sorter: (a: Order, b: Order) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "shipped"
            ? "green"
            : status === "processing"
            ? "blue"
            : status === "pending"
            ? "orange"
            : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Processing", value: "processing" },
        { text: "Shipped", value: "shipped" },
        { text: "Cancel", value: "cancel" },
      ],
      onFilter: (value: string | number | boolean, record: Order) =>
        record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Order) => {
        let availableStatus: string[] = [];
        switch (record.status) {
          case "pending":
            availableStatus = ["processing", "cancel"];
            break;
          case "processing":
            availableStatus = ["shipped", "cancel"];
            break;
          case "shipped":
          case "cancel":
            availableStatus = [];
            break;
          default:
            availableStatus = [];
            break;
        }

        return (
          <Select
            defaultValue={record.status}
            style={{ width: 120 }}
            onChange={(value) => handleUpdateStatus(record.orderId, value)}
            disabled={availableStatus.length === 0}
          >
            {availableStatus.map((status) => (
              <Select.Option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Detail",
      key: "detail",
      render: (record: Order) => (
        <Button type="primary" onClick={() => fetchOrderDetail(record.orderId)}>
          Detail
        </Button>
      ),
    },
  ];

  return (
    <>
      <Search
        placeholder="Search orders by ID or User Name"
        allowClear
        onSearch={(value) => {
          const searchValue = value.toLowerCase();
          const filtered = orders.filter(
            (order) =>
              order.orderId.toLowerCase().includes(searchValue) ||
              order.user?.name?.toLowerCase().includes(searchValue)
          );
          setFilteredOrders(filtered);
        }}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Table
        loading={isLoading}
        columns={columns as any} 
        dataSource={filteredOrders}
        rowKey="orderId"
        pagination={{ pageSize: 5 }}
        bordered
      />
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[<Button key="close" onClick={closeModal}>Close</Button>]}
        width={1110}
        centered
      >
        {selectedOrder ? (
          <div style={{ padding: '20px' }}>
            <Row gutter={16}>
              <Col span={24}>
                <Descriptions title="Order Information" bordered>
                  <Descriptions.Item label="Total Amount">
                    {formatCurrency(selectedOrder.totalAmount)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={selectedOrder.status === "shipped" ? "green" : "orange"}>
                      {selectedOrder.status}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Shipping Address">
                    {selectedOrder.shippingAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Payment Method">
                    {selectedOrder.paymentMethod}
                  </Descriptions.Item>
                  <Descriptions.Item label="Created At">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </Descriptions.Item>
                </Descriptions>
              </Col>  
            </Row>

            <Row gutter={16} style={{ marginTop: '20px' }}>
              <Col span={24}>
                <Descriptions title="User Information" bordered>
                  <Descriptions.Item label="User Name">
                    {selectedOrder.user?.name || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {selectedOrder.user?.email || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Phone Number">
                    {selectedOrder.user?.phoneNumber || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                    {typeof selectedOrder.user?.address === 'string' ? selectedOrder.user.address : "N/A"}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            <div style={{ marginTop: '20px' }}>
              <h3 className="font-bold">Products</h3>
              {selectedOrder.productVariants?.map((item, index) => (
                <div key={index} style={{ marginBottom: 16 }}>
                  <strong>{item.productName}</strong> (x{item.quantity}) 
                  {item.productColorName ? ` - ${item.productColorName} (${item.productStorage})` : ""}
                  <Row gutter={16} style={{ marginTop: 8 }}>
                    {item.productImages && item.productImages.length > 0 ? (
                      <div style={{ width: '50%' , height : "50%" ,margin:'auto' }}>
                        {item.productImages.length > 0 && (
                          <Carousel autoplay>
                            {item.productImages.slice(1).map((image:string, imgIndex:string) => (
                              <div key={imgIndex}>
                                <Image 
                                  width="100%" 
                                  src={image} 
                                  alt={`Additional product image ${imgIndex + 1}`} 
                                  preview={true}
                                />
                              </div>
                            ))}
                          </Carousel>
                        )}
                      </div>
                    ) : (
                      <p>No images available</p>
                    )}
                  </Row>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>No order details available</div>
        )}
      </Modal>
    </>
  );
};

export default OrderList;
