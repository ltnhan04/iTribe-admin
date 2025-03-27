import React, { useState } from "react";
import { Button, Modal, Form, message, Drawer } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import PromotionTable from "./components/PromotionTable";
import PromotionForm from "./components/PromotionForm";
import PromotionDetails from "./components/PromotionDetails";
import { Promotion, Category, PromotionUserUsage, PromotionFormValues, ProductVariant } from "./types";
import dayjs from "dayjs";

const PromotionPage: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: 1,
      code: "SUMMER2024",
      discount_type: "percentage",
      valid_from: "2024-06-01",
      valid_to: "2024-08-31",
      is_active: true,
      maxUsage: 1000,
      maxUsagePerUser: 3,
      minOrderAmount: 500000,
      usedCount: 450,
      applicable_category_id: 1,
      applicable_variant_ids: [1, 2],
      points: 100,
    },
    {
      id: 2,
      code: "FLASH50K",
      discount_type: "amount",
      valid_from: "2024-05-01",
      valid_to: "2024-05-31",
      is_active: true,
      maxUsage: 500,
      maxUsagePerUser: 2,
      minOrderAmount: 1000000,
      usedCount: 300,
      applicable_category_id: 2,
      applicable_variant_ids: [3],
      points: 50,
    },
    {
      id: 3,
      code: "WELCOME10",
      discount_type: "percentage",
      valid_from: "2024-01-01",
      valid_to: "2024-12-31",
      is_active: true,
      maxUsage: 2000,
      maxUsagePerUser: 1,
      minOrderAmount: 200000,
      usedCount: 1500,
      applicable_category_id: 1,
      applicable_variant_ids: [1, 2],
      points: 200,
    },
  ]);

  const [categories] = useState<Category[]>([
    { id: 1, name: "Smartphones" },
    { id: 2, name: "Laptops" },
    { id: 3, name: "Accessories" },
  ]);

  const [productVariants] = useState<ProductVariant[]>([
    {
      id: 1,
      product_id: 1,
      storage: "128GB",
      price: 999,
      stock_quantity: 100,
      slug: "iphone-15-pro-128gb",
      rating: 4.8,
      color: ["Black", "White"],
      status: "in_stock",
      images: ["image1.jpg", "image2.jpg"],
    },
    {
      id: 2,
      product_id: 1,
      storage: "256GB",
      price: 1199,
      stock_quantity: 50,
      slug: "iphone-15-pro-256gb",
      rating: 4.9,
      color: ["Black", "White"],
      status: "in_stock",
      images: ["image3.jpg", "image4.jpg"],
    },
    {
      id: 3,
      product_id: 2,
      storage: "512GB",
      price: 1499,
      stock_quantity: 30,
      slug: "macbook-pro-512gb",
      rating: 4.7,
      color: ["Space Gray"],
      status: "in_stock",
      images: ["image5.jpg", "image6.jpg"],
    },
  ]);

  const [userUsages] = useState<PromotionUserUsage[]>([
    { id: 1, promotion_id: 1, user_id: 1, usage_count: 2 },
    { id: 2, promotion_id: 1, user_id: 2, usage_count: 3 },
    { id: 3, promotion_id: 2, user_id: 1, usage_count: 1 },
    { id: 4, promotion_id: 2, user_id: 3, usage_count: 2 },
    { id: 5, promotion_id: 3, user_id: 1, usage_count: 1 },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailsDrawerVisible, setIsDetailsDrawerVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [form] = Form.useForm<PromotionFormValues>();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleViewDetails = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setIsDetailsDrawerVisible(true);
  };

  const handleAddPromotion = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingId(promotion.id);
    form.setFieldsValue({
      ...promotion,
      valid_from: dayjs(promotion.valid_from),
      valid_to: dayjs(promotion.valid_to),
    });
    setIsModalVisible(true);
  };

  const handleDeletePromotion = (id: number) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this promotion?",
      onOk: () => {
        setPromotions(promotions.filter((p) => p.id !== id));
        message.success("Promotion deleted successfully");
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const promotionData = {
        ...values,
        id: editingId || Math.max(...promotions.map((p) => p.id)) + 1,
        valid_from: values.valid_from.format("YYYY-MM-DD"),
        valid_to: values.valid_to.format("YYYY-MM-DD"),
        usedCount: editingId
          ? promotions.find((p) => p.id === editingId)?.usedCount || 0
          : 0,
      };

      if (editingId) {
        setPromotions(
          promotions.map((p) =>
            p.id === editingId ? promotionData : p
          )
        );
        message.success("Promotion updated successfully");
      } else {
        setPromotions([...promotions, promotionData]);
        message.success("Promotion added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={handleAddPromotion}
        >
          Add Promotion
        </Button>
      </div>

      <PromotionTable
        data={promotions}
        categories={categories}
        onViewDetails={handleViewDetails}
        onEdit={handleEditPromotion}
        onDelete={handleDeletePromotion}
      />

      <Drawer
        title={`Promotion Details: ${selectedPromotion?.code}`}
        placement="right"
        onClose={() => setIsDetailsDrawerVisible(false)}
        open={isDetailsDrawerVisible}
        width={800}
      >
        {selectedPromotion && (
          <PromotionDetails
            promotion={selectedPromotion}
            categories={categories}
            userUsages={userUsages.filter(
              (usage) => usage.promotion_id === selectedPromotion.id
            )}
            productVariants={productVariants}
          />
        )}
      </Drawer>

      <Modal
        title={editingId ? "Edit Promotion" : "Add Promotion"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width={800}
      >
        <PromotionForm form={form} categories={categories} productVariants={productVariants} />
      </Modal>
    </div>
  );
};

export default PromotionPage;
