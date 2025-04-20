"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actionGetUsers } from "../store/userSlice";
import { ColumnsType } from "antd/es/table";
import type { EmployeeList, QueryList } from "@/app/models/employee.model";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Input, DatePicker, Table, Space, Alert, Form, Spin } from "antd";
import Image from "next/image";
import Header from "./components/Header";
import ModalCreate from "./components/Modal/Create";
import ModalEdit from "./components/Modal/Edit";
import ModalDelete from "./components/Modal/Delete";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.getUserList.data);
  const loading = useAppSelector((state) => state.user.getUserList.loading);

  const [form] = Form.useForm();

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [alertDescription, setAlertDescription] = useState<string>("");
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeList | null>(
    null
  );

  const [searchParams, setSearchParams] = useState<QueryList>({
    userId: "",
    name: "",
    date: null,
  });

  const columns: ColumnsType<EmployeeList> = [
    { title: "รหัสพนักงาน", dataIndex: "userId", key: "userId" },
    { title: "ชื่อพนักงาน", dataIndex: "name", key: "name" },
    { title: "ที่อยู่", dataIndex: "address", key: "address" },
    {
      title: "จัดการ",
      key: "action",
      render: (_: undefined, record: EmployeeList) => (
        <Space>
          <div
            onClick={() => handleEdit(record)}
            className=" flex justify-center items-center cursor-pointer rounded-full w-10 h-10 bg-[#FFF9E5] hover:bg-amber-100"
          >
            <EditOutlined />
          </div>
          <div
            onClick={() => handleDeleteClick(record.id)}
            className=" flex justify-center items-center cursor-pointer rounded-full w-10 h-10 bg-[#F9EAEA] hover:bg-red-100"
          >
            <DeleteOutlined />
          </div>
        </Space>
      ),
      className: "flex justify-center items-center gap-2",
    },
  ];

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchUserId = searchParams.userId
        ? user.userId.includes(searchParams.userId)
        : true;
      const matchName = searchParams.name
        ? user.name.includes(searchParams.name)
        : true;
      const matchDate = searchParams.date
        ? user.createdAt === searchParams.date
        : true;

      return matchUserId && matchName && matchDate;
    });

    setFilteredUsers(filtered);
  }, [searchParams, users]);

  useEffect(() => {
    if (alert !== null) {
      const timeout = setTimeout(() => {
        setAlert(null);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [alert]);

  const handleEdit = (employee: EmployeeList) => {
    setSelectedEmployee(employee);
    setOpenEdit(true);
  };

  const handleDeleteClick = (userId: string) => {
    setUserIdToDelete(userId);
    setOpenDeleteModal(true);
  };

  const onSearch = () => {
    const dateValue = form.getFieldValue("date");

    const unixTimestamp = dateValue
      ? Math.floor(new Date(dateValue).getTime() / 1000)
      : null;

    setSearchParams({
      userId: form.getFieldValue("userId"),
      name: form.getFieldValue("name"),
      date: unixTimestamp,
    });

    dispatch(actionGetUsers());
  };

  return (
    <div>
      <div className="fixed top-5 right-5 z-40 w-72">
        {alert === "success" && (
          <Alert
            message="บันทึกสำเร็จ"
            type="success"
            showIcon
            description={alertDescription}
            className="animate-fade-in-out rounded-lg shadow-lg p-4"
          />
        )}
        {alert === "error" && (
          <Alert
            message="บันทึกล้มเหลว"
            type="error"
            showIcon
            description={alertDescription}
            className="animate-fade-in-out rounded-lg shadow-lg p-4"
          />
        )}
      </div>

      <Header title="ข้อมูลพนักงาน" />

      <div className="mt-4 flex justify-between items-center bg-white rounded-2xl  shadow-md p-5">
        <Form form={form} layout="vertical" className="w-full">
          <div className="p-5 ">
            <div className="font-semibold text-lg mb-4">ค้นหาข้อมูล</div>

            <div className="w-full max-md:flex-col flex justify-between items-center gap-2">
              <div className="grid grid-cols-1 md:grid-cols-3 w-10/12 max-md:w-full max-md:gap-0 gap-4  max-md:h-auto  h-24">
                <Form.Item name="userId" label="รหัสพนักงาน">
                  <Input placeholder="รหัสพนักงาน" />
                </Form.Item>

                <Form.Item name="name" label="ชื่อพนักงาน">
                  <Input placeholder="ระบุชื่อพนักงาน" />
                </Form.Item>

                <Form.Item name="date" label="วันที่สมัคร">
                  <DatePicker
                    placeholder="เลือกวันที่"
                    className="w-full"
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </div>

              <div className="flex justify-end items-center w-2/12  h-24 max-md:w-full max-md:h-auto max-md:justify-end ">
                <button
                  className={` w-28 h-10 btn-md ${
                    loading ? "btn-loading cursor-not-allowed" : "btn-primary"
                  }`}
                  onClick={onSearch}
                  disabled={loading}
                >
                  <SearchOutlined /> ค้นหา
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>

      <div className="overflow-x-auto mt-6 mb-10 bg-white rounded-2xl shadow-md p-5">
        {loading ? (
          <div className="flex justify-center items-center py-10 w-full">
            <Spin size="large" />
          </div>
        ) : filteredUsers.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <div>
                <div className="font-bold text-xl">ผลลัพธ์การค้นหา</div>
                <div className="text-gray-400 text-sm">
                  {filteredUsers.length} รายการ
                </div>
              </div>

              <div className="w-full sm:w-auto max-md:flex max-md:justify-end">
                <button
                  className="btn-primary w-40 btn-md h-10 ml-auto block sm:ml-0"
                  onClick={() => setOpenModalCreate(true)}
                >
                  <PlusOutlined /> เพิ่มพนักงาน
                </button>
              </div>
            </div>

            <Table
              className="w-full"
              rowKey="id"
              columns={columns}
              dataSource={filteredUsers}
              pagination={false}
              scroll={{ x: 600 }}
              rowClassName={(_, index) =>
                index % 2 === 0 ? "" : "bg-[#F1F4F7]"
              }
            />
          </>
        ) : (
          <div className="flex justify-center items-center text-gray-500 py-10 w-full">
            <Image
              src="/image/notFound.png"
              width={200}
              height={200}
              alt="ไม่พบข้อมูล"
            />
          </div>
        )}
      </div>

      <ModalCreate
        open={openModalCreate}
        onClose={() => setOpenModalCreate(false)}
        onSuccess={() => {
          setSearchParams({ userId: "", name: "", date: null });
          setOpenModalCreate(false);
          setAlert("success");
          setAlertDescription("เพิ่มพนักงานใหม่เรียบร้อยแล้ว");
        }}
        onError={() => {
          setOpenModalCreate(false);
          setAlert("error");
          setAlertDescription("เพิ่มพนักงานใหม่ไม่สำเร็จ");
        }}
      />

      <ModalEdit
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        employee={selectedEmployee}
        onSuccess={() => {
          setSearchParams({ userId: "", name: "", date: null });
          setOpenEdit(false);
          dispatch(actionGetUsers());
          setAlert("success");
          setAlertDescription("แก้ไขข้อมูลเรียบร้อยแล้ว");
        }}
        onError={() => {
          setOpenEdit(false);
          setAlert("error");
          setAlertDescription("แก้ไขข้อมูลไม่สำเร็จ");
        }}
      />

      <ModalDelete
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onSuccess={() => {
          setOpenDeleteModal(false);
          setAlert("success");
          setAlertDescription("ลบข้อมูลเรียบร้อยแล้ว");
        }}
        onError={() => {
          setOpenDeleteModal(false);
          setAlert("error");
          setAlertDescription("ลบข้อมูลไม่สำเร็จ");
        }}
        userId={userIdToDelete}
      />
    </div>
  );
}
