// favorites.js
const FAVORITES_KEY = "favorites";

/**
 * Get the favorites array from local storage.
 */
export function getFavorites() {
  const favs = localStorage.getItem(FAVORITES_KEY);
  return favs ? JSON.parse(favs) : [];
}

/**
 * Save the given favorites array to local storage.
 */
export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/**
 * Add a coin to the favorites.
 */
export function addFavorite(coin) {
  const favorites = getFavorites();
  if (!favorites.some((fav) => fav.id === coin.id)) {
    favorites.push(coin);
    saveFavorites(favorites);
  }
  return favorites;
}

/**
 * Remove a coin from the favorites by its id.
 */
export function removeFavorite(coinId) {
  let favorites = getFavorites();
  favorites = favorites.filter((fav) => fav.id !== coinId);
  saveFavorites(favorites);
  return favorites;
}

/**
 * Toggle a coin in the favorites.
 * If the coin is already favorited, remove it; otherwise, add it.
 * Returns the updated favorites array.
 */
export function toggleFavorite(coin) {
  let favorites = getFavorites();
  if (favorites.some((fav) => fav.id === coin.id)) {
    favorites = favorites.filter((fav) => fav.id !== coin.id);
  } else {
    favorites.push(coin);
  }
  saveFavorites(favorites);
  return favorites;
}

/**
 * Check if a coin is favorited.
 */
export function isFavorite(coinId) {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === coinId);
}