import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

it('renders the SearchBar component with given props and handles input change', async () => {
  const mockOnChange = jest.fn();
  const { getByPlaceholderText } = render(<SearchBar value="" onChange={mockOnChange} />);

  const input = getByPlaceholderText('Search...') as HTMLInputElement;

  // Wrap the fireEvent.change in act()
  await act(async () => {
    fireEvent.change(input, { target: { value: 'test' } });
  });

  await waitFor(() => {
    expect(input).toHaveValue('test');
  });
  expect(mockOnChange).toHaveBeenCalled();

  // Check if the value in the event object is correct
  const event = mockOnChange.mock.calls[0][0];
  expect(event.target.value).toBe('test');
});
