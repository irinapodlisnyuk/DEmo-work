const { tracks, podcasts } = require("../data/tracks");
const User = require("../models/User");

const getTracks = (req, res) => {
  res.json(tracks);
};

const getPodcasts = (req, res) => {
  res.json(podcasts);
};

const addToFavorites = (req, res) => {
  const { trackId, type } =req.body;
  const username = req.user.username;

  // User.addFavorite(username, trackId);
  // res.json({ message: "композиция добавлена в избранное" });

  // Можно сохранять в базу строку вида "track_1" или "podcast_1"
  const addId = `${type}_${trackId}`;
  User.addFavorite(username,  addId);

  res.json({ message: "Добавлено в избранное" });
};

const removeFromFavorites = (req, res) => {
  const { trackId, type } = req.body;
  const username = req.user.username;

  //User.removeFavorite(username, trackId);

  const removeId = `${type}_${trackId}`;
  User.removeFavorite(username, removeId);

  res.json({ message: "композиция убрана из избранного" });
};

// const getFavorites = (req, res) => {
//   const username = req.user.username;
//   const favoriteTracks = User.getFavorites(username);

//   const favoriteTrackDetails = tracks.filter((track) =>
//     favoriteTracks.includes(track.id)
//   );
//   res.json(favoriteTrackDetails);
// };
const getFavorites = (req, res) => {
  const username = req.user.username;
  const favoriteIds = User.getFavorites(username); // Получаем массив вида ["track_1", "podcast_5"]

  const favoriteDetails = [];

  favoriteIds.forEach(favId => {
    // Разделяем строку обратно на тип и id
    const [type, id] = favId.split('_'); 
    const numericId = Number(id);

    if (type === 'track') {
      const track = tracks.find(t => t.id === numericId);
      if (track) favoriteDetails.push({ ...track, type: 'track' });
    } else if (type === 'podcast') {
      const podcast = podcasts.find(p => p.id === numericId);
      if (podcast) favoriteDetails.push({ ...podcast, type: 'podcast' });
    }
  });

  res.json(favoriteDetails);
};

module.exports = {
  getTracks,
  getPodcasts,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
};
