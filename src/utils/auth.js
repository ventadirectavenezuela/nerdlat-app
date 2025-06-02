const AUTH_KEYS = {
  USER_DATA: 'currentUserData',
  AUTH_TOKEN: 'authToken',
};

const Auth = {
  // Simula la generación de un token simple
  generateToken: (userId) => {
    return `token-${userId}-${Date.now()}`;
  },

  // Guarda los datos del usuario y el token en localStorage
  login: (user, token) => {
    localStorage.setItem(AUTH_KEYS.USER_DATA, JSON.stringify({
      id: user.id,
      nombre: user.nombre,
      email: user.correo,
      rol: user.rol
    }));
    localStorage.setItem(AUTH_KEYS.AUTH_TOKEN, token);
  },

  // Obtiene los datos del usuario de localStorage
  getCurrentUser: () => {
    const userData = localStorage.getItem(AUTH_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  // Obtiene el token de localStorage
  getToken: () => {
    return localStorage.getItem(AUTH_KEYS.AUTH_TOKEN);
  },

  // Cierra la sesión borrando los datos de localStorage
  logout: () => {
    localStorage.removeItem(AUTH_KEYS.USER_DATA);
    localStorage.removeItem(AUTH_KEYS.AUTH_TOKEN);
  },

  // Verifica si hay una sesión activa
  isAuthenticated: () => {
    return !!Auth.getToken() && !!Auth.getCurrentUser();
  }
};

export default Auth;