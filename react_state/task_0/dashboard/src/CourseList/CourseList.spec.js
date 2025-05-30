import { render } from "@testing-library/react";
import CourseList from "./CourseList";
import { StyleSheetTestUtils } from "aphrodite";
// Empêche l'injection des styles dans le DOM lors des tests
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});
describe("CourseList", () => {
  it("renders 5 rows when it receives an array of 5 courses", () => {
    const courses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
      { id: 4, name: "Node.js", credit: 50 },
      { id: 5, name: "JavaScript", credit: 30 },
    ];
    const { container } = render(<CourseList courses={courses} />);
    const rows = container.querySelectorAll("tr");
    expect(rows.length).toBe(7);
  });

  it("renders 1 row when it receives an empty array", () => {
    const { container } = render(<CourseList courses={[]} />);
    const rows = container.querySelectorAll("tr");
    expect(rows.length).toBe(1);
  });
});
