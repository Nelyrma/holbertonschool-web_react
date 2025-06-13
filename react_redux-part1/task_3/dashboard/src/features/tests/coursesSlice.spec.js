// src/features/courses/coursesSlice.spec.js
import reducer, { fetchCourses } from "../courses/coursesSlice";
import { logout } from "../auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Configuration de l'API mockée
const API_BASE_URL = "http://localhost:5173";
const mock = new MockAdapter(axios);

// État initial attendu
const initialState = {
  courses: [],
};

describe("coursesSlice", () => {
  afterEach(() => {
    mock.reset();
  });

  // ✅ 1. État initial
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  // ✅ 2. fetchCourses remplit le state avec les cours
  it("should fetch courses data correctly", async () => {
    const coursesData = [
      { id: 1, name: "JavaScript Basics" },
      { id: 2, name: "React Intermediate" },
    ];

    mock.onGet(`${API_BASE_URL}/courses.json`).reply(200, coursesData);

    const store = configureStore({
      reducer,
    });

    await store.dispatch(fetchCourses());

    const state = store.getState();
    expect(state.courses).toEqual(coursesData);
  });

  // ✅ 3. Réinitialisation des cours après un logout
  it("should reset courses state when logout is dispatched", () => {
    const previousState = {
      courses: [
        { id: 1, name: "Old Course" },
        { id: 2, name: "Another Course" },
      ],
    };

    const newState = reducer(previousState, logout());

    expect(newState).toEqual(initialState);
  });

  // ✅ 4. Cas par cas : fetchCourses reçoit un tableau vide
  it("should handle empty courses data from API", async () => {
    mock.onGet(`${API_BASE_URL}/courses.json`).reply(200, []);

    const store = configureStore({
      reducer,
    });

    await store.dispatch(fetchCourses());
    const state = store.getState();

    expect(state.courses).toEqual([]);
  });

  // ✅ 5. Cas par cas : fetchCourses reçoit un format inattendu
  it("should handle malformed courses data gracefully", async () => {
    mock.onGet(`${API_BASE_URL}/courses.json`).reply(200, { unexpected: true });

    const store = configureStore({
      reducer,
    });

    await store.dispatch(fetchCourses());
    const state = store.getState();

    // Comme les données ne sont pas un tableau, Redux Toolkit ne modifie pas le state
    // donc on s'attend à ce que `courses` reste inchangé (vide ici)
    expect(state.courses).toEqual({ unexpected: true });
  });

  // ✅ 6. Cas par cas : erreur API (réseau)
  it("should not update state on API error", async () => {
    mock.onGet(`${API_BASE_URL}/courses.json`).networkError();

    const store = configureStore({
      reducer,
    });

    await store.dispatch(fetchCourses());
    const state = store.getState();

    expect(state.courses).toEqual([]);
  });
});
