import { getCurrentYear, getFooterCopy, getLatestNotification } from "./utils";
import { StyleSheetTestUtils } from "aphrodite";
// Empêche l'injection des styles dans le DOM lors des tests
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Utils functions", () => {
  test("getCurrentYear returns the current year", () => {
    const year = getCurrentYear();
    expect(year).toBe(new Date().getFullYear());
  });

  test("getFooterCopy returns correct string when true", () => {
    expect(getFooterCopy(true)).toBe("Holberton School"); // Correct casing
  });

  test("getFooterCopy returns correct string when false", () => {
    expect(getFooterCopy(false)).toBe("Holberton School main dashboard"); // Correct casing
  });

  test("getLatestNotification returns expected HTML string", () => {
    const notification = getLatestNotification();
    expect(notification).toContain("<strong>Urgent requirement</strong>");
    expect(notification).toMatch(/complete by EOD/i);
  });
});
