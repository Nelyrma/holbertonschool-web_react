import reducer, { fetchCourses } from "../courses/coursesSlice";
import { logout } from "../auth/authSlice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

const initialState = {
  courses: [],
};

describe("coursesSlice", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should return the initial state by default", () => {
    const nextState = reducer(undefined, { type: undefined });
    expect(nextState).toEqual(initialState);
  });

  it("should fetch courses data successfully", async () => {
    const mockCourses = [
      { id: 1, name: "Math" },
      { id: 2, name: "Science" },
    ];

    mock.onGet("http://localhost:5173/courses.json").reply(200, mockCourses);

    const dispatch = jest.fn();
    const getState = () => ({});
    const thunkAction = fetchCourses();

    const result = await thunkAction(dispatch, getState, undefined);
    const fulfilledAction = {
      type: fetchCourses.fulfilled.type,
      payload: mockCourses,
    };

    const nextState = reducer(initialState, fulfilledAction);
    expect(nextState.courses).toEqual(mockCourses);
  });

  it("should reset the courses state to empty on logout", () => {
    const currentState = {
      courses: [
        { id: 1, name: "Math" },
        { id: 2, name: "Science" },
      ],
    };

    const nextState = reducer(currentState, logout());
    expect(nextState).toEqual(initialState);
  });
});