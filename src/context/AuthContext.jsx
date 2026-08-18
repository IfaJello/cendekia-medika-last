import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("cm_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(username, password) {
    if (username === "nurse" && password === "nurse123") {
      const userData = {
        username: "nurse",
        name: "Nurse Staff",
        role: "Registered Nurse",
      };

      localStorage.setItem("cm_user", JSON.stringify(userData));
      setUser(userData);

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: "Invalid username or password.",
    };
  }

  function logout() {
    localStorage.removeItem("cm_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;