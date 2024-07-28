import { BankOutlined } from "@ant-design/icons";
import { Alert, Button, Modal } from "antd";
import { useState } from "react";

export default function AddAccount() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button icon={<BankOutlined />} type="primary" onClick={handleOpen}>
        Add Account
      </Button>
      <Modal
        title="Add Account"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Alert showIcon message="Coming soon" />
      </Modal>
    </>
  );
}
