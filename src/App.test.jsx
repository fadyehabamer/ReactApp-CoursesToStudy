import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import { STORAGE_KEY } from './storage';

beforeEach(() => localStorage.clear());

const addCourse = (name) => {
  fireEvent.change(screen.getByLabelText('Course name'), { target: { value: name } });
  fireEvent.click(screen.getByRole('button', { name: /add course/i }));
};
const saved = () => JSON.parse(localStorage.getItem(STORAGE_KEY)).map(c => c.name);

test('adds a trimmed course and persists it', () => {
  render(<App />);
  addCourse('  React  ');
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByLabelText('Course name')).toHaveValue('');
  expect(saved()).toEqual(['React']);
});

test('whitespace-only names are not added', () => {
  render(<App />);
  addCourse('   ');
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
});

test('deleting a course updates the list and storage', () => {
  render(<App />);
  addCourse('React');
  addCourse('Node');
  const reactRow = screen.getByText('React').closest('li');
  fireEvent.click(within(reactRow).getByRole('button', { name: /delete/i }));
  expect(screen.queryByText('React')).not.toBeInTheDocument();
  expect(saved()).toEqual(['Node']);
});

test('edit form stays on the right course when a course above it is deleted', () => {
  render(<App />);
  addCourse('React');
  addCourse('Node');
  addCourse('CSS');

  fireEvent.click(within(screen.getByText('Node').closest('li')).getByRole('button', { name: /edit/i }));
  fireEvent.click(within(screen.getByText('React').closest('li')).getByRole('button', { name: /delete/i }));

  // The edit input must still belong to "Node", and CSS must be untouched.
  const input = screen.getByLabelText('Edit Node');
  fireEvent.change(input, { target: { value: 'Node.js' } });
  fireEvent.submit(input.closest('form'));

  expect(saved()).toEqual(['Node.js', 'CSS']);
});

test('clearing a course while editing keeps its old name', () => {
  render(<App />);
  addCourse('React');
  fireEvent.click(screen.getByRole('button', { name: /edit/i }));
  const input = screen.getByLabelText('Edit React');
  fireEvent.change(input, { target: { value: '  ' } });
  fireEvent.submit(input.closest('form'));
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(saved()).toEqual(['React']);
});

test('loads previously saved courses', () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([{ name: 'Saved course' }]));
  render(<App />);
  expect(screen.getByText('Saved course')).toBeInTheDocument();
});
