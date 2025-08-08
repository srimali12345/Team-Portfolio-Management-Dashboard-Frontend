import React from "react";
import { FORM_CONSTANTS } from "../../constants";
import { Form } from "antd";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  onFinish,
  validateMessages,
}) => {
  return (
    <>
      <Form
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={(errorInfo) => {
          console.log("Failed:", errorInfo);
        }}
        validateTrigger="onChange"
        className="auth-form"
        requiredMark={true}
        validateMessages={validateMessages}
      >
        <Form.Item
          label={FORM_CONSTANTS.COMMON.USERNAME_LABEL}
          name={FORM_CONSTANTS.COMMON.USERNAME_LABEL}
          rules={[
            {
              required: true,
              message: FORM_CONSTANTS.COMMON.MESSAGE_USERNAME,
              type: "string",
              min: 3,
              max: 20,
            },
          ]}
        >
          <CustomInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={FORM_CONSTANTS.COMMON.USERNAME_LABEL}
          />
        </Form.Item>

        <Form.Item
          label={FORM_CONSTANTS.COMMON.PASSWORD_LABEL}
          name={FORM_CONSTANTS.COMMON.PASSWORD_LABEL}
          rules={[
            {
              required: true,
              message: FORM_CONSTANTS.COMMON.ERROR_MESSAGE_PASSWORD,
              type: "",
            },
          ]}
        >
          <CustomInput
            ispassword={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={FORM_CONSTANTS.COMMON.PASSWORD_LABEL}
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
    </>
  );
};

export default LoginForm;
