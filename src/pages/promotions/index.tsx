import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { fetchPromotions, createPromotion, deletePromotion } from "../../api/services/promotion/promotionApi";
import { Table, Modal, Input, Button, Form, DatePicker, message, Badge, Space, FloatButton } from "antd";
import { DataType, FormValues } from "./types";
import {
  promotionNameRules,
  startDateRules,
  endDateRules,
  discountRules
} from "../../schemaValidation/promotion.schema";
//aa
const Promotions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promotions, setPromotions] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    try {
      const response = await fetchPromotions();
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      message.error("Không thể tải danh sách khuyến mãi");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    setIsModalVisible(false);
    fetchData();
  };
  const handleCancel = () => setIsModalVisible(false);

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      const startDate = values.startDate;
      const endDate = values.endDate;

      await createPromotion({
        code: values.code,
        discountPercentage: values.discount,
        validFrom: startDate,
        validTo: endDate,
        isActive: true,
        maxUsage: 1,
      });
      message.success("Khuyến mãi đã được tạo thành công!");
      handleOk();
    } catch (error) {
      console.error("Error creating promotion:", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "STT"},
    { title: "Mã Khuyến Mãi", dataIndex: "code", key: "code" },
    { title: "Giảm Giá (%)", dataIndex: "discountPercentage", key: "discountPercentage" },
    { title: "Ngày Bắt Đầu", dataIndex: "validFrom", key: "validFrom", render: (text: string) => new Date(text).toLocaleDateString('en-GB') }, 
    { title: "Ngày Kết Thúc", dataIndex: "validTo", key: "validTo", render: (text: string) => new Date(text).toLocaleDateString('en-GB') },
    { title: "Trạng Thái", key: "status", render: (text: string, record: DataType) => (
      <Badge status={record.isActive ? "success" : "default"} text={record.isActive ? "Active" : "Inactive"} />
    )},
    {
      title: "...", key: "action", render: (text: string, record: DataType) => (
        <Space size="middle">
          <a onClick={() => handleUpdate(record)}>Sửa</a>
          <a onClick={() => handleDelete(record._id)}>Xóa</a>
        </Space>
      ),
    },
  ];

  const handleUpdate = (record: DataType) => {
    console.log("Sửa khuyến mãi", record);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePromotion(id);
      message.success("Khuyến mãi đã được xóa");
      fetchData();
    } catch (error) {
      console.error("Error deleting promotion:", error);
      message.error("Có lỗi xảy ra khi xóa");
    }
  };

  return (
    <>
      <FloatButton
        icon={<PlusOutlined />}
        type="default"
        style={{ insetInlineEnd: 94 }}
        onClick={showModal}
      />
      <Table
        columns={columns}
        dataSource={promotions}
        rowKey="_id"
        pagination={false}
      />
      <Modal
        title="Thêm Khuyến Mãi"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label="Mã Khuyến Mãi" name="code" rules={promotionNameRules}>
              <Input placeholder="Nhập mã khuyến mãi" />
            </Form.Item>
            <Form.Item label="Giảm giá (%)" name="discount" rules={discountRules}>
              <Input placeholder="Nhập % giảm giá" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label="Ngày Bắt Đầu" name="startDate" rules={startDateRules}>
              <DatePicker className="w-full" format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item label="Ngày Kết Thúc" name="endDate" rules={endDateRules}>
              <DatePicker className="w-full" format="DD-MM-YYYY" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Promotions;
