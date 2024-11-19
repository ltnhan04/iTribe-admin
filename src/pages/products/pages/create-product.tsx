import { useEffect, useState } from "react";
import { Divider, Input, Select, Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useCreateProductMutation } from "../../../redux/api/productApi";
import { iphones } from "../../../constants";
import type { newProduct, ErrorResponse } from "../types";

const AddProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (error && "data" in error) {
      const errorData = (error as FetchBaseQueryError).data as ErrorResponse;
      const errorMsg = errorData.error;
      message.error(errorMsg);
    }
  }, [error]);

  const handleSubmit = async (values: newProduct) => {
    const productData = {
      ...values,
      name: selectedName,
      slug: selectedSlug,
      description,
    };

    const response = await createProduct(productData).unwrap();
    if (response) {
      message.success(response.message);
      setTimeout(() => {
        navigate("/products");
      }, 1000);
      form.resetFields();
      setDescription("");
    }
  };

  const handleSelectChange = (value: string) => {
    const selectedProduct = iphones.find((item) => item.value === value);
    if (selectedProduct) {
      setSelectedName(selectedProduct.label);
      setSelectedSlug(value);
      form.setFieldsValue({ slug: value });
    }
  };

  return (
    <div className="h-screen px-4 py-8 md:px-8 md:py-10 rounded-lg shadow-md bg-white ">
      <Divider
        orientation="left"
        className="text-2xl font-bold"
        style={{ borderColor: "#f0f0f0" }}
      >
        Create New Product
      </Divider>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6 mx-auto max-w-2xl"
      >
        <Form.Item
          rules={[{ required: true, message: "Please select a product name" }]}
          validateFirst
          label="Name"
          name="name"
          className="text-base font-medium"
        >
          <Select
            value={selectedName}
            options={iphones}
            disabled={isLoading}
            placeholder="Select a product name"
            className="w-full"
            onChange={handleSelectChange}
          />
        </Form.Item>

        <Form.Item label="Slug" name="slug" className="text-base font-medium">
          <Input
            value={selectedSlug}
            disabled
            placeholder="Auto-generated slug"
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: "Please enter product description" },
          ]}
          label="Description"
          name="description"
          className="text-base font-medium"
        >
          <CKEditor
            editor={ClassicEditor}
            data={description}
            disabled={isLoading}
            onChange={(_, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
            config={{
              placeholder: "Enter product description",
            }}
          />
        </Form.Item>
        <div className="flex space-x-4">
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Add New Product
          </Button>

          <Button
            type="default"
            loading={isLoading}
            block
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
