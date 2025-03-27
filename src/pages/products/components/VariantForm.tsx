/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, InputNumber, Select, Upload, Space, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { ColorPicker } from "antd";
import { ColorOption } from "../types";

interface VariantFormProps {
  form: any;
  fileList: UploadFile[];
  setFileList: (files: UploadFile[]) => void;
  colorOptions: ColorOption[];
  setColorOptions: (colors: ColorOption[]) => void;
  onStorageChange: (value: string) => void;
}

const VariantForm: React.FC<VariantFormProps> = ({
  form,
  fileList,
  setFileList,
  colorOptions,
  setColorOptions,
  onStorageChange,
}) => {
  const handleColorChange = (color: string, hex: string) => {
    const newColor = { name: color, hex };
    setColorOptions([...colorOptions, newColor]);
    form.setFieldsValue({
      color: colorOptions.map((c) => c.name),
    });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="storage"
        label="Storage"
        rules={[{ required: true, message: "Please input storage" }]}
      >
        <Input onChange={(e) => onStorageChange(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="slug"
        label="Slug"
        rules={[{ required: true, message: "Please input slug" }]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please input price" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="stock_quantity"
        label="Stock Quantity"
        rules={[{ required: true, message: "Please input stock quantity" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="color"
        label="Colors"
        rules={[{ required: true, message: "Please input colors" }]}
      >
        <div>
          <Space>
            <Input
              placeholder="Color name"
              onChange={(e) => {
                const colorName = e.target.value;
                if (colorName) {
                  handleColorChange(colorName, "#000000");
                }
              }}
            />
            <ColorPicker
              onChange={(color) => {
                const hex = color.toHexString();
                const colorName =
                  form.getFieldValue("color")?.[0] || "New Color";
                handleColorChange(colorName, hex);
              }}
            />
          </Space>
          <div className="mt-2">
            {colorOptions.map((color, index) => (
              <Tag
                key={index}
                color={color.hex}
                closable
                onClose={() => {
                  setColorOptions(colorOptions.filter((_, i) => i !== index));
                  form.setFieldsValue({
                    color: colorOptions
                      .filter((_, i) => i !== index)
                      .map((c) => c.name),
                  });
                }}
              >
                {color.name}
              </Tag>
            ))}
          </div>
        </div>
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select status" }]}
      >
        <Select>
          <Select.Option value="in_stock">In Stock</Select.Option>
          <Select.Option value="out_of_stock">Out of Stock</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Images">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          maxCount={5}
          multiple
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default VariantForm;
