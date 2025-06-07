const Storage = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage', error);
      return false;
    }
  },

  remove: (key) => {
    localStorage.removeItem(key);
  }
};

export default Storage;