import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createCpro = createAsyncThunk(
  //  ****path same server->route****
  "/createCpro",
  async ({ updatedCproData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createCpro(updatedCproData);
      toast.success("Cpro Added Successfully");
      // navigate("/addCpro");
      window.location.reload();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCpros = createAsyncThunk(
  //  ****path same server->route****
  "/getCpros",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getCpros();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const getCprosByStaff = createAsyncThunk(
//   //  ****path same server->route****
//   "/staffCpros/:id",
//   async (staffId, { rejectWithValue }) => {
//     try {
//       const response = await api.getCprosByStaff(staffId);
//       // console.log('staffId', response)
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const deleteCpro = createAsyncThunk(
  //  ****path same server->route****
  "/cpro/:id",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteCpro(id);
      toast.success("Cpro Deleted Successfully");
      window.location.reload();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCpro = createAsyncThunk(
  //  ****path same server->route****
  "/cpro/:id",
  async ({ id, updatedCproData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateCpro(updatedCproData, id);
      // console.log('response', response)
      toast.success("Cpro Updated Successfully");
      // window.location.reload();
      navigate("/addCpro");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const searchPersons = createAsyncThunk(
//   //  ****path same server->route****
//   "/search",
//   async (searchQuery, { rejectWithValue }) => {    
//     try {
//       const response = await api.getPersonsBySearch(searchQuery);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const cproSlice = createSlice({
  name: "cpro",
  initialState: {
    cpro: {},
    cpros: [],
    // staffCpros: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createCpro.pending]: (state, action) => {
      state.loading = true;
    },
    [createCpro.fulfilled]: (state, action) => {
      state.loading = false;
      state.cpros = [action.payload];
    },
    [createCpro.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCpros.pending]: (state, action) => {
      state.loading = true;
    },
    [getCpros.fulfilled]: (state, action) => {
      state.loading = false;
      state.cpros = action.payload;
    },
    [getCpros.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // [getCprosByStaff.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getCprosByStaff.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.staffCpros = action.payload;
    // },
    // [getCprosByStaff.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    [deleteCpro.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCpro.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      // if (id) {
      //   state.staffCpros = state.staffCpros.filter(
      //     (item) => item._id !== id
      //   );
        state.cpros = state.cpros.filter((item) => item._id !== id);
      // }
    },
    [deleteCpro.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateCpro.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCpro.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      // if (id) {
      //   state.staffCpros = state.staffCpros.map((item) =>
      //     item._id === id ? action.payload : item
      //   );
        state.cpros = state.cpros.map((item) =>
          item._id === id ? action.payload : item
        );
      // }
    },
    [updateCpro.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
//     [searchPersons.pending]: (state, action) => {
//       state.loading = true;
//     },
//     [searchPersons.fulfilled]: (state, action) => {
//       state.loading = false;
//       state.persons = action.payload;
//     },
//     [searchPersons.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload.message;
//     },
  },
});

export default cproSlice.reducer;
