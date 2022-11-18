import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createGroup = createAsyncThunk(
  //  ****path same server->route****
  "/createGroup",
  async ({ updatedGroupData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createGroup(updatedGroupData);
      toast.success("Group Added Successfully");
      // navigate("/addCpro");
      window.location.reload();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getGroups = createAsyncThunk(
  //  ****path same server->route****
  "/getGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getGroups();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  //  ****path same server->route****
  "/group/:id",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteGroup(id);
      toast.success("Group Deleted Successfully");
      window.location.reload();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateGroup = createAsyncThunk(
  //  ****path same server->route****
  "/group/:id",
  async ({ id, updatedGroupData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateGroup(updatedGroupData, id);
      // console.log('response', response)
      toast.success("Group Updated Successfully");
      // window.location.reload();
      navigate("/addGroup");
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

const groupSlice = createSlice({
  name: "group",
  initialState: {
    group: {},
    groups: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createGroup.pending]: (state, action) => {
      state.loading = true;
    },
    [createGroup.fulfilled]: (state, action) => {
      state.loading = false;
      state.groups = [action.payload];
    },
    [createGroup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getGroups.pending]: (state, action) => {
      state.loading = true;
    },
    [getGroups.fulfilled]: (state, action) => {
      state.loading = false;
      state.groups = action.payload;
    },
    [getGroups.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteGroup.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteGroup.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      // if (id) {
      //   state.staffCpros = state.staffCpros.filter(
      //     (item) => item._id !== id
      //   );
        state.groups = state.groups.filter((item) => item._id !== id);
      // }
    },
    [deleteGroup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateGroup.pending]: (state, action) => {
      state.loading = true;
    },
    [updateGroup.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
        state.groups = state.groups.map((item) =>
          item._id === id ? action.payload : item
        );
    },
    [updateGroup.rejected]: (state, action) => {
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

export default groupSlice.reducer;
