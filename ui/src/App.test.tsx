import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders hello, there", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/hello, there/i);
  expect(linkElement).toBeInTheDocument();
});
