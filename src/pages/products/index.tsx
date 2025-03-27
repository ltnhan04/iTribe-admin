import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  message,
  Drawer,
} from "antd";
import {
  PlusCircleOutlined,
} from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import ProductFilters from "./components/ProductFilters";
import ProductDetails from "./components/ProductDetails";
import VariantForm from "./components/VariantForm";
import VariantDetails from "./components/VariantDetails";
import {
  Product,
  ProductVariant,
  Review,
  User,
  VariantFilters,
  ColorOption,
} from "./types";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      category_id: 1,
      name: "iPhone 15 Pro Max",
      description: "Latest iPhone model with advanced features",
    },
    {
      id: 2,
      category_id: 2,
      name: "MacBook Pro M3",
      description: "Powerful laptop with M3 chip",
    },
    {
      id: 3,
      category_id: 1,
      name: "Samsung Galaxy S24 Ultra",
      description: "Flagship Android smartphone",
    },
    {
      id: 4,
      category_id: 2,
      name: "Dell XPS 15",
      description: "Premium Windows laptop",
    },
  ]);

  const [productVariants, setProductVariants] = useState<ProductVariant[]>([
    {
      id: 1,
      product_id: 1,
      storage: "256GB",
      price: 999,
      stock_quantity: 50,
      slug: "iphone-15-pro-max-256gb",
      rating: 4.8,
      color: ["Black", "White"],
      status: "in_stock",
      images: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
    },
    {
      id: 2,
      product_id: 1,
      storage: "512GB",
      price: 1199,
      stock_quantity: 30,
      slug: "iphone-15-pro-max-512gb",
      rating: 4.9,
      color: ["Black", "White", "Blue"],
      status: "in_stock",
      images: [
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
    },
    {
      id: 3,
      product_id: 2,
      storage: "1TB SSD",
      price: 2499,
      stock_quantity: 25,
      slug: "macbook-pro-m3-1tb",
      rating: 4.7,
      color: ["Space Gray", "Silver"],
      status: "in_stock",
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
    },
    {
      id: 4,
      product_id: 2,
      storage: "2TB SSD",
      price: 2999,
      stock_quantity: 15,
      slug: "macbook-pro-m3-2tb",
      rating: 4.8,
      color: ["Space Gray", "Silver"],
      status: "in_stock",
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
    },
    {
      id: 5,
      product_id: 3,
      storage: "256GB",
      price: 1199,
      stock_quantity: 40,
      slug: "samsung-galaxy-s24-ultra-256gb",
      rating: 4.6,
      color: ["Black", "White", "Purple"],
      status: "in_stock",
      images: [
        "https://images.unsplash.com/photo-1706882956013-0c9d59dba20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1706882956013-0c9d59dba20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1706882956013-0c9d59dba20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1706882956013-0c9d59dba20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1706882956013-0c9d59dba20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
    },
    {
      id: 6,
      product_id: 3,
      storage: "512GB",
      price: 1399,
      stock_quantity: 0,
      slug: "samsung-galaxy-s24-ultra-512gb",
      rating: 4.7,
      color: ["Black", "White", "Purple"],
      status: "out_of_stock",
      images: [
        "https://images.unsplash.com/photo-1706882956013-0c9d59dba20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1706882956013-0c9d59dba20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1706882956013-0c9d59dba20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1706882956013-0c9d59dba20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1706882956013-0c9d59dba20e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
    },
    {
      id: 7,
      product_id: 4,
      storage: "1TB SSD",
      price: 1999,
      stock_quantity: 20,
      slug: "dell-xps-15-1tb",
      rating: 4.5,
      color: ["Silver", "Black"],
      status: "in_stock",
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
    },
    {
      id: 8,
      product_id: 4,
      storage: "2TB SSD",
      price: 2499,
      stock_quantity: 10,
      slug: "dell-xps-15-2tb",
      rating: 4.6,
      color: ["Silver", "Black"],
      status: "in_stock",
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      ],
    },
  ]);

  const [categories] = useState([
    { id: 1, name: "Smartphones" },
    { id: 2, name: "Laptops" },
  ]);

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isVariantModalVisible, setIsVariantModalVisible] = useState(false);
  const [isDetailsDrawerVisible, setIsDetailsDrawerVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productForm] = Form.useForm();
  const [variantForm] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [filters, setFilters] = useState<{
    category_id: number | undefined;
    name: string;
  }>({
    category_id: undefined,
    name: "",
  });

  const [reviews] = useState<Review[]>([
    {
      id: 1,
      user_id: 1,
      product_variant_id: 1,
      rating: 5,
      comment: "Excellent product, very satisfied with the purchase!",
    },
    {
      id: 2,
      user_id: 2,
      product_variant_id: 1,
      rating: 4,
      comment: "Good product but a bit expensive.",
    },
    {
      id: 3,
      user_id: 3,
      product_variant_id: 2,
      rating: 5,
      comment: "Perfect storage size and great performance.",
    },
  ]);

  const [users] = useState<User[]>([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
  ]);

  const [variantFilters, setVariantFilters] = useState<VariantFilters>({
    storage: "",
    price: null,
    stock: null,
    status: null,
  });

  const [colorOptions, setColorOptions] = useState<ColorOption[]>([]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isVariantDetailsDrawerVisible, setIsVariantDetailsDrawerVisible] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !filters.category_id || product.category_id === filters.category_id;
    const matchesName =
      !filters.name ||
      product.name.toLowerCase().includes(filters.name.toLowerCase());
    return matchesCategory && matchesName;
  });

  const filteredVariants = productVariants
    .filter((variant) => variant.product_id === selectedProduct?.id)
    .filter((variant) => {
      const matchesStorage =
        !variantFilters.storage ||
        variant.storage
          .toLowerCase()
          .includes(variantFilters.storage.toLowerCase());
      const matchesPrice =
        !variantFilters.price || variant.price <= variantFilters.price;
      const matchesStock =
        !variantFilters.stock || variant.stock_quantity <= variantFilters.stock;
      const matchesStatus =
        !variantFilters.status || variant.status === variantFilters.status;
      return matchesStorage && matchesPrice && matchesStock && matchesStatus;
    });

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsDrawerVisible(true);
  };

  const handleAddProduct = () => {
    setEditingId(null);
    productForm.resetFields();
    setIsProductModalVisible(true);
  };

  const handleEditProduct = (record: Product) => {
    setEditingId(record.id);
    productForm.setFieldsValue(record);
    setIsProductModalVisible(true);
  };

  const handleDeleteProduct = (id: number) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure to delete this product?",
      onOk: () => {
        setProducts(products.filter((product) => product.id !== id));
        setProductVariants(
          productVariants.filter((variant) => variant.product_id !== id)
        );
        message.success("Delete product successfully");
      },
    });
  };

  const handleAddVariant = () => {
    if (!selectedProduct) return;
    setEditingId(null);
    variantForm.resetFields();
    variantForm.setFieldsValue({ product_id: selectedProduct.id });
    setFileList([]);
    setIsVariantModalVisible(true);
  };

  const handleEditVariant = (record: ProductVariant) => {
    setEditingId(record.id);
    variantForm.setFieldsValue(record);
    setFileList(
      record.images.map((url) => ({
        uid: url,
        name: url,
        status: "done",
        url: url,
      }))
    );
    setIsVariantModalVisible(true);
  };

  const handleDeleteVariant = (id: number) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure to delete this variant?",
      onOk: () => {
        setProductVariants(
          productVariants.filter((variant) => variant.id !== id)
        );
        message.success("Delete variant successfully");
      },
    });
  };

  const handleViewVariantDetails = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setIsVariantDetailsDrawerVisible(true);
  };

  const handleProductModalOk = () => {
    productForm.validateFields().then((values) => {
      if (editingId) {
        setProducts(
          products.map((product) =>
            product.id === editingId ? { ...values, id: editingId } : product
          )
        );
        message.success("Updated product successfully");
      } else {
        const newId = Math.max(...products.map((p) => p.id)) + 1;
        setProducts([...products, { ...values, id: newId }]);
        message.success("Create product successfully");
      }
      setIsProductModalVisible(false);
      productForm.resetFields();
    });
  };

  const handleVariantModalOk = () => {
    variantForm.validateFields().then((values) => {
      const variantData = {
        ...values,
        id: editingId || Math.max(...productVariants.map((v) => v.id)) + 1,
        images: fileList.map((file) => file.url || ""),
      };

      if (editingId) {
        setProductVariants(
          productVariants.map((variant) =>
            variant.id === editingId ? variantData : variant
          )
        );
        message.success("Updated variant successfully");
      } else {
        setProductVariants([...productVariants, variantData]);
        message.success("Create variant successfully");
      }
      setIsVariantModalVisible(false);
      variantForm.resetFields();
      setFileList([]);
      setColorOptions([]);
    });
  };

  const handleStorageChange = (value: string) => {
    if (!selectedProduct) return;
    const slug = `${selectedProduct.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-${value.toLowerCase()}`;
    variantForm.setFieldsValue({ slug });
  };

  return (
    <div className="p-6">
      <ProductFilters
        categories={categories}
        filters={filters}
        onFilterChange={(newFilters) => setFilters(newFilters)}
        onClearFilters={() => setFilters({ category_id: undefined, name: "" })}
      />

      <div style={{ marginBottom: 16 }}>
        <Button icon={<PlusCircleOutlined />} onClick={handleAddProduct}>
          New Product
        </Button>
      </div>

      <ProductTable
        data={filteredProducts}
        categories={categories}
        onViewDetails={handleViewDetails}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <Drawer
        title={`Product Details: ${selectedProduct?.name}`}
        placement="right"
        onClose={() => setIsDetailsDrawerVisible(false)}
        open={isDetailsDrawerVisible}
        width={1000}
      >
        {selectedProduct && (
          <ProductDetails
            productName={selectedProduct.name}
            variants={filteredVariants}
            variantFilters={variantFilters}
            onAddVariant={handleAddVariant}
            onViewVariantDetails={handleViewVariantDetails}
            onEditVariant={handleEditVariant}
            onDeleteVariant={handleDeleteVariant}
            onVariantFilterChange={setVariantFilters}
          />
        )}
      </Drawer>

      <Drawer
        title={`Variant Details: ${selectedVariant?.storage}`}
        placement="right"
        onClose={() => setIsVariantDetailsDrawerVisible(false)}
        open={isVariantDetailsDrawerVisible}
        width={800}
      >
        {selectedVariant && (
          <VariantDetails
            variant={selectedVariant}
            reviews={reviews}
            users={users}
          />
        )}
      </Drawer>

      <Modal
        title={editingId ? "Edit Product" : "Add Product"}
        open={isProductModalVisible}
        onOk={handleProductModalOk}
        onCancel={() => {
          setIsProductModalVisible(false);
          productForm.resetFields();
        }}
        width={800}
      >
        <ProductForm form={productForm} categories={categories} />
      </Modal>

      <Modal
        title={editingId ? "Edit Variant" : "Add Variant"}
        open={isVariantModalVisible}
        onOk={handleVariantModalOk}
        onCancel={() => {
          setIsVariantModalVisible(false);
          variantForm.resetFields();
          setFileList([]);
          setColorOptions([]);
        }}
        width={800}
      >
        <VariantForm
          form={variantForm}
          fileList={fileList}
          setFileList={setFileList}
          colorOptions={colorOptions}
          setColorOptions={setColorOptions}
          onStorageChange={handleStorageChange}
        />
      </Modal>
    </div>
  );
};

export default ProductPage;
