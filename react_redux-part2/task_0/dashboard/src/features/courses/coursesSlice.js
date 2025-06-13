import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";
import axios from "axios";

const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

const initialState = {
  courses: [],
};

const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(ENDPOINTS.courses);
      return response.data.courses;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching courses");
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(logout, () => initialState);
  },
});

export { fetchCourses };
export default coursesSlice.reducer;