import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import type { ProductList, Variant } from "../../../redux/types";
import {
  useGetProductVariantsQuery,
  useUpdateProductVariantMutation,
} from "../../../redux/api/productVariantApi";
import { useGetProductsQuery } from "../../../redux/api/productApi";
import Loading from "../../../loading";

const { Title } = Typography;

interface ErrorResponse {
  data: { error: string };
}

const EditProductVariant = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const [initialData, setInitialData] = useState<Variant>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const id = location.pathname.split("/")[3];
  const { data, isLoading, refetch } = useGetProductVariantsQuery(id);
  const [updateProductVariant, { isLoading: isUpdating }] =
    useUpdateProductVariantMutation();
  const { data: products } = useGetProductsQuery();

  useEffect(() => {
    if (data?.variant && products?.data) {
      const variant = data.variant;
      const product = products.data.find((p) => p._id === variant.productId);

      setInitialData(variant);
      setFormState({
        price: variant.price,
        selectedName: product?.name || "",
        selectedSlug: variant.slug,
        selectedVariantName: variant.name,
        colorCode: variant.color.colorCode,
        colorName: variant.color.colorName,
        selectedStorage: variant.storage,
      });

      form.setFieldsValue({
        name: variant.name,
        slug: variant.slug,
        colorName: variant.color.colorName,
        colorCode: variant.color.colorCode,
        storage: variant.storage,
        price: variant.price,
        stock: variant.stock,
      });

      setFileList(
        variant.images.map((image) => ({
          uid: image,
          name: image.split("/").pop() || "",
          status: "done",
          url: image,
        }))
      );
    }
  }, [data, products, form]);

  useEffect(() => {
    const { selectedName, colorName, selectedStorage } = formState;
    const selectedProduct = iphones.find(
      (product) => product.label === selectedName
    );

    if (selectedProduct) {
      const newName =
        `${selectedProduct.label} ${colorName} ${selectedStorage}`.trim();
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
    formState,
  ]);

  const updateFormState = (key: string, value: string | number) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return <Loading />;
  }

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

    const updatedFileList = newFileList.map((file) => {
      if (file.url) {
        return file;
      }
      if (file.originFileObj) {
        return file;
      }
      return file;
    });

    setFileList(updatedFileList);
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

    if (!fileList || fileList.length === 0) {
      message.error("Please upload at least one image");
      return;
    }

    try {
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
        if (file.url) {
          formData.append("images", file.url);
        } else if (file.originFileObj) {
          formData.append("images", file.originFileObj);
        }
      });

      const response = await updateProductVariant({
        variantId: id,
        updatedVariant: formData,
      }).unwrap();

      if (response.message) {
        message.success(response.message);
        await refetch();
        handleCancel();
        navigate(-1);
      }
    } catch (error) {
      const typedError = error as ErrorResponse;
      message.error(typedError?.data?.error || "Update failed");
    }
  };

  const handleUpdate = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);

    if (initialData) {
      setFormState({
        price: initialData.price,
        selectedName:
          products?.data.find((p) => p._id === initialData.productId)?.name ||
          "",
        selectedSlug: initialData.slug,
        selectedVariantName: initialData.name,
        colorCode: initialData.color.colorCode,
        colorName: initialData.color.colorName,
        selectedStorage: initialData.storage,
      });

      form.setFieldsValue({
        name: initialData.name,
        slug: initialData.slug,
        colorName: initialData.color.colorName,
        colorCode: initialData.color.colorCode,
        storage: initialData.storage,
        price: initialData.price,
        stock: initialData.stock,
      });

      setFileList(
        initialData.images.map((image) => ({
          uid: image,
          name: image.split("/").pop() || "",
          status: "done",
          url: image,
        }))
      );
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Card className="max-w-[1200px] mx-auto shadow-lg rounded-xl">
        <Title level={3} className="text-center mb-8">
          {" "}
          Update Product Variant{" "}
        </Title>

        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className="max-w-[1100px] mx-auto"
          initialValues={{
            name: formState.selectedVariantName,
            slug: formState.selectedSlug,
            colorName: formState.colorName,
            colorCode: formState.colorCode,
            storage: formState.selectedStorage,
            price: formState.price,
          }}
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
                  disabled={isLoading || !isEditing || isUpdating}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => false}
                  multiple
                  accept="image/*"
                >
                  {isEditing && fileList.length < 5 && <UploadButton />}
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
                      {" "}
                      Price (VND){" "}
                    </label>
                    <CurrencyInput
                      name="price"
                      placeholder="Enter price in VND"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      suffix=" ₫"
                      disabled={isLoading || !isEditing || isUpdating}
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
                      { required: true, message: "Please select a product" },
                    ]}
                  >
                    <Select
                      value={formState.selectedName}
                      disabled
                      placeholder="Select a product"
                      options={products?.data?.map((product: ProductList) => ({
                        label: product.name,
                        value: product.name,
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
                    { required: true, message: "Variant Name is required" },
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
                      disabled={isLoading || !isEditing || isUpdating}
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
                      disabled={isLoading || !isEditing || isUpdating}
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
                      disabled={isLoading || !isEditing || isUpdating}
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
                      disabled={isLoading || !isEditing || isUpdating}
                      type="number"
                    />
                  </Form.Item>
                </div>
              </Space>
            </Card>
          </div>

          <div className="flex gap-4 mt-8">
            {!isEditing ? (
              <Button type="primary" onClick={handleUpdate}>
                {" "}
                Update{" "}
              </Button>
            ) : (
              <>
                <Button htmlType="submit" type="primary" loading={isUpdating}>
                  {" "}
                  Save Changes{" "}
                </Button>
                <Button type="default" onClick={handleCancel}>
                  {" "}
                  Cancel{" "}
                </Button>
              </>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditProductVariant;
