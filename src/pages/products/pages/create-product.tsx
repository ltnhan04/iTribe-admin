import { useEffect, useState } from "react";
import { Divider, Input, Select, Button, Form, message } from "antd";
// import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreateProductMutation } from "../../../redux/api/productApi";
import { iphones } from "../../../constants";
import {
  descriptionRules,
  nameRules,
} from "../../../schemaValidation/product.schema";
import type { newProduct, ErrorResponse } from "../types";

const AddProduct = () => {
  // const navigate = useNavigate();
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
      // setTimeout(() => {
      //   navigate("/products/create/variant");
      // }, 1000);
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
      <Divider orientation="left" className="text-2xl border font-bold">
        Create New Product
      </Divider>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6 mx-auto max-w-3xl"
      >
        <Form.Item
          rules={nameRules}
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
          rules={descriptionRules}
          label="Description"
          name="description"
          className="text-base font-medium"
        >
          <div className="h-[250px]">
            <ReactQuill
              value={description}
              onChange={setDescription}
              theme="snow"
              placeholder="Enter product description"
              className="h-[200px]"
            />
          </div>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
          className="w-full font-semibold py-2 md:py-3 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add New Product
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
