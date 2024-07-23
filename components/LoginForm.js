"use client";

import { auth } from "@/firebase";
import { Button, Form, Input, message } from "antd";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRef, useState } from "react";

const PHONE_NUMBER_PREFIX = "+63";

export default function LoginForm() {
  const [captcha, setCaptcha] = useState(null);
  const [mode, setMode] = useState("phone-number");
  const [processing, setProcessing] = useState(false);

  const recaptchaVerifier = useRef(null);
  const confirmationResult = useRef(null);

  const initializeCaptcha = () => {
    if (captcha) {
      return Promise.resolve(recaptchaVerifier.current);
    }

    recaptchaVerifier.current = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    return recaptchaVerifier.current.verify().then((captcha) => {
      setCaptcha(captcha);

      return recaptchaVerifier.current;
    });
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
          if (error.code) {
            switch (error.code) {
              case "auth/invalid-app-credential":
                message.error(
                  "Login failed! Phone number does not belong to any user."
                );
                break;
            }
          }
        })
        .finally(() => setProcessing(false));
    } else if ("sms-otp" === mode) {
      setProcessing(true);

      confirmationResult.current
        .confirm(data.smsOtp)
        .then(() => message.success("Logged in successfully!"))
        .finally(() => setProcessing(false));
    }
  };

  return (
    <Form layout="vertical" onFinish={handleLogin} requiredMark="optional">
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
          <Input.OTP style={{ width: "100%" }} autoFocus mask />
        </Form.Item>
      )}
      <Button htmlType="submit" type="primary" block loading={processing}>
        {"phone-number" === mode ? "Continue" : "Verify"}
      </Button>
      <div id="recaptcha-container"></div>
    </Form>
  );
}
