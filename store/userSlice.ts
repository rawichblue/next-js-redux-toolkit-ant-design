import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserList,
  createUser,
  deleteUser,
  updateUser,
} from "@/app/services/employee.service";
import {
  UserState,
  CreateEmployee,
  UpdateEmployee,
} from "@/app/models/employee.model";

const initialState: UserState = {
  getUserList: {
    data: [],
    loading: false,
    error: null,
  },
  createUser: {
    data: null,
    loading: false,
    error: null,
  },
  updateUser: {
    data: null,
    loading: false,
    error: null,
  },
  deleteUser: {
    data: null,
    loading: false,
    error: null,
  },
};

export const actionGetUsers = createAsyncThunk("user/getList", async () => {
  const data = await getUserList();
  return data;
});

export const actionCreateUser = createAsyncThunk(
  "user/create",
  async (newUser: CreateEmployee) => {
    const data = await createUser(newUser);
    return data;
  }
);

export const actionUpdateUser = createAsyncThunk(
  "user/update",
  async ({ id, payload }: { id: string; payload: Partial<UpdateEmployee> }) => {
    const updated = await updateUser(id, payload);
    return updated;
  }
);

export const actionDeleteUser = createAsyncThunk(
  "user/delete",
  async (userId: string) => {
    await deleteUser(userId);
    return userId;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get List
      .addCase(actionGetUsers.pending, (state) => {
        state.getUserList.loading = true;
        state.getUserList.error = null;
      })
      .addCase(actionGetUsers.fulfilled, (state, action) => {
        state.getUserList.loading = false;
        state.getUserList.data = action.payload;
      })
      .addCase(actionGetUsers.rejected, (state, action) => {
        state.getUserList.loading = false;
        state.getUserList.error =
          action.error.message || "Failed to get user list";
      })

      // Create
      .addCase(actionCreateUser.pending, (state) => {
        state.createUser.loading = true;
        state.createUser.error = null;
      })
      .addCase(actionCreateUser.fulfilled, (state, action) => {
        state.createUser.loading = false;
        state.createUser.data = action.payload;
        state.getUserList.data.push(action.payload);
      })
      .addCase(actionCreateUser.rejected, (state, action) => {
        state.createUser.loading = false;
        state.createUser.error =
          action.error.message || "Failed to create user";
      })

      // Update
      .addCase(actionUpdateUser.pending, (state) => {
        state.updateUser.loading = true;
        state.updateUser.error = null;
      })
      .addCase(actionUpdateUser.fulfilled, (state, action) => {
        state.updateUser.loading = false;
        state.updateUser.data = action.payload;
        const index = state.getUserList.data.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.getUserList.data[index] = action.payload;
        }
      })
      .addCase(actionUpdateUser.rejected, (state, action) => {
        state.updateUser.loading = false;
        state.updateUser.error =
          action.error.message || "Failed to update user";
      })

      // Delete
      .addCase(actionDeleteUser.pending, (state) => {
        state.deleteUser.loading = true;
        state.deleteUser.error = null;
      })
      .addCase(actionDeleteUser.fulfilled, (state, action) => {
        state.deleteUser.loading = false;
        state.deleteUser.data = action.payload;
        state.getUserList.data = state.getUserList.data.filter(
          (user) => user.id !== action.payload
        );
      })
      .addCase(actionDeleteUser.rejected, (state, action) => {
        state.deleteUser.loading = false;
        state.deleteUser.error =
          action.error.message || "Failed to delete user";
      });
  },
});

export default userSlice.reducer;
