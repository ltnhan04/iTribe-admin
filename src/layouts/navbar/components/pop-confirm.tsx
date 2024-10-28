import { Button, Popconfirm } from "antd";
import { PopconfirmProps } from "../types";

const Confirm: React.FC<PopconfirmProps> = ({
  title,
  description,
  open,
  confirmLoading,
  handleOk,
  handleCancel,
  showPopconfirm,
}) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button type="primary" onClick={showPopconfirm}>
        Logout
      </Button>
    </Popconfirm>
  );
};

export default Confirm;
