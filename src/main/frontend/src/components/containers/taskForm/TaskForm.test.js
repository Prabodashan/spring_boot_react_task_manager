import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskForm from "./TaskForm";

// Mock dependencies
jest.mock("../../../hooks/axios");
jest.mock("../../../hooks/UseAuth");
jest.mock("sonner");

// Mock useAxios hook
jest.mock("./../../../hooks/axios", () => ({
  __esModule: true,
  default: () => ({
    fetchData: jest.fn().mockResolvedValue({
      status: true,
      message: "Task deleted successfully",
    }),
  }),
}));

jest.mock("./../../../hooks/UseAuth", () => ({
  __esModule: true,
  default: () => ({
    auth: {
      token: "dummy-token",
      userId: 1,
    },
  }),
}));

const onClose = jest.fn();
const getTask = jest.fn();
const setEditTaskId = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders TaskForm for creating a new task", () => {
  render(
    <TaskForm
      open={true}
      onClose={onClose}
      getTask={getTask}
      setEditTaskId={setEditTaskId}
    />
  );

  expect(screen.getByText("Create New Task")).toBeInTheDocument();
  expect(screen.getByText(/Title/)).toBeInTheDocument();
  expect(screen.getByText(/Description/)).toBeInTheDocument();
  expect(screen.getByText(/Category/)).toBeInTheDocument();
  expect(screen.getByText(/Priority/)).toBeInTheDocument();
  expect(screen.getByText(/Status/)).toBeInTheDocument();
  expect(screen.getByText(/Due Date/)).toBeInTheDocument();
});

test("shows validation errors when fields are empty", async () => {
  render(
    <TaskForm
      open={true}
      onClose={onClose}
      getTask={getTask}
      setEditTaskId={setEditTaskId}
    />
  );

  const buttonEl = screen.getByRole("button");

  fireEvent.click(buttonEl);

  expect(await screen.findByText("Title is required!")).toBeInTheDocument();
  expect(
    await screen.findByText("Description is required!")
  ).toBeInTheDocument();
  expect(await screen.findByText("Due Date is required!")).toBeInTheDocument();
});

test("closes the form on close button click", () => {
  render(
    <TaskForm
      open={true}
      onClose={onClose}
      getTask={getTask}
      setEditTaskId={setEditTaskId}
    />
  );

  fireEvent.click(screen.getByText("X"));

  expect(onClose).toHaveBeenCalled();
});
