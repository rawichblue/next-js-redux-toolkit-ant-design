"use client";

import { Alert } from "antd";

interface Props {
  message?: string;
  description?: string;
  onClose?: () => void;
  closable?: boolean;
}

export default function AlertSuccess({
  message = "เสร็จสิ้น",
  description = "ทำรายการเสร็จสิ้น",
  onClose,
  closable = true,
}: Props) {
  return (
    <Alert
      message={
        <div>
          <div className="font-semibold">{message}</div>
          <div className="text-sm text-gray-400">{description}</div>
        </div>
      }
      type="success"
      showIcon
      closable={closable}
      onClose={onClose}
      className="bg-green-500 text-white border-none shadow-lg transition-opacity duration-300"
    />
  );
}
