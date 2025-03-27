import React from "react";
import { Card, Form, Input, Select, DatePicker, Space, Button } from "antd";
import { OrderStatus, PaymentMethod } from "../types";
import dayjs from "dayjs";

interface OrderFiltersProps {
  onFilter: (filters: any) => void;
  onReset: () => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({ onFilter, onReset }) => {
  const [form] = Form.useForm();

  const handleFilter = (values: any) => {
    const filters = {
      ...values,
      dateRange: values.dateRange
        ? {
            start: values.dateRange[0]?.format("YYYY-MM-DD"),
            end: values.dateRange[1]?.format("YYYY-MM-DD"),
          }
        : null,
    };
    onFilter(filters);
  };

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  return (
    <Card className="mb-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFilter}
        initialValues={{
          dateRange: null,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Form.Item name="search" label="Search">
            <Input placeholder="Search by ID, customer name, or email" />
          </Form.Item>

          <Form.Item name="order_status" label="Status">
            <Select
              placeholder="Select status"
              allowClear
              options={[
                { label: "Pending", value: "pending" },
                { label: "Processing", value: "processing" },
                { label: "Shipped", value: "shipped" },
                { label: "Delivered", value: "delivered" },
                { label: "Cancel", value: "cancel" },
              ]}
            />
          </Form.Item>

          <Form.Item name="paymentMethod" label="Payment Method">
            <Select
              placeholder="Select payment method"
              allowClear
              options={[
                { label: "Stripe", value: "stripe" },
                { label: "Momo", value: "momo" },
                { label: "Ship COD", value: "ship-cod" },
              ]}
            />
          </Form.Item>

          <Form.Item name="dateRange" label="Date Range">
            <DatePicker.RangePicker className="w-full" />
          </Form.Item>
        </div>

        <div className="flex justify-end space-x-4">
          <Button onClick={handleReset}>Reset</Button>
          <Button type="primary" htmlType="submit">
            Apply Filters
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default OrderFilters; 