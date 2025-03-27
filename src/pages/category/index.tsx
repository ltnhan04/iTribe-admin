import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

interface Category {
  id: number;
  category_name: string;
  parent_category_id: number | null;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, category_name: "Điện thoại", parent_category_id: null },
    { id: 2, category_name: "Laptop", parent_category_id: null },
    { id: 3, category_name: "iPhone", parent_category_id: 1 },
    { id: 4, category_name: "Samsung", parent_category_id: 1 },
    { id: 5, category_name: "Dell", parent_category_id: 2 },
    { id: 6, category_name: "HP", parent_category_id: 2 },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a: Category, b: Category) => a.id - b.id,
    },
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
      filterable: true,
    },
    {
      title: "Parent Category",
      dataIndex: "parent_category_id",
      key: "parent_category_id",
      render: (parentId: number | null) => {
        if (!parentId) return "null";
        const parent = categories.find((cat) => cat.id === parentId);
        return parent ? parent.category_name : "Not Found";
      },
    },
    {
      title: "Actions",
      key: "action",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Category) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure to delete this category?",
      onOk: () => {
        setCategories(categories.filter((cat) => cat.id !== id));
        message.success("Delete category successfully");
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingId) {
        // Cập nhật danh mục
        setCategories(
          categories.map((cat) =>
            cat.id === editingId ? { ...values, id: editingId } : cat
          )
        );
        message.success("Updated category successfully");
      } else {
        // Thêm danh mục mới
        const newId = Math.max(...categories.map((cat) => cat.id)) + 1;
        setCategories([...categories, { ...values, id: newId }]);
        message.success("Create category successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button icon={<PlusCircleOutlined />} onClick={handleAdd}>
          New Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingId ? "Edit category" : "Add category"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="category_name"
            label="Category Name"
            rules={[{ required: true, message: "Please input category name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="parent_category_id" label="Parent Category">
            <Select
              allowClear
              placeholder="Please input parent category"
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.category_name,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryPage;
