import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "config";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
};

export const register = createAsyncThunk(
  "users/register",
  async ({ first_name, last_name, email, password }, thunkAPI) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    });

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();

      if (res.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk("users/me", async (_, thunkAPI) => {
  try {
    const res = await fetch("/api/users/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();

      if (res.status === 200) {
        const { dispatch } = thunkAPI;
        dispatch(getUser());
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    const res = await fetch("/api/users/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.registered = true;
    });
    builder.addCase(register.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
