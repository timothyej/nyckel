export const SHOW_PASSWORD = 'SHOW_PASSWORD';

export function showPassword(password) {
  return {
    type: SHOW_PASSWORD,
    password
  };
}
