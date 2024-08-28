import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RegisterPage from "./RegisterPage";

import { toast } from "sonner";

jest.mock("../../hooks/axios", () => ({
  __esModule: true,
  default: () => ({
    fetchData: jest.fn().mockResolvedValue({
      status: true,
      message: "User registered successfully",
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

test("name input should be rendered", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const namenputEl = screen.getByPlaceholderText(/johndoe/i);
  expect(namenputEl).toBeInTheDocument();
});

test("email input should be rendered", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/janedoe@domain.com/i);
  expect(emailInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("name input should be empty", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const nameInputEl = screen.getByPlaceholderText(/johndoe/i);
  expect(nameInputEl.value).toBe("");
});

test("email input should be empty", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/janedoe@domain.com/i);
  expect(emailInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should not be disabled", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toBeDisabled();
});

test("name input should change", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const nameInputEl = screen.getByPlaceholderText(/johndoe/i);
  const testValue = "test";

  fireEvent.change(nameInputEl, { target: { value: testValue } });
  expect(nameInputEl.value).toBe(testValue);
});

test("email input should change", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const emailInputEl = screen.getByPlaceholderText(/janedoe@domain.com/i);
  const testValue = "test";

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  expect(emailInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("name errors should be rendered when click", async () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const buttonEl = screen.getByRole("button");
  const nameInputEl = screen.getByPlaceholderText(/johndoe/i);

  const testValue = "";

  fireEvent.change(nameInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const emailErrorEl = await screen.getByTestId("nameError");

  expect(emailErrorEl).toBeVisible();
  expect(emailErrorEl).toHaveTextContent(/Full Name is required!/i);
});

test("email errors should be rendered when click", async () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
  const buttonEl = screen.getByRole("button");
  const emailInputEl = screen.getByPlaceholderText(/janedoe@domain.com/i);

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
      <RegisterPage />
    </MemoryRouter>
  );
  const buttonEl = screen.getByRole("button");
  const emailInputEl = screen.getByPlaceholderText(/janedoe@domain.com/i);

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
      <RegisterPage />
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

test("user should be navigate after register", async () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );

  const buttonEl = screen.getByRole("button");
  const nameInputEl = screen.getByPlaceholderText(/johndoe/i);
  const emailInputEl = screen.getByPlaceholderText(/janedoe@domain.com/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const nameValue = "test";
  const emailValue = "test@gmail.com";
  const passwordValue = "test";

  fireEvent.change(nameInputEl, { target: { value: nameValue } });
  fireEvent.change(emailInputEl, { target: { value: emailValue } });
  fireEvent.change(passwordInputEl, { target: { value: passwordValue } });
  fireEvent.click(buttonEl);

  // Check toast and task fetching function
  await expect(toast.success).toHaveBeenCalledWith(
    "User registered successfully"
  );
  
});
