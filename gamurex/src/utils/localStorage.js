export const getFavourites = () => {
  return JSON.parse(localStorage.getItem("favourites")) || [];
};

export const addFavourite = (product) => {
  const favourites = getFavourites();
  const exists = favourites.some((item) => item.id === product.id);
  if (!exists) {
    localStorage.setItem(
      "favourites",
      JSON.stringify([...favourites, product])
    );
  }
};

export const removeFavourite = (id) => {
  const favourites = getFavourites();
  const updated = favourites.filter((item) => item.id !== id);
  localStorage.setItem("favourites", JSON.stringify(updated));
};

export const isFavourite = (id) => {
  const favourites = getFavourites();
  return favourites.some((item) => item.id === id);
};
