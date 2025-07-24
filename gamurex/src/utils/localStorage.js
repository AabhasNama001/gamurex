const STORAGE_KEY = "favourites";

export const getFavourites = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("[getFavourites] Failed to parse favourites:", error);
    return [];
  }
};

export const saveFavourites = (favourites) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  } catch (error) {
    console.error("[saveFavourites] Failed to save favourites:", error);
  }
};

export const addFavourite = (product) => {
  try {
    const favourites = getFavourites();
    const exists = favourites.some((item) => item.id === product.id);
    if (!exists) {
      const updated = [...favourites, product];
      saveFavourites(updated);
      return updated;
    }
    return favourites;
  } catch (error) {
    console.error("[addFavourite] Failed to add favourite:", error);
    return getFavourites();
  }
};

export const removeFavourite = (id) => {
  try {
    const favourites = getFavourites();
    const updated = favourites.filter((item) => item.id !== id);
    saveFavourites(updated);
    return updated;
  } catch (error) {
    console.error("[removeFavourite] Failed to remove favourite:", error);
    return getFavourites();
  }
};

export const isFavourite = (id) => {
  try {
    const favourites = getFavourites();
    return favourites.some((item) => item.id === id);
  } catch (error) {
    console.error("[isFavourite] Failed to check favourite status:", error);
    return false;
  }
};
