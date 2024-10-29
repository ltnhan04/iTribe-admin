import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, message, List, Modal } from 'antd';
import dayjs from 'dayjs';
import { promotionNameRules, descriptionRules, startDateRules, endDateRules } from '../../schemaValidation/promotionValidation.schema';
import { fetchPromotions, createPromotion, updatePromotion, deletePromotion } from '../../api/promotion/promotionApi';

interface Promotion {
  id: number;
  promotionName: string;
  description: string;
  startDate: string;
  endDate: string;
  discount: number;
}

interface FormValues {
  promotionName: string;
  description: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  discount: number;
}

const Promotions: React.FC = () => {
  const [form] = Form.useForm();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const data = await fetchPromotions();
        setPromotions(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          message.error('Không thể tải danh sách khuyến mãi: ' + error.message);
        }
      }
    };
    loadPromotions();
  }, []);

  const handleSubmit = async (values: FormValues) => {
    const formattedValues: Omit<Promotion, 'id'> = {
      ...values,
      startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
    };

    try {
      if (editingPromotion) {
        const updatedPromotion = await updatePromotion(editingPromotion.id, formattedValues);
        setPromotions((prev) =>
          prev.map((promotion) =>
            promotion.id === editingPromotion.id ? updatedPromotion : promotion
          )
        );
        setEditingPromotion(null);
        message.success('Cập nhật khuyến mãi thành công!');
      } else {
        const newPromotion = await createPromotion(formattedValues);
        setPromotions((prev) => [...prev, newPromotion]);
        message.success('Thêm khuyến mãi thành công!');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        message.error('Không thể thực hiện thao tác: ' + error.message);
      }
    }

    form.resetFields();
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    form.setFieldsValue({
      ...promotion,
      startDate: dayjs(promotion.startDate),
      endDate: dayjs(promotion.endDate),
    });
  };

  const handleDelete = (promotionId: number) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa khuyến mãi này?',
      onOk: async () => {
        try {
          await deletePromotion(promotionId);
          setPromotions((prev) =>
            prev.filter((promotion) => promotion.id !== promotionId)
          );
          message.success('Xóa khuyến mãi thành công!');
        } catch (error: unknown) {
          if (error instanceof Error) {
            message.error('Không thể xóa khuyến mãi: ' + error.message);
          }
        }
      },
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        style={{ marginBottom: '20px' }}
      >
        <Form.Item
          label="Tên khuyến mãi"
          name="promotionName"
          rules={promotionNameRules}
        >
          <Input placeholder="Nhập tên khuyến mãi" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={descriptionRules}
        >
          <Input.TextArea placeholder="Nhập mô tả khuyến mãi" rows={4} />
        </Form.Item>

        <Form.Item
          label="Ngày bắt đầu"
          name="startDate"
          rules={startDateRules}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          rules={[endDateRules(form.getFieldValue)]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Phần trăm giảm giá (%)"
          name="discount"
          // rules={discountRules}
        >
          <InputNumber placeholder="Nhập phần trăm giảm giá" min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editingPromotion ? 'Cập nhật khuyến mãi' : 'Thêm khuyến mãi'}
          </Button>
        </Form.Item>
      </Form>

      <List
        header={<h3>Danh sách khuyến mãi</h3>}
        bordered
        dataSource={promotions}
        renderItem={(promotion) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleEdit(promotion)}>
                Sửa
              </Button>,
              <Button type="link" danger onClick={() => handleDelete(promotion.id)}>
                Xóa
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={`${promotion.promotionName} (${promotion.discount}% giảm giá)`}
              description={`Từ: ${promotion.startDate} Đến: ${promotion.endDate}`}
            />
            <div>{promotion.description}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Promotions;
