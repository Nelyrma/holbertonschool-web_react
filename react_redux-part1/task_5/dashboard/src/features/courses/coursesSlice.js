import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../auth/authSlice"; // Import de l'action logout

// 1. Base URL et Endpoints
const API_BASE_URL = "http://localhost:5173";
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

// 2. État initial
const initialState = {
  courses: [],
};

// 3. Async thunk pour récupérer les cours
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get(ENDPOINTS.courses);
    return response.data;
  }
);

// 4. Création du slice
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Quand fetchCourses est terminé avec succès
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      // Quand un logout est déclenché, on réinitialise les cours
      .addCase(logout, (state) => {
        state.courses = [];
      });
  },
});

export default coursesSlice.reducer;
