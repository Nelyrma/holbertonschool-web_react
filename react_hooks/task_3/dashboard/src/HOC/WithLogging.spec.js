import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import WithLogging from "./WithLogging";
import { StyleSheetTestUtils } from "aphrodite";

// Empêche l'injection des styles dans le DOM lors des tests
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

describe("WithLogging HOC", () => {
  it("renders the wrapped component correctly", () => {
    const Wrapped = WithLogging(MockApp);
    render(<Wrapped />);
    expect(
      screen.getByText(/Hello from Mock App Component/i)
    ).toBeInTheDocument();
  });

  it("logs on mount and unmount", () => {
    const consoleLogSpy = jest.spyOn(console, "log");

    const Wrapped = WithLogging(MockApp);
    const { unmount } = render(<Wrapped />);

    expect(consoleLogSpy).toHaveBeenCalledWith("Component MockApp is mounted");

    unmount();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Component MockApp is going to unmount"
    );
  });

  it("uses default name if component name is missing", () => {
    const NamelessComponent = () => <p>Anonymous</p>;
    const Wrapped = WithLogging(NamelessComponent);
    render(<Wrapped />);
    expect(Wrapped.displayName).toBe("WithLogging(NamelessComponent)");
  });
});
