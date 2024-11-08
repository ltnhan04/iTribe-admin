import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import type { UploadFile, UploadProps } from "antd";
import { Divider, Image, Upload, Input, Select, Button, Form } from "antd";
import { FileType } from "../types";
import { iphones } from "../../../constants";
import UploadButton from "../components/UploadButton";
import {
  descriptionRules,
  imageRules,
  priceRules,
  nameRules,
} from "../../../schemaValidation/product.schema";

const CreateProductVariant = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePriceChange = (value: string | undefined) => {
    setPrice(value || "");
  };

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

  return (
    <div className=" h-screen rounded-lg shadow-md px-8 py-6">
      <Divider
        orientation="left"
        style={{ borderColor: "#f0f0f0" }}
        className="text-2xl font-bold"
      >
        Create Product Variant
      </Divider>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="border shadow-lg transition-shadow duration-500 ease-in-out hover:shadow-xl border-grayLight p-6 rounded-lg">
          <Form.Item
            rules={imageRules}
            validateFirst
            label="Upload Images"
            name={"image"}
            className="text-base font-medium mb-4"
          >
            <Upload
              name="image"
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              maxCount={5}
              multiple={true}
              accept="image/*"
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 5 ? null : <UploadButton />}
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
                  className="w-full border border-grayBorder rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300 ease-out hover:border-blue cursor-pointer"
                  prefix="₫"
                  value={price}
                  decimalsLimit={2}
                  intlConfig={{ locale: "vi-VN", currency: "VND" }}
                  onValueChange={handlePriceChange}
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                rules={nameRules}
                validateFirst
                label="Name"
                name="name"
                className="text-base font-medium"
              >
                <Select
                  placeholder="ex: iPhone 16"
                  className="w-full"
                  options={iphones}
                />
              </Form.Item>

              {/* <Form.Item
                rules={slugRules}
                validateFirst
                label="Slug"
                name="slug"
                className="text-base font-medium"
              >
                <Input placeholder="ex: iphone-16" className="w-full" />
              </Form.Item> */}
            </div>

            <Form.Item
              rules={descriptionRules}
              validateFirst
              label="Description"
              name="description"
              className="text-base font-medium"
            >
              <Input.TextArea
                maxLength={1000}
                rows={4}
                placeholder="Enter product description"
                className="w-full border-gray-300 rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-4">
                Create New Variant
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductVariant;
