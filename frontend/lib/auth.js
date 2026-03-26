export const saveAuth = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.token);

    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    } else if (data.role) {
      localStorage.setItem('user', JSON.stringify({ role: data.role }));
    }
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const isAdmin = () => {
  return getUserRole() === 'admin';
};

export const isUser = () => {
  return getUserRole() === 'user';
};

export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};