import { useEffect, useState } from "react";
import { Divider, Input, Select, Button, Form, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productApi";
import { iphones } from "../../../constants";
import type { newProduct, ErrorResponse } from "../types";
import Loading from "../../../loading";

interface ErrorType {
  data: {
    error: string;
  };
}

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [form] = Form.useForm();
  const [description, setDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useGetProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.product.name,
        slug: data.product.slug,
        description: data.product.description,
      });
      setDescription(data.product.description);
    }
  }, [data, form]);

  useEffect(() => {
    if (error && "data" in error) {
      const errorData = (error as FetchBaseQueryError).data as ErrorResponse;
      const errorMsg = errorData.error;
      message.error(errorMsg);
    }
  }, [error]);

  if (isLoading) return <Loading />;

  const handleSubmit = async (values: newProduct) => {
    const productData = {
      ...values,
      description,
    };

    try {
      const response = await updateProduct({
        id,
        product: productData,
      }).unwrap();
      if (response) {
        message.success(response.message);
        refetch();
        setTimeout(() => navigate("/products"), 1000);
        setIsEditing(false);
      }
    } catch (error: unknown) {
      const typedError = error as ErrorType;
      const errorMsg = typedError?.data?.error;
      message.error(errorMsg);
    }
  };

  return (
    <div className="h-screen px-4 py-8 md:px-8 md:py-10 rounded-lg shadow-md bg-white">
      <Divider orientation="left" className="text-2xl font-bold">
        Edit Product
      </Divider>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6 mx-auto max-w-2xl"
      >
        <Form.Item
          rules={[{ required: true, message: "Please select a product name" }]}
          label="Name"
          name="name"
        >
          <Select
            options={iphones}
            disabled={!isEditing || isLoading || isUpdating}
            placeholder="Select a product name"
          />
        </Form.Item>

        <Form.Item label="Slug" name="slug">
          <Input disabled={!isEditing} placeholder="Auto-generated slug" />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: "Please enter product description" },
          ]}
          label="Description"
          name="description"
        >
          <CKEditor
            editor={ClassicEditor}
            data={description}
            disabled={!isEditing}
            onChange={(_, editor) => {
              const data = editor.getData();
              form.setFieldsValue({ description: data });
              setDescription(data);
            }}
          />
        </Form.Item>

        <div className="flex space-x-4">
          {!isEditing ? (
            <button
              className="w-full rounded-lg py-2 text-blue transition-colors duration-300 ease-in-out border-blue border hover:border-blue/65 "
              onClick={() => setIsEditing(true)}
            >
              Update
            </button>
          ) : (
            <>
              <Button
                type="primary"
                htmlType="submit"
                loading={isUpdating}
                className="w-full"
              >
                Save Changes
              </Button>
              <Button
                type="default"
                danger
                className="w-full"
                onClick={() => {
                  setIsEditing(false);
                  if (data) {
                    form.setFieldsValue({
                      name: data.product.name,
                      slug: data.product.slug,
                      description: data.product.description,
                    });
                    setDescription(data.product.description);
                  }
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;
