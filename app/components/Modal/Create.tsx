import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { actionCreateUser, actionGetUsers } from "@/store/userSlice";
import { Modal, Input, Form } from "antd";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: () => void;
}

export default function ModalCreate({
  open,
  onClose,
  onSuccess,
  onError,
}: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { TextArea } = Input;

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((e) => {
        dispatch(actionCreateUser(e))
          .unwrap()
          .then(() => {
            dispatch(actionGetUsers()).then(() => {
              onSuccess();
              form.resetFields();
              onClose();
            });
          })
          .catch((err) => {
            console.error("Error:", err);
            onError();
          });
      })
      .catch((vree) => {
        console.error("Validation error:", vree);
      });
  };

  return (
    <Form form={form} layout="vertical">
      <Modal
        open={open}
        onCancel={onClose}
        centered
        destroyOnClose
        width={600}
        footer={null}
      >
        <div className="flex items-center justify-between mb-4">
          <Image
            src="/image/modalAdd.png"
            width={40}
            height={40}
            alt="เพิ่มพนักงาน"
          />
        </div>

        <div className="mb-4">
          <div className="text-xl font-semibold text-[#5B7FE1] flex items-center gap-2">
            เพิ่มพนักงาน
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Form.Item
            label="รหัสพนักงาน"
            name="userId"
            rules={[{ required: true, message: "กรุณาระบุรหัสพนักงาน" }]}
          >
            <Input placeholder="ระบุรหัสพนักงาน" />
          </Form.Item>

          <Form.Item
            label="ชื่อพนักงาน"
            name="name"
            rules={[{ required: true, message: "กรุณาระบุชื่อพนักงาน" }]}
          >
            <Input placeholder="ระบุชื่อพนักงาน" />
          </Form.Item>
        </div>

        <div className="mb-4">ที่อยู่ :</div>
        <Form.Item name="address" className="w-full ">
          <TextArea
            rows={4}
            placeholder="ระบุที่อยู่"
            className="max-h-[150px]"
          />
        </Form.Item>

        <div className="flex justify-center items-center gap-2 pt-2">
          <button onClick={onClose} className="btn-cancle w-20 h-10">
            ยกเลิก
          </button>
          <button onClick={handleSave} className="btn-primary w-20 h-10">
            บันทึก
          </button>
        </div>
      </Modal>
    </Form>
  );
}
