import React from "react";
import { FORM_CONSTANTS } from "../../constants";
import { Form, Select } from "antd";
import CustomInput from "../../components/inputComponent";
import CustomButton from "../../components/buttonComponent";

const { Option } = Select;

const RegisterForm = ({
  name,
  username,
  email,
  password,
  role,
  setName,
  setUsername,
  setEmail,
  setPassword,
  setRole,
  onFinish,
  validateMessages,
}) => {
  return (
    <Form
      name="register"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
      validateTrigger="onChange"
      className="auth-form"
      requiredMark={true}
      validateMessages={validateMessages}
    >
      <Form.Item
        label={FORM_CONSTANTS.COMMON.NAME}
        name={FORM_CONSTANTS.COMMON.NAME}
        rules={[
          {
            required: true,
            message: FORM_CONSTANTS.COMMON.MESSAGE_NAME,
            type: "string",
            min: 3,
            max: 20,
          },
        ]}
      >
        <CustomInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={FORM_CONSTANTS.COMMON.NAME}
        />
      </Form.Item>

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
        name={FORM_CONSTANTS.COMMON.EMAIL_LABEL}
        label={FORM_CONSTANTS.COMMON.EMAIL_LABEL}
        rules={[
          {
            required: true,
            message: FORM_CONSTANTS.COMMON.MESSAGE_EMAIL,
            type: "email",
          },
        ]}
      >
        <CustomInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={FORM_CONSTANTS.COMMON.EMAIL_LABEL}
        />
      </Form.Item>

      <Form.Item
        name={FORM_CONSTANTS.COMMON.PASSWORD_LABEL}
        label={FORM_CONSTANTS.COMMON.PASSWORD_LABEL}
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
          placeholder={FORM_CONSTANTS.COMMON.PASSWORD_LABEL}
        />
      </Form.Item>

      <Form.Item
        name={FORM_CONSTANTS.COMMON.USER_TYPE}
        label={FORM_CONSTANTS.COMMON.USER_TYPE}
        rules={[
          {
            required: true,
            message: FORM_CONSTANTS.COMMON.MESSAGE_USER_TYPE,
          },
        ]}
      >
        <Select
          placeholder="Select user type"
          value={role}
          onChange={(value) => setRole(value)}
        >
          <Option value="admin">Admin</Option>
          <Option value="viewer">Viewer</Option>
        </Select>
      </Form.Item>

      <div className="button-container">
        <CustomButton className="secondary-button" htmlType="submit">
          {FORM_CONSTANTS.REGISTER.TITLE}
        </CustomButton>

        <CustomButton className="default-button" href="/login">
          {FORM_CONSTANTS.LOGIN.TITLE}
        </CustomButton>
      </div>
    </Form>
  );
};

export default RegisterForm;
