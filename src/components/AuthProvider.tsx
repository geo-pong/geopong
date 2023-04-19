import React, { createContext, useContext, useState } from 'react';

interface AuthState {
  jwt: string | null;
}

const initialState: AuthState = {
  jwt: null,
};

export const AuthContext = createContext<[AuthState, React.Dispatch<React.SetStateAction<AuthState>>]>([
  initialState,
  () => {},
]);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  return <AuthContext.Provider value={[authState, setAuthState]}>{children}</AuthContext.Provider>;
};
