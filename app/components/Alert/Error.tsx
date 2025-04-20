"use client";

import { Alert } from "antd";

interface Props {
  message?: string;
  description?: string;
  onClose?: () => void;
  closable?: boolean;
}

export default function AlertError({
  message = "เกิดข้อผิดพลาด",
  description = "ไม่สามารถทำรายการได้",
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
      type="error"
      showIcon
      closable={closable}
      onClose={onClose}
      className="bg-red-500 text-white border-none shadow-lg transition-opacity duration-300"
    />
  );
}
