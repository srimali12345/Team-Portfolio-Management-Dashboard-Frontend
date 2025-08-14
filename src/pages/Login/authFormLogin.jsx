import React from "react";
import { Form } from "antd";
import CustomInput from "../../components/inputComponent";
import CustomButton from "../../components/buttonComponent";
import { FORM_CONSTANTS } from "../../constants";

const LoginForm = ({ email, password, setEmail, setPassword, onFinish }) => {
  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onFinish}
      className="auth-form"
      validateTrigger="onChange"
    >
      <Form.Item
        label={FORM_CONSTANTS.COMMON.EMAIL_LABEL}
        name="email"
        rules={[
          { required: true, message: "Email is required", type: "email" },
        ]}
      >
        <CustomInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </Form.Item>

      <Form.Item
        label={FORM_CONSTANTS.COMMON.PASSWORD_LABEL}
        name="password"
        rules={[
          {
            required: true,
            message: FORM_CONSTANTS.COMMON.ERROR_MESSAGE_PASSWORD,
          },
        ]}
      >
        <CustomInput
          ispassword={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </Form.Item>

      <div className="button-container">
        <CustomButton className="secondary-button" htmlType="submit">
          {FORM_CONSTANTS.LOGIN.TITLE}
        </CustomButton>
        <CustomButton className="default-button" href="/register">
          {FORM_CONSTANTS.REGISTER.TITLE}
        </CustomButton>
      </div>
    </Form>
  );
};

export default LoginForm;
