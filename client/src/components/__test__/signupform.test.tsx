import { fireEvent, render } from '@testing-library/react';
import SignupPopup from '../signupform';

test('renders SignupPopup component without crashing', () => {
    render(<SignupPopup onClose={() => { }} onLoginLinkClick={() => { }} />);
});

test('username input works correctly', () => {
    const { getByLabelText } = render(<SignupPopup onClose={() => { }} onLoginLinkClick={() => { }} />);
    const input = getByLabelText(/ชื่อผู้ใช้/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'testuser' } });
    expect(input.value).toBe('testuser');
});

test('email input works correctly', () => {
    const { getByLabelText } = render(<SignupPopup onClose={() => { }} onLoginLinkClick={() => { }} />);
    const input = getByLabelText(/อีเมล/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'testuser@example.com' } });
    expect(input.value).toBe('testuser@example.com');
});

test('password input works correctly', () => {
    const { getByLabelText } = render(<SignupPopup onClose={() => { }} onLoginLinkClick={() => { }} />);
    const input = getByLabelText(/รหัสผ่าน/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'testpassword' } });
    expect(input.value).toBe('testpassword');
});

test("should toggle to login form when login link is clicked", () => {
    const onClose = jest.fn();
    const onLoginLinkClick = jest.fn();
    const { getByLabelText, getByText } = render(
        <SignupPopup onClose={onClose} onLoginLinkClick={onLoginLinkClick} />
    );
    const loginLink = getByText("ลงชื่อเข้าใช้");
    fireEvent.click(loginLink);
    expect(onLoginLinkClick).toHaveBeenCalled();
});








