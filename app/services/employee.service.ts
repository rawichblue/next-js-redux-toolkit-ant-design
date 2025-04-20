import axios from "axios";
import { EmployeeList } from "../models/employee.model";

export const getUserList = async (): Promise<EmployeeList[]> => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`);
  return res.data;
};

export const createUser = async (
  newUser: Omit<EmployeeList, "id" | "createdAt">
): Promise<EmployeeList> => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
    newUser
  );
  return res.data;
};

export const updateUser = async (
  id: string,
  payload: Partial<EmployeeList>
): Promise<EmployeeList> => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${id}`,
    payload
  );
  return res.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${userId}`);
};
