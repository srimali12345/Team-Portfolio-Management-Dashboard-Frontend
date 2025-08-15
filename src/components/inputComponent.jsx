import React from "react";
import { Input } from "antd";

const CustomInput = ({
  id,
  value,
  onChange,
  type = "text",
  placeholder = "",
  ispassword = false,
  isSearch = false,
  isTextArea=false,
  autoComplete = "off",
  rows='3',
  ...rest
}) => {
  const commonProps = {
    id,
    value,
    onChange,
    type,
    placeholder,
    autoComplete,
    ...rest,
  };
  return ispassword ? (
    <Input.Password {...commonProps} />
  ) : isSearch ? (
    <Input.Search {...commonProps} />
  ) : isTextArea ?(<Input.TextArea rows={rows} {...commonProps}/>) : (
    <Input {...commonProps} />
  );
};

export default CustomInput;
