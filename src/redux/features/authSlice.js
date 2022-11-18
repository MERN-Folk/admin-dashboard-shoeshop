import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  //  ****path same server->route****
  "/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.logIn(formValue);
      const role = response.data.result.role;
      toast.success("Login Successfully");
      if (role === "admin") {
        navigate("/admin_home");
      } else if (role === "bkk") {
        navigate("/bkk_home");
      } else if (role === "skw") {
        navigate("/skw_home");
      } else if (role === "nma") {
        navigate("/nma_home");
      } else {
        navigate("/plk_home");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  //  ****path same server->route****
  "/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.regisTer(formValue);
      toast.success("Register Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStaffs = createAsyncThunk(
  "/getStaffs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getStaffs();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const changeStatus = createAsyncThunk(
  "/changeStatus",
  async ({ value }, { rejectWithValue }) => {
    try {
      const response = await api.changeStatus(value);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const changeRole = createAsyncThunk(
  "/changeRole",
  async ({ value }, { rejectWithValue }) => {
    try {
      const response = await api.changeRole(value);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeStaff = createAsyncThunk(
  "/staffs/:id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.removeStaff(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);




const authSlice = createSlice({
  name: "auth",
  initialState: {
    staff: null,
    staffs: [],
    error: "",
    loading: false,
  },
  reducers: {
    // use at App.js
    setStaff: (state, action) => {
      state.staff = action.payload;
    },
    // use at Header.js
    setLogout: (state, action) => {
      localStorage.clear();
      state.staff = null;
      window.location = "/"
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.staff = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.staff = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getStaffs.pending]: (state, action) => {
      state.loading = true;
    },
    [getStaffs.fulfilled]: (state, action) => {
      state.loading = false;
      state.staffs = action.payload;
    },
    [getStaffs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // [changeStatus.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [changeStatus.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.staffs = action.payload;
    // },
    // [changeStatus.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    [removeStaff.pending]: (state, action) => {
      state.loading = true;
    },
    [removeStaff.fulfilled]: (state, action) => {
      state.loading = false;
      state.staffs = action.payload;
    },
    [removeStaff.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setStaff, setLogout } = authSlice.actions;

export default authSlice.reducer;
