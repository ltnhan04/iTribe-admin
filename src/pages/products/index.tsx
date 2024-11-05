import { Table } from "antd";
import { columns, dataSource } from "./constants";
const Products = () => {
  return <Table columns={columns} dataSource={dataSource} />;
};

export default Products;
