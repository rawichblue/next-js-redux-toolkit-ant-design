import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { actionUpdateUser } from "@/store/userSlice";
import { EmployeeList } from "@/app/models/employee.model";
import { Modal, Form, Input } from "antd";
import Image from "next/image";

interface Props {
  open: boolean;
  employee: EmployeeList | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: () => void;
}

export default function ModalEdit({
  open,
  onClose,
  employee,
  onSuccess,
  onError,
}: Props) {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  useEffect(() => {
    if (employee) {
      form.setFieldsValue(employee);
    } else {
      form.resetFields();
    }
  }, [employee, form]);

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        if (!employee?.id) {
          throw new Error("id not found");
        }

        dispatch(actionUpdateUser({ id: employee.id, payload: values }))
          .unwrap()
          .then(() => {
            onSuccess();
          })
          .catch((error) => {
            console.error("Error:", error);
            onError();
          });
      })
      .catch((verr) => {
        console.error("Validation error:", verr);
      });
  };

  return (
    <Form form={form} layout="vertical">
      <Modal
        open={open}
        onCancel={onClose}
        destroyOnClose
        centered
        footer={null}
      >
        <div className="flex items-center justify-between mb-3">
          <Image
            src="/image/modalEdit.png"
            width={40}
            height={40}
            alt="แก้ไขพนักงาน"
          />
        </div>

        <div className="mb-4 ">
          <div className="text-xl font-xl text-[#5B7FE1] flex items-center gap-2">
            แก้ไขข้อมูลพนักงาน
          </div>
        </div>

        <div>
          <div className="  grid grid-cols-1 sm:grid-cols-2 gap-4 max-md:gap-0">
            <Form.Item
              name="userId"
              label={
                <div className="mt-2 text-sm font-medium">รหัสพนักงาน</div>
              }
            >
              <Input placeholder="ระบุรหัสพนักงาน" className="mt-2" />
            </Form.Item>

            <Form.Item
              name="name"
              label={
                <div className="mt-2 text-sm font-medium">ชื่อพนักงาน</div>
              }
            >
              <Input placeholder="ระบุชื่อพนักงาน" className="mt-2" />
            </Form.Item>
          </div>

          <div className="my-2 md:my-4  ">
            <div className="text-sm font-medium">ที่อยู่ :</div>
          </div>
          <Form.Item name="address">
            <TextArea rows={3} placeholder="ระบุที่อยู่" className="mt-2" />
          </Form.Item>
        </div>

        <div className="flex justify-center items-center gap-2 pt-2">
          <button onClick={onClose} className="btn-cancle w-20 h-10">
            ยกเลิก
          </button>
          <button onClick={handleUpdate} className="btn-primary w-20 h-10">
            บันทึก
          </button>
        </div>
      </Modal>
    </Form>
  );
}
