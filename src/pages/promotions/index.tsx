import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import {
   Badge, Space, Table, Modal, FloatButton
  } from 'antd';
import { ExpandedDataType, DataType } from "./types";
import AddPromotion from "./components/addPromotion";

const expandDataSource = Array.from({ length: 1 }).map<ExpandedDataType>((_, i) => ({
  key: i.toString(),
  date: '2014-12-24 23:12:00',
  name: 'Khuyến mãi thử nghiệm'
}));

const dataSource = Array.from({ length: 3 }).map<DataType>((_, i) => ({
  key: i.toString(),
  id: `1000${i + 1}`,
  name: `Giảm giá tháng ${i + 1}`,
  status: 'Trạng thái',
  date: new Date().toLocaleString(),
  quantity: 0,
}));

const expandColumns: TableColumnsType<ExpandedDataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  {
    title: 'Status',
    key: 'state',
    render: () => <Badge status="success" text="Active" />,
  },
  {
    title: 'Action',
    key: 'operation',
    render: () => (
      <Space size="middle">
        <a>Continue</a>
        <a>Pause</a>
        <a>Stop</a>
      </Space>
    ),
  },
];

const columns: TableColumnsType<DataType> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
];

const expandedRowRender = () => (
  <Table<ExpandedDataType>
    columns={expandColumns}
    dataSource={expandDataSource}
    pagination={false}
  />
);

const Promotions: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false); //
  };

  return (
    <>
      <FloatButton
        icon={<PlusOutlined />}
        type="default"
        style={{ insetInlineEnd: 94 }}
        onClick={showModal}
      />
      <Table<DataType>
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={dataSource}
      />
      <Modal
        title="Thêm Khuyến Mãi"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddPromotion /> 
      </Modal>
    </>
  );
};

export default Promotions;
