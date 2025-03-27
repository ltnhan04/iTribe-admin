/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Select, Input } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface ProductFormProps {
  form: any;
  categories: { id: number; name: string }[];
}

const ProductForm: React.FC<ProductFormProps> = ({ form, categories }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="category_id"
        label="Category"
        rules={[{ required: true, message: "Please select category" }]}
      >
        <Select
          options={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="name"
        label="Product Name"
        rules={[{ required: true, message: "Please input product name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input description" }]}
      >
        <CKEditor
          editor={ClassicEditor}
          data={form.getFieldValue("description")}
          onChange={(_event, editor) => {
            const data = editor.getData();
            form.setFieldsValue({ description: data });
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
