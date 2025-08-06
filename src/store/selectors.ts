import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const getLatestAds = (state: RootState) => state.ads.data;

export const getMaxPrice = (state: RootState) => state.filters.maxPrice;

export function getAdDetail(adId?: string) {
  return function (state: RootState) {
    return state.ads.data.find((ad) => ad.id === adId);
  };
}

// NOTA:  getTags y se usa en la pagina principal!! y en la de creacion de un anuncio!!
export const getTags = (state: RootState) => state.tags.data;

export const getFilters = (state: RootState) => state.filters;
export const getFiltersName = (state: RootState) => state.filters.name;
export const getFiltersPrice = (state: RootState) => state.filters.price;
export const getFiltersSale = (state: RootState) => state.filters.sale;
export const getFiltersTags = (state: RootState) => state.filters.tags;
