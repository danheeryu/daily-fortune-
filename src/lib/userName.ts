const USER_NAME_KEY = "fortune-user-name";

export function getStoredUserName(): string | null {
  return window.localStorage.getItem(USER_NAME_KEY);
}

export function setStoredUserName(name: string) {
  window.localStorage.setItem(USER_NAME_KEY, name);
}
