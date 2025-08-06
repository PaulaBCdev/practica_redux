import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";
import type { AdvertType } from "../pages/ads/types";
import type { Credentials } from "../pages/auth/types";
import {
  adCreate,
  adsLoaded,
  authLogin,
  authLogout,
  fetchTags,
  filtersReset,
  uiResetError,
} from "./actions";
import { getFilters, getIsLogged, getLatestAds, getTags } from "./selectors";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

export function useLoginAction() {
  const dispatch = useAppDispatch();
  return function (credentials: Credentials, isChecked: boolean) {
    return dispatch(authLogin(credentials, isChecked));
  };
}

export function useLogoutAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLogout());
  };
}

export function useAdCreate() {
  const dispatch = useAppDispatch();
  return async function (adContent: FormData): Promise<AdvertType> {
    return await dispatch(adCreate(adContent));
  };
}

export function useAdsLoaded() {
  const dispatch = useAppDispatch();
  const ads = useAppSelector(getLatestAds);

  useEffect(() => {
    dispatch(adsLoaded());
  }, [dispatch]);

  return ads;
}

export function useFetchTags() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(getTags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return tags;
}

export function useFilters() {
  const dispatch = useAppDispatch();
  const appliedFilters = useAppSelector(getFilters);
  const adsList = useAppSelector(getLatestAds);

  const applyFilters = () => {
    const filteredAds = adsList.filter((ad) => {
      const nameMatches = appliedFilters.name
        ? ad.name.toLowerCase().startsWith(appliedFilters.name.toLowerCase())
        : true;
      const priceMatches = appliedFilters.price
        ? appliedFilters.price[0] <= ad.price &&
          appliedFilters.price[1] >= ad.price
        : true;
      const saleMatches =
        appliedFilters.sale !== null ? ad.sale === appliedFilters.sale : true;
      let tagsMatches = true;
      if (appliedFilters.tags?.length) {
        appliedFilters.tags.forEach((tag) => {
          if (!ad.tags.includes(tag)) {
            tagsMatches = false;
          }
        });
      }
      return nameMatches && priceMatches && saleMatches && tagsMatches;
    });

    return filteredAds.reverse();
  };

  const resetFilters = () => {
    dispatch(filtersReset());
  };

  return { applyFilters, resetFilters };
}

export function useUiResetError() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(uiResetError);
  };
}
