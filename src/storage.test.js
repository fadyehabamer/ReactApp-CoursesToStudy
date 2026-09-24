import { loadCourses, saveCourses, STORAGE_KEY } from './storage';

beforeEach(() => localStorage.clear());

test('returns an empty list when nothing is saved', () => {
  expect(loadCourses()).toEqual([]);
});

test('returns an empty list instead of throwing on corrupt data', () => {
  localStorage.setItem(STORAGE_KEY, '{not json');
  expect(loadCourses()).toEqual([]);
  localStorage.setItem(STORAGE_KEY, '{"name":"not an array"}');
  expect(loadCourses()).toEqual([]);
});

test('drops malformed entries and gives legacy courses an id', () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([{ name: 'React' }, null, { foo: 1 }, { name: 'Node' }]));
  const courses = loadCourses();
  expect(courses.map(c => c.name)).toEqual(['React', 'Node']);
  expect(courses[0].id).toBeTruthy();
  expect(courses[0].id).not.toBe(courses[1].id);
});

test('round-trips saved courses', () => {
  saveCourses([{ id: 'a', name: 'CSS' }]);
  expect(loadCourses()).toEqual([{ id: 'a', name: 'CSS' }]);
});

test('storage failures do not throw', () => {
  const broken = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('quota'); } };
  expect(loadCourses(broken)).toEqual([]);
  expect(() => saveCourses([], broken)).not.toThrow();
});
