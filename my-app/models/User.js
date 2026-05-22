const users = [];
const favorites = {};

const User = {
  getAll: () => {
    return users;
  },
  create: (username, password) => {
    const user = { username, password };
    users.push(user);
    favorites[username] = [];
    return user;
  },

  find: (username) => {
    return users.find((user) => user.username === username);
  },

  addFavorite: (username, trackId) => {
    // Если у пользователя почему-то еще нет массива избранного, создаем его
    if (!favorites[username]) {
      favorites[username] = [];
    }
    if (!favorites[username].includes(trackId)) {
      favorites[username].push(trackId);
    }
  },

  removeFavorite: (username, trackId) => {
    if (!favorites[username]) {
      favorites[username] = [];
      return; 
    }

    const index = favorites[username].indexOf(trackId);
    if (index > -1) {
      favorites[username].splice(index, 1);
    }
  },

  getFavorites: (username) => {
    if (!favorites[username]) {
      favorites[username] = [];
    }
    return favorites[username];
  },
};

module.exports = User;
