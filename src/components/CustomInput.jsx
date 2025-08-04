import React from "react";
import { Input } from "antd";

const CustomInput = ({
  id,
  value,
  onChange,
  type = "text",
  placeholder = "",
  ispassword = false,
  ref,
  ...rest
}) => {
  const commonProps = {
    id,
    value,
    onChange,
    type,
    placeholder,
    ref,
    ...rest,
  };

  return ispassword ? (
    <Input.Password {...commonProps} />
  ) : (
    <Input {...commonProps} />
  );
};

export default CustomInput;
