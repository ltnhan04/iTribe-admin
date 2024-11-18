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
import { useCreateProductVariantMutation } from "../../../redux/api/productVariantApi";

const { Title } = Typography;

interface ErrorResponse {
  data: {
    error: string;
  };
}

const CreateProductVariant = () => {
  const [form] = Form.useForm();
  const [formState, setFormState] = useState({
    price: 0,
    selectedName: "",
    selectedSlug: "",
    selectedVariantName: "",
    colorCode: "",
    colorName: "",
    selectedStorage: "",
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const { data: products } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [createProductVariant, { isLoading }] =
    useCreateProductVariantMutation();

  const updateFormState = (key: string, value: string | number) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const productName = formState.selectedName;
    const color = formState.colorName;
    const storage = formState.selectedStorage;

    const selectedProduct = iphones.find(
      (product) => product.label === productName
    );

    if (selectedProduct) {
      const newName = `${selectedProduct.label} ${color} ${storage}`.trim();
      const newSlug = newName.toLowerCase().replace(/ /g, "-");

      setFormState((prev) => ({
        ...prev,
        selectedVariantName: newName,
        selectedSlug: newSlug,
      }));

      form.setFieldsValue({ variantName: newName, slug: newSlug });
    }
  }, [
    formState.selectedName,
    formState.colorName,
    formState.selectedStorage,
    form,
  ]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const selectedProduct = products?.data.find(
      (product) => product.name === formState.selectedName
    );

    if (!selectedProduct) {
      message.error("Product not found. Please select a valid product.");
      return;
    }

    const formData = new FormData();

    formData.append("productId", selectedProduct._id);
    formData.append("colorName", values.colorName);
    formData.append("colorCode", formState.colorCode);
    formData.append("storage", formState.selectedStorage);
    formData.append("price", formState.price.toString());
    formData.append("stock", values.stock.toString());
    formData.append("name", formState.selectedVariantName);
    formData.append("slug", formState.selectedSlug);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    try {
      const response = await createProductVariant(formData).unwrap();
      message.success(response?.message);
      setFormState({
        price: 0,
        selectedName: "",
        selectedSlug: "",
        selectedVariantName: "",
        colorCode: "",
        colorName: "",
        selectedStorage: "",
      });
    } catch (error: unknown) {
      const typedError = error as ErrorResponse;
      const errorMsg = typedError?.data?.error;
      message.error(errorMsg);
      setFormState({
        price: 0,
        selectedName: "",
        selectedSlug: "",
        selectedVariantName: "",
        colorCode: "",
        colorName: "",
        selectedStorage: "",
      });
    }
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
          initialValues={{ slug: formState.selectedSlug }}
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
                  disabled={isLoading}
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
                      disabled={isLoading}
                      value={formState.price}
                      allowDecimals={false}
                      intlConfig={{ locale: "vi-VN", currency: "VND" }}
                      onValueChange={(value) =>
                        updateFormState("price", value ? Number(value) : 0)
                      }
                      maxLength={8}
                    />
                  </div>

                  <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please select a product",
                      },
                    ]}
                  >
                    <Select
                      value={formState.selectedName}
                      disabled={isLoading}
                      placeholder="Select a product"
                      options={iphones.map((product) => ({
                        label: product.label,
                        value: product.label,
                      }))}
                      onChange={(value) =>
                        updateFormState("selectedName", value)
                      }
                      className="w-full"
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Variant Name"
                  name="variantName"
                  rules={[
                    {
                      required: true,
                      message: "Variant Name is required",
                    },
                  ]}
                >
                  <Input
                    value={formState.selectedVariantName}
                    disabled
                    placeholder="Auto-generated variant name"
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item
                  label="Slug"
                  name="slug"
                  rules={[{ required: true }]}
                >
                  <Input
                    value={formState.selectedSlug}
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
                    <Input
                      placeholder="e.g., Space Gray"
                      disabled={isLoading}
                      value={formState.colorName}
                      onChange={(e) =>
                        updateFormState("colorName", e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Color Code"
                    name="colorCode"
                    rules={[
                      { required: true, message: "Please select color code" },
                    ]}
                  >
                    <Input
                      disabled={isLoading}
                      type="color"
                      className="h-[38px]"
                      value={formState.colorCode}
                      onChange={(e) =>
                        updateFormState("colorCode", e.target.value)
                      }
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
                      value={formState.selectedStorage}
                      disabled={isLoading}
                      placeholder="Select storage"
                      options={storages.map((storage) => ({
                        label: storage,
                        value: storage,
                      }))}
                      onChange={(value) =>
                        updateFormState("selectedStorage", value)
                      }
                      className="w-full"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[{ required: true, message: "Stock is required" }]}
                  >
                    <Input
                      placeholder="Enter stock quantity"
                      disabled={isLoading}
                      type="number"
                    />
                  </Form.Item>
                </div>
              </Space>
            </Card>
          </div>
          <div className="flex gap-4 mt-8">
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Create New Variant
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateProductVariant;
