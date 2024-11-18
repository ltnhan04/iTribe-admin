import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  fetchPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../../api/services/promotion/promotionApi";
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
} from "antd";
import { DataType, FormValues } from "./types";
import { promotionNameRules, startDateRules, endDateRules, discountRules, maxUsageRules } from "../../schemaValidation/promotion.schema";
import dayjs from "dayjs";

const Promotions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promotions, setPromotions] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPromotionId, setCurrentPromotionId] = useState<string | null>(null);
  const [form] = Form.useForm(); // Khởi tạo form từ Form.useForm()

  const fetchData = async () => {
    try {
      const response = await fetchPromotions();
      if (response && response.promotions && Array.isArray(response.promotions)) {
        const data: DataType[] = response.promotions.map((item: DataType) => ({
          ...item,
          key: item._id,
          status: item.isActive ? "Active" : "Inactive",
          maxUsage: item.maxUsage,
        }));
        setPromotions(data);
      } else {
        throw new Error("Dữ liệu trả về không đúng định dạng");
      }
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
      if (currentPromotionId) {
        await updatePromotion(currentPromotionId, {
          code: values.code,
          discountPercentage: values.discount,
          validFrom: startDate,
          validTo: endDate,
          maxUsage: values.maxUsage, 
          isActive: true,

        });
        message.success("Khuyến mãi đã được cập nhật thành công!");
      } else {
        await createPromotion({
          code: values.code,
          discountPercentage: values.discount,
          validFrom: startDate,
          validTo: endDate,
          maxUsage: values.maxUsage,
          isActive: true,
        });
        message.success("Khuyến mãi đã được tạo thành công!");
      }
      handleOk();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    // { title: "STT",
    //   render: (text: string, record: DataType, index: number) => index + 1,
    // },
    { title: "Mã Khuyến Mãi", 
      dataIndex: "code", 
      key: "code" },
    {
      title: "Giảm Giá (%)",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Số lượng sử dụng",
      key: "maxUsage",
      render: (record: DataType) => `${record.usedCount}/${record.maxUsage}`,
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "validFrom",
      key: "validFrom",
      render: (text: string) => new Date(text).toLocaleDateString("en-GB"),
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "validTo",
      key: "validTo",
      render: (text: string) => new Date(text).toLocaleDateString("en-GB"),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text: string, record: DataType) => (
        <Badge status={record.isActive ? "success" : "default"} text={text} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: DataType) => (
        <Space size="middle">
          <a onClick={() => handleUpdate(record)}>Sửa</a>
          <a onClick={() => handleDelete(record._id)}>Xóa</a>
        </Space>
      ),
    },
  ];

  const handleUpdate = (record: DataType) => {
    form.setFieldsValue({
      code: record.code,
      discount: record.discountPercentage,
      startDate: dayjs(record.validFrom),
      endDate: dayjs(record.validTo),
      maxUsage: record.maxUsage,
    });
    setCurrentPromotionId(record._id);
    setIsModalVisible(true);
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
        title={currentPromotionId ? "Sửa Khuyến Mãi" : "Thêm Khuyến Mãi"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label="Số lượng tối đa" name="maxUsage" rules={maxUsageRules}>
              <Input placeholder="Nhập vào số lượng" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {currentPromotionId ? "Lưu thay đổi" : "Lưu"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Promotions;
