import { AccountTypes } from "@/constants/accounts.constant";
import { useAccountsContext } from "@/contexts/AccountsContext";
import { createAccount } from "@/services/accounts.service";
import { BankOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useState } from "react";

export default function AddAccount() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { addAccount } = useAccountsContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const catchError = (error) => {
    if (422 !== error.statusCode) {
      console.error(error);
      message.error("Something went wrong, please try again later.");
    }

    message.error(error.message);
  };

  const handleAdd = (values) => {
    const account = {
      label: values.label,
      type: values.type,
      amount: values.amount,
    };

    setProcessing(true);
    createAccount(account)
      .then((createdAccount) => {
        message.success(
          `Added account "${createdAccount.label}" successfully!`
        );

        addAccount(createdAccount);
        setOpen(false);
      })
      .catch(catchError)
      .finally(() => setProcessing(false));
  };

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
        okButtonProps={{
          htmlType: "submit",
          loading: processing,
          disabled: processing,
        }}
        onCancel={handleCancel}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            requiredMark="optional"
            initialValues={{
              amount: 0.0,
            }}
            onFinish={handleAdd}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: "This is required!" }]}
        >
          <Select
            options={[
              { label: "Debit", value: AccountTypes.DEBIT },
              { label: "Credit", value: AccountTypes.CREDIT },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="label"
          label="Label"
          rules={[{ required: true, message: "This is required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Starting Balance"
          rules={[{ required: true, message: "This is required!" }]}
        >
          <InputNumber prefix="₱" precision={2} style={{ width: "100%" }} />
        </Form.Item>
      </Modal>
    </>
  );
}
