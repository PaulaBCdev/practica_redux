import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export function getAdDetail(adId?: string) {
  return function (state: RootState) {
    return state.ads.data.find((ad) => ad.id === adId);
  };
}
