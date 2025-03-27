import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Table,
  Tag,
} from "antd";
import type { FormInstance } from "antd/es/form";
import type { ColumnsType } from "antd/es/table";
import { Category, PromotionFormValues, ProductVariant } from "../types";

interface PromotionFormProps {
  form: FormInstance<PromotionFormValues>;
  categories: Category[];
  productVariants: ProductVariant[];
}

const PromotionForm: React.FC<PromotionFormProps> = ({
  form,
  categories,
  productVariants,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSelectedVariants([]);
    form.setFieldValue("applicable_variant_ids", []);
  };

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
        <Tag color={quantity > 0 ? "success" : "error"}>{quantity} units</Tag>
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

  const filteredVariants = selectedCategory
    ? productVariants.filter((variant) => {
        const category = categories.find((cat) => cat.id === selectedCategory);
        return variant.product_id === category?.id;
      })
    : [];

  const rowSelection = {
    selectedRowKeys: selectedVariants,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedVariants(selectedRowKeys as number[]);
      form.setFieldValue("applicable_variant_ids", selectedRowKeys);
    },
  };

  return (
    <Form form={form} layout="vertical">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Form.Item
          name="code"
          label="Promotion Code"
          rules={[{ required: true, message: "Please enter promotion code" }]}
        >
          <Input placeholder="Enter promotion code" />
        </Form.Item>

        <Form.Item
          name="discount_type"
          label="Discount Type"
          rules={[{ required: true, message: "Please select discount type" }]}
        >
          <Select>
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="amount">Amount</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="valid_from"
          label="Start Date"
          rules={[{ required: true, message: "Please select start date" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="valid_to"
          label="End Date"
          rules={[{ required: true, message: "Please select end date" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="maxUsage"
          label="Maximum Usage"
          rules={[{ required: true, message: "Please enter maximum usage" }]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item
          name="maxUsagePerUser"
          label="Maximum Usage Per User"
          rules={[
            { required: true, message: "Please enter maximum usage per user" },
          ]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item
          name="minOrderAmount"
          label="Minimum Order Amount"
          rules={[
            { required: true, message: "Please enter minimum order amount" },
          ]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
          name="points"
          label="Points"
          rules={[{ required: true, message: "Please enter points" }]}
        >
          <InputNumber min={0} className="w-full" />
        </Form.Item>

        <Form.Item
          name="applicable_category_id"
          label="Applicable Category"
          rules={[
            { required: true, message: "Please select applicable category" },
          ]}
        >
          <Select onChange={handleCategoryChange}>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {selectedCategory && (
          <Form.Item
            name="applicable_variant_ids"
            label="Applicable Product Variants"
            rules={[
              { required: true, message: "Please select applicable variants" },
            ]}
          >
            <Table
              rowSelection={rowSelection}
              columns={variantColumns}
              dataSource={filteredVariants}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Form.Item>
        )}

        <Form.Item name="is_active" label="Status" valuePropName="checked">
          <Switch />
        </Form.Item>
      </div>
    </Form>
  );
};

export default PromotionForm;
