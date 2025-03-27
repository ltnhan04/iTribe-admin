import React from "react";
import { Card, Descriptions, Table, Badge, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Promotion, PromotionUserUsage, Category, ProductVariant } from "../types";
import dayjs from "dayjs";

interface PromotionDetailsProps {
  promotion: Promotion;
  categories: Category[];
  userUsages: PromotionUserUsage[];
  productVariants: ProductVariant[];
}

const PromotionDetails: React.FC<PromotionDetailsProps> = ({
  promotion,
  categories,
  userUsages,
  productVariants,
}) => {
  const category = categories.find((cat) => cat.id === promotion.applicable_category_id);

  const userUsageColumns: ColumnsType<PromotionUserUsage> = [
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Usage Count",
      dataIndex: "usage_count",
      key: "usage_count",
      render: (count: number) => (
        <Badge
          status={count >= promotion.maxUsagePerUser ? "error" : "success"}
          text={`${count}/${promotion.maxUsagePerUser}`}
        />
      ),
    },
  ];

  const variantColumns: ColumnsType<ProductVariant> = [
    {
      title: "Storage",
      dataIndex: "storage",
      key: "storage",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    {
      title: "Stock",
      dataIndex: "stock_quantity",
      key: "stock_quantity",
      render: (quantity: number) => (
        <Tag color={quantity > 0 ? "success" : "error"}>
          {quantity} units
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "in_stock" ? "success" : "error"}>
          {status === "in_stock" ? "In Stock" : "Out of Stock"}
        </Tag>
      ),
    },
  ];

  const applicableVariants = productVariants.filter((variant) =>
    promotion.applicable_variant_ids.includes(variant.id)
  );

  return (
    <div className="space-y-6">
      <Card title="Promotion Information" className="bg-white rounded-lg shadow">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Promotion Code">{promotion.code}</Descriptions.Item>
          <Descriptions.Item label="Discount Type">
            <Tag color={promotion.discount_type === "percentage" ? "blue" : "green"}>
              {promotion.discount_type === "percentage" ? "Percentage" : "Amount"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            {dayjs(promotion.valid_from).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            {dayjs(promotion.valid_to).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Applicable Category">
            {category?.name || "Not specified"}
          </Descriptions.Item>
          <Descriptions.Item label="Minimum Order Amount">
            ${promotion.minOrderAmount.toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Usage Count">
            <Badge
              status={promotion.usedCount >= promotion.maxUsage ? "error" : "success"}
              text={`${promotion.usedCount}/${promotion.maxUsage}`}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Maximum Usage Per User">
            {promotion.maxUsagePerUser}
          </Descriptions.Item>
          <Descriptions.Item label="Points">
            {promotion.points}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Badge
              status={promotion.is_active ? "success" : "default"}
              text={promotion.is_active ? "Active" : "Inactive"}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Applicable Product Variants" className="bg-white rounded-lg shadow">
        <Table
          columns={variantColumns}
          dataSource={applicableVariants}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Card title="Usage History" className="bg-white rounded-lg shadow">
        <Table
          columns={userUsageColumns}
          dataSource={userUsages}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default PromotionDetails; 