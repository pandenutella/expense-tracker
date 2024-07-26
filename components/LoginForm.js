"use client";

import { auth } from "@/firebase";
import { Button, Form, Input, message } from "antd";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRef, useState } from "react";

const PHONE_NUMBER_PREFIX = "+63";
const MAX_FAILED_OTP_ATTEMPTS = 3;

const getErrorMessage = (error) => {
  if (!error) {
    return "Something went wrong, please try again later.";
  }

  switch (error.code) {
    case "auth/invalid-app-credential":
      return "Login failed! Invalid credential.";
    case "auth/invalid-verification-code":
      return "Login failed! Invalid verification code.";
    default:
      return "Something went wrong, please try again later.";
  }
};

export default function LoginForm() {
  const [mode, setMode] = useState("phone-number");
  const [processing, setProcessing] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [form] = Form.useForm();

  const recaptchaVerifier = useRef(null);
  const confirmationResult = useRef(null);

  const initializeCaptcha = () => {
    if (recaptchaVerifier.current) {
      return Promise.resolve(recaptchaVerifier.current);
    }

    recaptchaVerifier.current = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    return recaptchaVerifier.current
      .verify()
      .then(() => recaptchaVerifier.current);
  };

  const handleLogin = (data) => {
    if ("phone-number" === mode) {
      setProcessing(true);
      const phoneNumber = `${PHONE_NUMBER_PREFIX}${data.phoneNumber}`;

      initializeCaptcha()
        .then((recaptchaVerifier) =>
          signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
        )
        .then((result) => {
          confirmationResult.current = result;
          setMode("sms-otp");
        })
        .catch((error) => {
          console.error(error);
          message.error(getErrorMessage(error));
        })
        .finally(() => setProcessing(false));
    } else if ("sms-otp" === mode) {
      setProcessing(true);

      confirmationResult.current
        .confirm(data.smsOtp)
        .then(() => message.success("Logged in successfully!"))
        .catch((error) => {
          console.error(error);
          message.error(getErrorMessage(error));

          if (attempt >= MAX_FAILED_OTP_ATTEMPTS - 1) {
            setAttempt(0);
            setMode("phone-number");
            form.resetFields();
          } else {
            setAttempt((attempt) => (attempt += 1));
            form.resetFields(["smsOtp"]);
          }
        })
        .finally(() => setProcessing(false));
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleLogin}
      requiredMark="optional"
    >
      {"phone-number" === mode && (
        <Form.Item
          name="phoneNumber"
          label="What is your phone number?"
          rules={[
            {
              required: true,
              message: "This is required",
            },
            {
              pattern: "^\\d{10}$",
              message: "Value must be a valid phone number",
            },
          ]}
        >
          <Input
            addonBefore={PHONE_NUMBER_PREFIX}
            minLength={10}
            maxLength={10}
            autoFocus
          />
        </Form.Item>
      )}
      {"sms-otp" === mode && (
        <Form.Item
          name="smsOtp"
          label="Verify phone number"
          rules={[
            {
              required: true,
              message: "This is required",
            },
          ]}
        >
          <Input.OTP style={{ width: "100%" }} autoFocus />
        </Form.Item>
      )}
      <Button htmlType="submit" type="primary" block loading={processing}>
        {"phone-number" === mode ? "Continue" : "Verify"}
      </Button>
      <div id="recaptcha-container"></div>
    </Form>
  );
}
