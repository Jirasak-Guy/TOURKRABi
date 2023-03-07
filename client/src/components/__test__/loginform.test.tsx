import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPopup from "../loginform";

afterEach(() => {
  cleanup();
});

test("renders LoginPopup component without crashing", () => {
  render(<LoginPopup onClose={() => { }} onSignupLinkClick={() => { }} />);
});

test("updates email input value on change", () => {
  render(<LoginPopup onClose={() => { }} onSignupLinkClick={() => { }} />);
  const emailInput = screen.getByPlaceholderText(/อีเมลของคุณ/i) as HTMLInputElement;
  userEvent.type(emailInput, "test@example.com");
  expect(emailInput).toHaveValue("test@example.com");
});

test("updates password input value on change", () => {
  render(<LoginPopup onClose={() => { }} onSignupLinkClick={() => { }} />);
  const passwordInput = screen.getByPlaceholderText(/รหัสผ่านของคุณ/i) as HTMLInputElement;
  userEvent.type(passwordInput, "password123");
  expect(passwordInput).toHaveValue("password123");
});

test("should display error message for incomplete information", async () => {
  const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => { });
  render(<LoginPopup onClose={() => { }} onSignupLinkClick={() => { }} />);
  const loginButton = screen.getByTestId("login-button");
  userEvent.click(loginButton);
  await waitFor(() => {
    expect(mockAlert).toHaveBeenCalledWith("Please complete the information.");
  });
  mockAlert.mockRestore();
});

test("clicking on Sign up link triggers onSignupLinkClick function prop", () => {
  const mockSignupLinkClick = jest.fn();
  render(<LoginPopup onClose={() => { }} onSignupLinkClick={mockSignupLinkClick} />);
  const signupLink = screen.getByText(/สมัครสมาชิก/i);
  userEvent.click(signupLink);
  expect(mockSignupLinkClick).toHaveBeenCalledTimes(1);
});