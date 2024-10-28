export interface PopconfirmProps {
  title: string;
  description: string;
  open: boolean;
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  showPopconfirm: () => void;
}

export interface NavbarProps {
  onToggleSidebar: () => void;
}
