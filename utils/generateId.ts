export function generateId() {
  const { crypto } = window;
  const array = new Uint32Array(1);
  return crypto.getRandomValues(array);
}