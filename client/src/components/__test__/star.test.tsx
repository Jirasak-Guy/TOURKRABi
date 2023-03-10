import { render } from '@testing-library/react';
import StarRating from '../star';

test('renders 0 stars when rating is 0', () => {
    const { container } = render(<StarRating rating={0} />);
    expect(container.querySelectorAll('.MuiSvgIcon-root').length).toBe(0);
});

test('renders 1 stars when rating is 1', () => {
    const { container } = render(<StarRating rating={1} />);
    expect(container.querySelectorAll('.MuiSvgIcon-root').length).toBe(1);
});

test('renders 2 stars when rating is 2', () => {
    const { container } = render(<StarRating rating={2} />);
    expect(container.querySelectorAll('.MuiSvgIcon-root').length).toBe(2);
});

test('renders 3 star when rating is 3', () => {
    const { container } = render(<StarRating rating={3} />);
    expect(container.querySelectorAll('.MuiSvgIcon-root').length).toBe(3);
});

test('renders 4 stars when rating is 4', () => {
    const { container } = render(<StarRating rating={4} />);
    expect(container.querySelectorAll('.MuiSvgIcon-root').length).toBe(4);
});

test('renders 5 stars when rating is 5', () => {
    const { container } = render(<StarRating rating={5} />);
    expect(container.querySelectorAll('.MuiSvgIcon-root').length).toBe(5);
});

test('renders 6 stars when rating is 6', () => {
    const { container } = render(<StarRating rating={6} />);
    expect(container.querySelectorAll('.MuiSvgIcon-root').length).toBe(5);
});