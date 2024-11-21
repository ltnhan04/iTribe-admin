import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Card,
  Spin,
  Typography,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import { UserOutlined, PhoneOutlined, HomeOutlined,UserSwitchOutlined } from "@ant-design/icons";
import {
  fetchAdminProfileApi,
  updateAdminProfileApi,
} from "../../../api/services/users/usersApi";

const { Title, Text } = Typography;

const AdminProfile: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái khi submit form
  const [fetching, setFetching] = useState<boolean>(true); // Trạng thái khi lấy dữ liệu
  const [adminData, setAdminData] = useState<any>(null); // Dữ liệu admin
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Trạng thái hiển thị modal

  // Fetch thông tin admin
  const fetchAdminProfile = async () => {
    try {
      setFetching(true);
      const response = await fetchAdminProfileApi();
      setAdminData(response.data);
      form.setFieldsValue({
        name: response.data.name,
        phoneNumber: response.data.phoneNumber,
        address: response.data.address,
      });
    } catch (error: any) {
      console.error("Error fetching admin profile:", error);
      message.error(
        error.response?.data?.message || "Failed to fetch admin profile"
      );
    } finally {
      setFetching(false);
    }
  };

  // Hàm cập nhật thông tin
  const handleUpdateProfile = async (values: any) => {
    try {
      setLoading(true);
      await updateAdminProfileApi(values);
      message.success("Profile updated successfully!");
      setIsModalVisible(false);
      fetchAdminProfile(); // Reload dữ liệu
    } catch (error: any) {
      console.error("Error updating admin profile:", error);
      message.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    fetchAdminProfile();
  }, []);

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-h-screen bg-gradient-to-b from-blue-100 to-blue-50 flex justify-center items-center p-6">
      <Card
        className="w-full max-w-3xl shadow-lg border-0 rounded-lg"
        style={{ backgroundColor: "#fffff", borderRadius: "12px" }}
      >
        {/* Header */}
        <Title level={2} className="text-center mb-6 text-blue-600">
          Admin Profile
        </Title>

        {/* Thông tin */}
        <div className="px-4">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Text strong>
                <UserOutlined /> Name:
              </Text>
            </Col>
            <Col span={16}>
              <Text>{adminData?.name}</Text>
            </Col>

            <Col span={8}>
              <Text strong>
                <PhoneOutlined /> Phone:
              </Text>
            </Col>
            <Col span={16}>
              <Text>{adminData?.phoneNumber}</Text>
            </Col>

            <Col span={8}>
              <Text strong>
                <HomeOutlined /> Address:
              </Text>
            </Col>
            <Col span={16}>
              <Text>{adminData?.address}</Text>
            </Col>
            <Col span={8}>
              <Text strong>
              <UserSwitchOutlined /> Role:
              </Text>
            </Col>
            <Col span={16}>
              <Text>{adminData?.role}</Text>
            </Col>
          </Row>
        </div>

        {/* Divider */}
        <Divider className="my-6" />

        {/* Nút mở modal */}
        <div className="text-center">
          <Button
            type="primary"
            size="large"
            onClick={() => setIsModalVisible(true)}
            style={{
              background: "linear-gradient(90deg, #4A90E2, #50E3C2)",
              border: "none",
              boxShadow: "0 4px 15px rgba(74, 144, 226, 0.3)",
            }}
          >
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Modal chỉnh sửa */}
      <Modal
        title="Edit Profile"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        bodyStyle={{ padding: "24px 32px" }}
        style={{ borderRadius: "8px" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          initialValues={{
            name: adminData?.name || "",
            phoneNumber: adminData?.phoneNumber || "",
            address: adminData?.address || "",
          }}
        >
          <Form.Item
            label={<span className="text-gray-700">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
  label={<span className="text-gray-700">Phone Number</span>}
  name="phoneNumber"
  rules={[
    { required: true, message: "Please enter your phone number" },
    { pattern: /^0\d{9}$/, message: "Phone number must start with 0 and contain 10 digits" }, // Kiểm tra bắt đầu bằng số 0 và có 10 chữ số
  ]}
>
  <Input placeholder="Enter your phone number" />
</Form.Item>


          <Form.Item
            label={<span className="text-gray-700">Address</span>}
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input.TextArea
              placeholder="Enter your address"
              rows={3}
              className="resize-none"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full mt-4"
            style={{
              background: "linear-gradient(90deg, #4A90E2, #50E3C2)",
              border: "none",
            }}
          >
            Save Changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProfile;
