import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "./types";
import { Layout, List, Typography, Tag, Avatar, Card, Spin, Row, Col, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";

// Define the Order type
interface Order {
  totalAmount: number;
  status: string;
  products: string[];
}

const { Content } = Layout;
const { Title } = Typography;

const UserDetailPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Dummy order history data
  const dummyOrderHistory: Order[] = [
    {
      totalAmount: 150,
      status: "Completed",
      products: ["Product A", "Product B"],
    },
    {
      totalAmount: 200,
      status: "Pending",
      products: ["Product C"],
    },
  ];

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserDetails = () => {
      // Here we use dummy user data instead of fetching from an API
      const dummyUser: User = {
        id: parseInt(userId, 10),
        name: "George Lindelof",
        mobile: "+4 315 23 62",
        role: "user",
        email: "carlsen@armand.no",
        status: "Active",
        address: {
          street: "123 Elm St",
          city: "Somewhere",
          state: "CA",
          zip: "90210",
        },
      };

      setUser(dummyUser);
      setLoading(false);
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <Layout style={{ minHeight: "100vh", padding: "2rem", backgroundColor: "#f0f2f5" }}>
      <Content style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Card
          bordered
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: "8px",
            padding: "1.5rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <Avatar size={64} icon={<UserOutlined />} />
            <Title level={3} style={{ marginTop: "1rem", marginBottom: 0 }}>
              {user.name}
            </Title>
            <p style={{ color: "#8c8c8c", fontSize: "0.9rem", marginTop: "0.5rem" }}>
              {user.email}
            </p>
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <List
                header={<Title level={4}>User Information</Title>}
                bordered
                dataSource={[
                  { label: "Name", value: user.name },
                  { label: "Mobile", value: user.mobile },
                  { label: "Role", value: user.role },
                  { 
                    label: "Status", 
                    value: <Tag color={user.status === "Active" ? "green" : "red"}>{user.status}</Tag> 
                  },
                  { 
                    label: "Email", 
                    value: user.email 
                  },
                  { 
                    label: "Address", 
                    value: user.address ? (
                      <div>
                        <p style={{ margin: 0 }}>{user.address.street}</p>
                        <p style={{ margin: 0 }}>
                          {user.address.city}, {user.address.state} {user.address.zip}
                        </p>
                      </div>
                    ) : (
                      "No address available"
                    ),
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={<strong>{item.label}</strong>}
                      description={item.value}
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <Title level={4}>Order History</Title>
              {dummyOrderHistory.length > 0 ? (
                <Descriptions bordered column={1}>
                  {dummyOrderHistory.map((order, index) => (
                    <Descriptions.Item label={`Order ${index + 1}`} key={index}>
                      <div>
                        <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Products:</strong></p>
                        <ul>
                          {order.products.map((product, productIndex) => (
                            <li key={productIndex}>{product}</li>
                          ))}
                        </ul>
                      </div>
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              ) : (
                <p>No orders available</p>
              )}
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default UserDetailPage;
