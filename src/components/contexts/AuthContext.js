import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверка токена в localStorage
    const token = localStorage.getItem('davayberi_token');
    const userData = localStorage.getItem('davayberi_user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Здесь будет запрос к API
    const mockUser = {
      id: 1,
      name: 'Александр Петров',
      email: credentials.email || 'user@example.com',
      phone: credentials.phone || '+79991234567',
      rating: 4.8,
      isVerified: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    };

    localStorage.setItem('davayberi_token', 'mock_token');
    localStorage.setItem('davayberi_user', JSON.stringify(mockUser));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    return mockUser;
  };

  const register = async (userData) => {
    // Здесь будет запрос к API
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      rating: 5.0,
      isVerified: false,
      avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random&color=fff&size=64`
    };

    localStorage.setItem('davayberi_token', 'mock_token');
    localStorage.setItem('davayberi_user', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('davayberi_token');
    localStorage.removeItem('davayberi_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('davayberi_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    return updatedUser;
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}