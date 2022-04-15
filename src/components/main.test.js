import React from "react";
import ReactDOM from "react-dom";
import Main from "./main";
import { render, screen } from "@testing-library/react";
import event from "@testing-library/user-event";

describe("Main component", () => {
  test("should render todo component", () => {
    render(<Main />);
    const todoElement = screen.getByTestId("todo-1");
    expect(todoElement).toBeInTheDocument();
  });

  test("should be empty when initialized", () => {
    render(<Main />);
    const todos = screen.queryAllByTestId("todo");
    expect(todos).toHaveLength(0);
  });

  test("can add new todo", () => {
    render(<Main />);

    const nameInput = screen.queryByTestId("name-input");
    const textInput = screen.queryByTestId("text-input");
    const submitButton = screen.queryByTestId("submit-button");

    expect(screen.queryAllByTestId("todo")).toHaveLength(0);

    event.type(nameInput, "First todo title");
    console.log(nameInput);

    event.type(textInput, "First todo text");
    event.click(submitButton);

    expect(screen.queryAllByTestId("todo")).toHaveLength(1);
  });
});
