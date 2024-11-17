import { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Image,
  message,
  Card,
  Typography,
  Space,
} from "antd";
import { UploadFile } from "antd/es/upload/interface";
import type { RcFile } from "antd/es/upload";
import UploadButton from "../components/UploadButton";
import { iphones, storages } from "../../../constants";
import { useGetProductsQuery } from "../../../redux/api/productApi";

const { Title } = Typography;

const CreateProductVariant = () => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(0);
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [colorCode, setColorCode] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { data: products } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    const selectedProduct = iphones.find(
      (product) => product.label === selectedName
    );
    if (selectedProduct) {
      setSelectedSlug(selectedProduct.value);
      form.setFieldsValue({ slug: selectedProduct.value });
    }
  }, [selectedName, form]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    if (newFileList.length > 5) {
      message.error("Maximum 5 images allowed");
      return;
    }
    setFileList(newFileList);
  };

  const handleSelectChange = (value: string) => {
    setSelectedName(value);
  };

  const handleStorageChange = (value: string) => {
    setSelectedStorage(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const selectedProduct = products?.data.find(
      (product: { name: string }) => product.name === selectedName
    );
    if (!selectedProduct) {
      message.error("Product not found. Please select a valid product.");
      return;
    }

    const formData = new FormData();
    formData.append("productId", selectedProduct._id);
    formData.append("colorName", values.colorName);
    formData.append("colorCode", colorCode);
    formData.append("storage", selectedStorage);
    formData.append("price", price?.toString() || "");
    formData.append("stock", values.stock.toString());
    formData.append("name", selectedName);
    formData.append("slug", selectedSlug);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    console.log("FormData content:", Object.fromEntries(formData.entries()));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Card className="max-w-[1200px] mx-auto shadow-lg rounded-xl">
        <Title level={3} className="text-center mb-8">
          Create New Product Variant
        </Title>

        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className="max-w-[1100px] mx-auto"
          initialValues={{ slug: selectedSlug }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-md" title="Product Images">
              <Form.Item
                name="images"
                rules={[
                  {
                    required: true,
                    message: "Please upload at least one image",
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => false}
                  multiple
                  accept="image/*"
                >
                  {fileList.length < 5 && <UploadButton />}
                </Upload>
              </Form.Item>
              <Image
                style={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  src: previewImage,
                  onVisibleChange: (visible) => {
                    setPreviewOpen(visible);
                    if (!visible) setPreviewImage("");
                  },
                }}
              />
            </Card>

            <Card className="shadow-md" title="Product Details">
              <Space direction="vertical" size="large" className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Price (VND)
                    </label>
                    <CurrencyInput
                      name="price"
                      placeholder="Enter price in VND"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      suffix=" ₫"
                      defaultValue={price}
                      value={price}
                      allowDecimals={false}
                      intlConfig={{ locale: "vi-VN", currency: "VND" }}
                      onValueChange={(value) =>
                        setPrice(value ? Number(value) : 0)
                      }
                      maxLength={8}
                    />
                  </div>

                  <Form.Item
                    label="Variant Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please select a variant name",
                      },
                    ]}
                  >
                    <Select
                      value={selectedName}
                      placeholder="Select a product"
                      options={iphones.map((product) => ({
                        label: product.label,
                        value: product.label,
                      }))}
                      onChange={handleSelectChange}
                      className="w-full"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Slug"
                  name="slug"
                  className="text-base font-medium"
                >
                  <Input
                    value={selectedSlug}
                    disabled
                    placeholder="Auto-generated slug"
                    className="w-full"
                  />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label="Color Name"
                    name="colorName"
                    rules={[
                      { required: true, message: "Please enter color name" },
                    ]}
                  >
                    <Input placeholder="e.g., Space Gray" />
                  </Form.Item>

                  <Form.Item
                    label="Color Code"
                    name="colorCode"
                    rules={[
                      { required: true, message: "Please select color code" },
                    ]}
                  >
                    <Input
                      type="color"
                      className="h-[38px]"
                      value={colorCode}
                      onChange={(e) => setColorCode(e.target.value)}
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label="Storage"
                    name="storage"
                    rules={[
                      { required: true, message: "Please select storage" },
                    ]}
                  >
                    <Select
                      value={selectedStorage}
                      placeholder="Select storage"
                      options={storages.map((storage) => ({
                        label: storage,
                        value: storage,
                      }))}
                      onChange={handleStorageChange}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[
                      {
                        required: true,
                        message: "Please enter stock quantity",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Stock quantity"
                      min={0}
                      className="w-full"
                    />
                  </Form.Item>
                </div>
              </Space>
            </Card>
          </div>

          <div className="mt-8 text-left">
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              className=" text-white rounded-lg"
            >
              Create New Variant
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateProductVariant;
