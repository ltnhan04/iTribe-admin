import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import CurrencyInput from "react-currency-input-field";
import type { UploadFile, UploadProps } from "antd";
import { Divider, Image, Upload, Input, Select, Button, Form } from "antd";
import { FileType } from "./types";
import { iphones } from "../../constants";
import {
  descriptionRules,
  imageRules,
  slugRules,
  priceRules,
  categoryRules,
} from "../../schemaValidation/product.schema";

const Products = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const uploadButton = (
    <button
      className="flex flex-col items-center justify-center w-full h-full"
      type="button"
    >
      <PlusOutlined />
      <div className="mt-2 text-sm">Upload</div>
    </button>
  );

  return (
    <div className="bg-white h-screen rounded-lg shadow-md px-8 py-6">
      <Divider
        orientation="left"
        style={{ borderColor: "#f0f0f0" }}
        className="text-2xl font-bold"
      >
        Add Product
      </Divider>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="border border-[#b9b6b6] p-6 rounded-lg">
          <Form.Item
            rules={imageRules}
            validateFirst
            label="Images"
            className="text-base font-medium mb-4"
          >
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>

            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Form.Item>
        </div>

        <div className="space-y-6">
          <Form layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                rules={priceRules}
                validateFirst
                label="Price"
                name="price"
                className="text-base font-medium"
              >
                <CurrencyInput
                  name="price"
                  placeholder="VND"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  prefix="₫"
                  groupSeparator="."
                  decimalSeparator=","
                  allowDecimals={false}
                  onValueChange={(value) => console.log(value)}
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                rules={categoryRules}
                validateFirst
                label="Category"
                name="category"
                className="text-base font-medium"
              >
                <Select
                  placeholder="ex: iPhone 16"
                  className="w-full"
                  options={iphones}
                />
              </Form.Item>

              <Form.Item
                rules={slugRules}
                validateFirst
                label="Slug"
                name="slug"
                className="text-base font-medium"
              >
                <Input placeholder="ex: iphone-16" className="w-full" />
              </Form.Item>
            </div>

            <Form.Item
              rules={descriptionRules}
              validateFirst
              label="Description"
              name="description"
              className="text-base font-medium"
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter product description"
                className="w-full border-gray-300 rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-4">
                Submit Product
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Products;
