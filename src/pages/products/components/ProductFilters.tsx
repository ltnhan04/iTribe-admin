import React from 'react';
import { Card, Row, Col, Form, Select, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface ProductFiltersProps {
  categories: { id: number; name: string }[];
  filters: {
    category_id: number | undefined;
    name: string;
  };
  onFilterChange: (filters: { category_id: number | undefined; name: string }) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <Card className="mb-6">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item label="Category">
            <Select
              allowClear
              placeholder="Select category"
              value={filters.category_id}
              onChange={(value) =>
                onFilterChange({ ...filters, category_id: value })
              }
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Product Name">
            <Input
              placeholder="Search by product name"
              prefix={<SearchOutlined />}
              value={filters.name}
              onChange={(e) =>
                onFilterChange({ ...filters, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={8} className="flex">
          <Button
            type="primary"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductFilters; 