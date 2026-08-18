const AUTH_KEY = "cendekia_medika_auth";

export function loginUser(username) {
  const user = {
    username,
    name: "Nurse Staff",
    role: "Registered Nurse",
  };

  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify(user)
  );

  return user;
}

export function getCurrentUser() {
  const storedUser = localStorage.getItem(AUTH_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}