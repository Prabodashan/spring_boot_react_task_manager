import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "sonner";

import TaskCard from "./TaskCard";

const mockItem = {
  id: 1,
  title: "Test Task",
  description: "This is a test task description.",
  dueDate: "2024-08-27",
  category: "Work",
  priority: "High",
  status: "In Progress",
};

jest.mock("./../../../hooks/UseAuth", () => ({
  __esModule: true,
  default: () => ({
    auth: {
      token: "dummy-token",
    },
  }),
}));

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

jest.mock("react-confirm-alert", () => ({
  confirmAlert: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockOnOpen = jest.fn();
const mockOnEdit = jest.fn();
const mockSetViewTaskId = jest.fn();
const mockSetEditTaskId = jest.fn();
const mockGetTask = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test("TaskCard should be rendered with the correct information", () => {
  render(
    <MemoryRouter>
      <TaskCard
        item={mockItem}
        onOpen={mockOnOpen}
        onEdit={mockOnEdit}
        setViewTaskId={mockSetViewTaskId}
        setEditTaskId={mockSetEditTaskId}
        getTask={mockGetTask}
      />
    </MemoryRouter>
  );
  expect(screen.getByText(mockItem.title)).toBeInTheDocument();
  expect(
    screen.getByText(`Due Date : ${mockItem.dueDate}`)
  ).toBeInTheDocument();
  expect(screen.getByText(mockItem.category)).toBeInTheDocument();
  expect(screen.getByText(mockItem.priority)).toBeInTheDocument();
  expect(screen.getByText(mockItem.status)).toBeInTheDocument();
  expect(screen.getByText(mockItem.description)).toBeInTheDocument();
});

test("renders the view button", () => {
  render(
    <MemoryRouter>
      <TaskCard
        item={mockItem}
        onOpen={mockOnOpen}
        onEdit={mockOnEdit}
        setViewTaskId={mockSetViewTaskId}
        setEditTaskId={mockSetEditTaskId}
        getTask={mockGetTask}
      />
    </MemoryRouter>
  );

  const viewButton = screen.getByAltText("view");
  expect(viewButton).toBeInTheDocument();
});

test("renders the edit button", () => {
  render(
    <MemoryRouter>
      <TaskCard
        item={mockItem}
        onOpen={mockOnOpen}
        onEdit={mockOnEdit}
        setViewTaskId={mockSetViewTaskId}
        setEditTaskId={mockSetEditTaskId}
        getTask={mockGetTask}
      />
    </MemoryRouter>
  );

  const editButton = screen.getByAltText("edit");
  expect(editButton).toBeInTheDocument();
});

test("renders the delete button", () => {
  render(
    <MemoryRouter>
      <TaskCard
        item={mockItem}
        onOpen={mockOnOpen}
        onEdit={mockOnEdit}
        setViewTaskId={mockSetViewTaskId}
        setEditTaskId={mockSetEditTaskId}
        getTask={mockGetTask}
      />
    </MemoryRouter>
  );

  const deleteButton = screen.getByAltText("delete");
  expect(deleteButton).toBeInTheDocument();
});

test("calls setViewTaskId and onOpen when the view button is clicked", () => {
  render(
    <MemoryRouter>
      <TaskCard
        item={mockItem}
        onOpen={mockOnOpen}
        onEdit={mockOnEdit}
        setViewTaskId={mockSetViewTaskId}
        setEditTaskId={mockSetEditTaskId}
        getTask={mockGetTask}
      />
    </MemoryRouter>
  );

  const viewButton = screen.getByAltText("view");
  fireEvent.click(viewButton);

  expect(mockSetViewTaskId).toHaveBeenCalledWith(mockItem.id);
  expect(mockOnOpen).toHaveBeenCalled();
});

test("calls setEditTaskId and onEdit when the edit button is clicked", () => {
  render(
    <MemoryRouter>
      <TaskCard
        item={mockItem}
        onOpen={mockOnOpen}
        onEdit={mockOnEdit}
        setViewTaskId={mockSetViewTaskId}
        setEditTaskId={mockSetEditTaskId}
        getTask={mockGetTask}
      />
    </MemoryRouter>
  );

  const editButton = screen.getByAltText("edit");
  fireEvent.click(editButton);

  expect(mockSetEditTaskId).toHaveBeenCalledWith(mockItem.id);
  expect(mockOnEdit).toHaveBeenCalled();
});

test("opens confirm dialog and handles delete task correctly", async () => {
  render(
    <MemoryRouter>
      <TaskCard
        item={mockItem}
        onOpen={mockOnOpen}
        onEdit={mockOnEdit}
        setViewTaskId={mockSetViewTaskId}
        setEditTaskId={mockSetEditTaskId}
        getTask={mockGetTask}
      />
    </MemoryRouter>
  );

  const deleteButton = screen.getByAltText("delete");
  fireEvent.click(deleteButton);

  // Confirm alert should be called
  expect(confirmAlert).toHaveBeenCalled();

  // Simulate the confirm dialog positive action
  const confirmAlertButtons = confirmAlert.mock.calls[0][0].buttons;
  await confirmAlertButtons[0].onClick();

  await expect(mockGetTask).toHaveBeenCalled();
  expect(toast.success).toHaveBeenCalledWith("Task deleted successfully");
});

test("does not delete the task if cancel is clicked in confirm dialog", async () => {
  render(
    <MemoryRouter>
      <TaskCard
        item={mockItem}
        onOpen={mockOnOpen}
        onEdit={mockOnEdit}
        setViewTaskId={mockSetViewTaskId}
        setEditTaskId={mockSetEditTaskId}
        getTask={mockGetTask}
      />
    </MemoryRouter>
  );

  const deleteButton = screen.getByAltText("delete");
  fireEvent.click(deleteButton);

  // Confirm alert should be called
  expect(confirmAlert).toHaveBeenCalled();

  // Simulate the confirm dialog positive action
  const confirmAlertButtons = confirmAlert.mock.calls[0][0].buttons;
  await confirmAlertButtons[1].onClick();

  // Verify fetchData was not called
  expect(mockGetTask).not.toHaveBeenCalled();
  expect(toast.success).not.toHaveBeenCalled();
});
