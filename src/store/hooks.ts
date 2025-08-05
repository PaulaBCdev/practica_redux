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
} from "./actions";
import { getIsLogged, getLatestAds, getTags } from "./selectors";

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

export function useGetAds() {
  const dispatch = useAppDispatch();
  const ads = useAppSelector(getLatestAds);

  useEffect(() => {
    dispatch(adsLoaded());
  }, []);
}

export function useAdCreate() {
  const dispatch = useAppDispatch();
  return async function (adContent: FormData): Promise<AdvertType> {
    return await dispatch(adCreate(adContent));
  };
}

export function useFetchTags() {
  const dispatch = useAppDispatch();
  const tags = useAppSelector(getTags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return tags;
}
