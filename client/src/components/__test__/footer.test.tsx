import { cleanup, render } from '@testing-library/react';
import Footer from '../footer';

describe('Footer component', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render correctly', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should have a footer-container class', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toHaveClass('footer-container');
  });

  test('should display the copyright text', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Copyright')).toBeInTheDocument();
  });

  it('should display the correct copyright year', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('2023 TOURKRABi')).toBeInTheDocument();
  });

  test('should display the copyright image', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('.copyright-image'))
      .toBeInTheDocument();
  });
});
