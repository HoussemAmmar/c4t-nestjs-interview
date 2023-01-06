export function getRandomString(n: number): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < n; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
}
