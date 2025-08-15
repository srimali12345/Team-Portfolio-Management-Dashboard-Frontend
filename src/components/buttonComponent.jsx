import React from "react";
import { Button } from "antd";
import classNames from "classnames";

const CustomButton = ({
  children,
  type = "primary",
  className = "",
  href,
  onClick,
  disabled = false,
  loading = false,
  htmlType = "",
  ...rest
}) => {
  return (
    <Button
      type={type}
      className={classNames("custom-button", className)}
      href={href}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      htmlType={htmlType}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
