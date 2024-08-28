import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "sonner";

import LoginPage from "./LoginPage";

jest.mock("../../hooks/axios", () => ({
  __esModule: true,
  default: () => ({
    fetchData: jest.fn().mockResolvedValue({
      status: true,
      message: "User login successfully",
      data: {
        token: "auth token",
        userId: 1,
        name: "test",
      },
    }),
  }),
}));

jest.mock("../../hooks/UseAuth", () => ({
  __esModule: true,
  default: () => ({
    setAuth: jest.fn(),
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

test("email input should be rendered", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/test@domain.com/i);
  expect(emailInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("email input should be empty", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/test@domain.com/i);
  expect(emailInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should not be disabled", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toBeDisabled();
});

test("email input should change", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/test@domain.com/i);
  const testValue = "test";

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  expect(emailInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("email errors should be rendered when click", async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const buttonEl = screen.getByRole("button");
  const emailInputEl = screen.getByPlaceholderText(/test@domain.com/i);

  const testValue = "";

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const emailErrorEl = await screen.getByTestId("emailError");

  expect(emailErrorEl).toBeVisible();
  expect(emailErrorEl).toHaveTextContent(/Email is required!/i);
});

test("not a valid email errors should be rendered when click", async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const buttonEl = screen.getByRole("button");
  const emailInputEl = screen.getByPlaceholderText(/test@domain.com/i);

  const testValue = "johndoe";

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const emailErrorEl = await screen.getByTestId("emailError");

  expect(emailErrorEl).toBeVisible();
  expect(emailErrorEl).toHaveTextContent(/This is not Valid email format!/i);
});

test("password errors should be rendered when click", async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  const buttonEl = screen.getByRole("button");
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const emailErrorEl = await screen.getByTestId("passwordError");

  expect(emailErrorEl).toBeVisible();
  expect(emailErrorEl).toHaveTextContent(/Password is required!/i);
});

test("user should be navigate after login", async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  const buttonEl = screen.getByRole("button");
  const emailInputEl = screen.getByPlaceholderText(/test@domain.com/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const emailValue = "test@gmail.com";
  const passwordValue = "test";

  fireEvent.change(emailInputEl, { target: { value: emailValue } });
  fireEvent.change(passwordInputEl, { target: { value: passwordValue } });
  fireEvent.click(buttonEl);

  // Check toast and task fetching function
  await expect(toast.success).toHaveBeenCalledWith("User login successfully");
});
