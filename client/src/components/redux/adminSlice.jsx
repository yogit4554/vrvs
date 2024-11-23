import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAdmin = createAsyncThunk('admin/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/api/v1/login', credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: { admin: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.admin = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;