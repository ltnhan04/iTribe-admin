import { useEffect } from "react";
import { Divider, Input, Select, Button, Form, message } from "antd";
import { useCreateProductMutation } from "../../../redux/api";
import { iphones } from "../../../constants";
import {
  descriptionRules,
  slugRules,
  nameRules,
} from "../../../schemaValidation/product.schema";
import { newProduct } from "../types";

const AddProduct = () => {
  const [createProduct, { isLoading, error }] = useCreateProductMutation();

  useEffect(() => {
    if (error) {
      const errorMsg = JSON.stringify(error);
      message.error(errorMsg);
    }
  }, [error]);

  const handleSubmit = async (values: newProduct) => {
    const response = await createProduct(values).unwrap();
    message.success(response.message);
  };

  return (
    <div className=" h-screen px-4 py-8 md:px-8 md:py-10 rounded-lg shadow-md bg-white">
      <Divider orientation="left" className="text-2xl font-bold">
        Add Product
      </Divider>

      <Form layout="vertical" onFinish={handleSubmit} className="space-y-6">
        <Form.Item
          rules={nameRules}
          label="Name"
          name="name"
          className="text-base font-medium"
        >
          <Select
            options={iphones}
            placeholder="Select a name of product"
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          rules={slugRules}
          label="Slug"
          name="slug"
          className="text-base font-medium"
        >
          <Input placeholder="Enter product slug" className="w-full" />
        </Form.Item>

        <Form.Item
          rules={descriptionRules}
          label="Description"
          name="description"
          className="text-base font-medium"
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter product description"
            className="w-full"
          />
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
