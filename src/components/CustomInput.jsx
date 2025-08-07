import React from "react";
import { Input } from "antd";

const CustomInput = ({
  id,
  value,
  onChange,
  type = "text",
  placeholder = "",
  ispassword = false,
  autoComplete = "off",
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
  ) : (
    <Input {...commonProps} />
  );
};

export default CustomInput;
