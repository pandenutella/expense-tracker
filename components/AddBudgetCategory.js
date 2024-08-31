import { useBudgetCategoriesContext } from "@/contexts/BudgetCategoriesContext";
import { createCategory } from "@/services/categories.service";
import { FolderOpenOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { useState } from "react";

export default function AddBudgetCategory() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { addCategory } = useBudgetCategoriesContext();

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
    const category = {
      type: values.type,
      label: values.label,
      amount: 0.0,
    };

    setProcessing(true);
    createCategory(category)
      .then((createdCategory) => {
        message.success(
          `Added category "${createdCategory.label}" successfully!`
        );

        addCategory(createdCategory);
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
      <Button icon={<FolderOpenOutlined />} type="primary" onClick={handleOpen}>
        Add Category
      </Button>
      <Modal
        title="Add Category"
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
              startingBalance: 0.0,
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
              { label: "Bills", value: "BILLS" },
              { label: "Needs", value: "NEEDS" },
              { label: "Wants", value: "WANTS" },
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
      </Modal>
    </>
  );
}
