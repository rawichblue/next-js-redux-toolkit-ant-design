import { actionDeleteUser } from "@/store/userSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Image from "next/image";

interface Props {
  open: boolean;
  userId: string | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: () => void;
}

export default function ModalDelete({
  open,
  onClose,
  onSuccess,
  onError,
  userId,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (userId) {
      dispatch(actionDeleteUser(userId))
        .unwrap()
        .then(() => {
          onSuccess();
          onClose();
        })
        .catch((err) => {
          console.log("Error while deleting:", err);
          onError();
        });
    }
  };

  return (
    <Modal
      className="h-auto rounded-lg bg-white max-sm:w-[90%] w-[430px] z-50 px-8 py-6 shadow-lg"
      open={open}
      onCancel={onClose}
      footer={null}
      closeIcon={<CloseOutlined className="text-gray-500 hover:text-red-500" />}
      centered
    >
      <div className="flex items-center justify-between mb-2">
        <Image
          src="/image/modalDelete.png"
          width={40}
          height={40}
          alt="เพิ่มพนักงาน"
        />
      </div>

      <div className="mb-4">
        <div className="font-bold text-xl">ยืนยันการลบรายการ</div>
        <div className="text-sm text-gray-400">
          กรุณายืนยันการทำรายการอีกครั้ง
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6">
        <button className="btn-cancle w-24 btn-md" onClick={onClose}>
          ยกเลิก
        </button>
        <button className="btn-primary w-24 btn-md" onClick={handleDelete}>
          ยืนยัน
        </button>
      </div>
    </Modal>
  );
}
