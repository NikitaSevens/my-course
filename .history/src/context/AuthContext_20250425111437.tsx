import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'secret123';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Начальное значение: читаем из localStorage
    return localStorage.getItem('isAuth') === 'true';
  });

  useEffect(() => {
    const stored = localStorage.getItem('isAuth');
    setIsAuthenticated(stored === 'true');
  }, []);

  const login = (user: string, pass: string): boolean => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
