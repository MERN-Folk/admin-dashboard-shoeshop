import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createPerson = createAsyncThunk(
  //  ****path same server->route****
  "/createPerson",
  async ({ updatedPersonData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createPerson(updatedPersonData);
      toast.success("Person Added Successfully");
      navigate("/skw301_home");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPersons = createAsyncThunk(
  //  ****path same server->route****
  "/getPersons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getPersons();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPersonsByStaff = createAsyncThunk(
  //  ****path same server->route****
  "/staffPersons/:id",
  async (staffId, { rejectWithValue }) => {
    try {
      const response = await api.getPersonsByStaff(staffId);
      // console.log('staffId', response)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePerson = createAsyncThunk(
  //  ****path same server->route****
  "/person/:id",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deletePerson(id);
      toast.success("Person Deleted Successfully");
      window.location.reload();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePerson = createAsyncThunk(
  //  ****path same server->route****
  "/person/:id",
  async ({ id, updatedPersonData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updatePerson(updatedPersonData, id);
      // console.log('response', response)
      toast.success("Person Updated Successfully");
      navigate("/skw301_home");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchPersons = createAsyncThunk(
  //  ****path same server->route****
  "/search",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getPersonsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const personSlice = createSlice({
  name: "person",
  initialState: {
    person: {},
    persons: [],
    staffPersons: [],
    error: "",
    loading: false,
  },
  extraReducers: {
    [createPerson.pending]: (state, action) => {
      state.loading = true;
    },
    [createPerson.fulfilled]: (state, action) => {
      state.loading = false;
      state.persons = [action.payload];
    },
    [createPerson.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getPersons.pending]: (state, action) => {
      state.loading = true;
    },
    [getPersons.fulfilled]: (state, action) => {
      state.loading = false;
      state.persons = action.payload;
    },
    [getPersons.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getPersonsByStaff.pending]: (state, action) => {
      state.loading = true;
    },
    [getPersonsByStaff.fulfilled]: (state, action) => {
      state.loading = false;
      state.staffPersons = action.payload;
    },
    [getPersonsByStaff.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deletePerson.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePerson.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.staffPersons = state.staffPersons.filter(
          (item) => item._id !== id
        );
        state.persons = state.persons.filter((item) => item._id !== id);
      }
    },
    [deletePerson.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updatePerson.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePerson.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.staffPersons = state.staffPersons.map((item) =>
          item._id === id ? action.payload : item
        );
        state.persons = state.persons.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updatePerson.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [searchPersons.pending]: (state, action) => {
      state.loading = true;
    },
    [searchPersons.fulfilled]: (state, action) => {
      state.loading = false;
      state.persons = action.payload;
    },
    [searchPersons.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default personSlice.reducer;
