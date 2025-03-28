// This is a unit test program to test UEENValidation
import { render, screen, fireEvent } from '@testing-library/react';
import UENValidation from '../UENValidation';
import '@testing-library/jest-dom'; //importing jest-dom manually into test file, ensure jest-dom is imported indeed

describe('UENValidation Component', () => {
  test('validates Business UEN format (8 digits + 1 letter)', () => {
    render(<UENValidation />);

    const input = screen.getByPlaceholderText(/Enter UEN/i);
    const button = screen.getByText(/Validate/i);

    // Valid UEN example: 12345678A
    fireEvent.change(input, { target: { value: '12345678A' } });
    fireEvent.click(button);

    expect(screen.getByText(/Valid UEN!/i)).toBeInTheDocument();
  });

  test('validates Local Company UEN format (4 digits + 5 digits + 1 letter)', () => {
    render(<UENValidation />);

    const input = screen.getByPlaceholderText(/Enter UEN/i);
    const button = screen.getByText(/Validate/i);

    // Valid UEN example: 199012345X
    fireEvent.change(input, { target: { value: '199012345X' } });
    fireEvent.click(button);
    // Expect success message to appear in the document
    expect(screen.getByText(/Valid UEN!/i)).toBeInTheDocument();
  });

  test('validates Other Entities UEN format (Tyy + PQ + 4 digits + 1 letter)', () => {
    render(<UENValidation />);

    const input = screen.getByPlaceholderText(/Enter UEN/i);
    const button = screen.getByText(/Validate/i);

    // Valid UEN example: T08LL1234A
    fireEvent.change(input, { target: { value: 'T08LL1234A' } });
    fireEvent.click(button);

    expect(screen.getByText(/Valid UEN!/i)).toBeInTheDocument();
  });

  test('shows error for invalid UEN format', () => {
    render(<UENValidation />);

    const input = screen.getByPlaceholderText(/Enter UEN/i);
    const button = screen.getByText(/Validate/i);

    // Invalid UEN example: 1234
    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.click(button);

    expect(screen.getByText(/Invalid UEN format./i)).toBeInTheDocument();
  });
});
