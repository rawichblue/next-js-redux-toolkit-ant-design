export interface UserState {
  getUserList: reqStateList;
  createUser: reqStateCreate;
  updateUser: reqStateUpdate;
  deleteUser: reqStateDelete;
}

export interface reqStateList {
  data: EmployeeList[];
  loading: boolean;
  error: string | null;
}

export interface reqStateCreate {
  data: CreateEmployee | null;
  loading: boolean;
  error: string | null;
}

export interface reqStateUpdate {
  data: UpdateEmployee | null;
  loading: boolean;
  error: string | null;
}

export interface reqStateDelete {
  data: string | null;
  loading: boolean;
  error: string | null;
}

export interface GetEmployeeList {
  datas: EmployeeList[];
  query: QueryEmployeeList;
  loading: boolean;
  paginate: Paginate | null;
}

export interface QueryEmployeeList {
  page: number;
  size: number;
  search: string;
  date_start: number;
  date_end: number;
  order_by: string;
}

export interface QueryList {
  userId: string;
  name: string;
  date: number | null;
}

export interface Paginate {
  page: number;
  size: number;
  total: number;
}

export interface EmployeeList {
  id: string;
  userId: string;
  name: string;
  address: string;
  createdAt: number;
}

export interface CreateEmployee {
  userId: string;
  name: string;
  address: string;
}

export interface UpdateEmployee {
  userId: string;
  name: string;
  address: string;
}
