import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const getLatestAds = (state: RootState) => state.ads.data;

export const getMaxPrice = (state: RootState) => state.filters.maxPrice;

export function getAdDetail(adId?: string) {
  return function (state: RootState) {
    return state.ads.data.find((ad) => ad.id === adId);
  };
}

export const getTags = (state: RootState) => state.tags.data;

export const getFilters = (state: RootState) => state.filters;

export const getUi = (state: RootState) => state.ui;
