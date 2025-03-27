import React from "react";
import { Button } from "antd";
import { ProductVariant } from "../types";
import VariantTable from "./VariantTable";
import VariantFilters from "./VariantFilters";

interface ProductDetailsProps {
  productName: string;
  variants: ProductVariant[];
  variantFilters: {
    storage: string;
    price: number | null;
    stock: number | null;
    status: "in_stock" | "out_of_stock" | null;
  };
  onAddVariant: () => void;
  onViewVariantDetails: (variant: ProductVariant) => void;
  onEditVariant: (variant: ProductVariant) => void;
  onDeleteVariant: (id: number) => void;
  onVariantFilterChange: (filters: {
    storage: string;
    price: number | null;
    stock: number | null;
    status: "in_stock" | "out_of_stock" | null;
  }) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  variants,
  variantFilters,
  onAddVariant,
  onViewVariantDetails,
  onEditVariant,
  onDeleteVariant,
  onVariantFilterChange,
}) => {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={onAddVariant}>
          Add New Variant
        </Button>
      </div>

      <VariantFilters
        filters={variantFilters}
        onFilterChange={onVariantFilterChange}
      />

      <VariantTable
        data={variants}
        onViewDetails={onViewVariantDetails}
        onEdit={onEditVariant}
        onDelete={onDeleteVariant}
      />
    </div>
  );
};

export default ProductDetails;
