"use client";

import { auth } from "@/firebase";
import { initializeUnallocatedCategory } from "@/services/categories.service";
import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const GENERAL_ERROR_MESSAGE = "Something went wrong, please try again later.";

const getErrorMessage = (error) => {
  if (!error) {
    return GENERAL_ERROR_MESSAGE;
  }

  switch (error.code) {
    case "auth/invalid-credential":
      return "Login failed! Invalid credential.";
    default:
      return GENERAL_ERROR_MESSAGE;
  }
};

export default function BasicLoginForm() {
  const [processing, setProcessing] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = (data) => {
    setProcessing(true);
    signInWithEmailAndPassword(auth, data.emailAddress, data.password)
      .then(({ user }) => {
        initializeUnallocatedCategory();
        message.success(`Welcome, ${user.email}!`);
      })
      .catch((error) => {
        console.error(error);
        message.error(getErrorMessage(error));
        form.resetFields();
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleLogin}
      requiredMark="optional"
    >
      <Form.Item
        name="emailAddress"
        label="Email Address"
        rules={[
          {
            required: true,
            message: "This is required",
          },
        ]}
      >
        <Input addonBefore={<MailOutlined />} autoFocus />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "This is required",
          },
        ]}
      >
        <Input.Password addonBefore={<KeyOutlined />} />
      </Form.Item>
      <Button htmlType="submit" type="primary" block loading={processing}>
        Proceed
      </Button>
    </Form>
  );
}
