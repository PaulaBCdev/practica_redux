import { AxiosError } from "axios";
import type { AppThunk } from ".";
import type { AdvertType } from "../pages/ads/types";
import type { Credentials } from "../pages/auth/types";
import { getAdDetail } from "./selectors";

// ACTION TYPES

type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
};

type AuthLogout = {
  type: "auth/logout";
};

type AdsLoadedPending = {
  type: "ads/loaded/pending";
};

type AdsLoadedFulfilled = {
  type: "ads/loaded/fulfilled";
  payload: AdvertType[];
};

type AdsLoadedRejected = {
  type: "ads/loaded/rejected";
  payload: Error;
};

type AdsDetailPending = {
  type: "ads/detail/pending";
};

type AdsDetailFulfilled = {
  type: "ads/detail/fulfilled";
  payload: AdvertType;
};

type AdsDetailRejected = {
  type: "ads/detail/rejected";
  payload: Error;
};

type AdsDelete = {
  type: "ads/delete";
  payload: string;
};

type AdCreatedFulfilled = {
  type: "ads/created/fulfilled";
  payload: AdvertType;
};

// AUTH ACTIONS

export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

export const authLogin = (
  credentials: Credentials,
  isChecked: boolean,
): AppThunk<Promise<void>> => {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());
    try {
      await api.auth.login(credentials, isChecked);
      dispatch(authLoginFulfilled());
      //Navigation
      const to = router.state.location.state?.from ?? "/";
      router.navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
};

export const authLogout = (): AppThunk<Promise<void>> => {
  return async function (dispatch, _getState, { api }) {
    await api.auth.logout();
    dispatch({ type: "auth/logout" });
  };
};

// ADS ACTIONS

export const adsLoadedPending = (): AdsLoadedPending => ({
  type: "ads/loaded/pending",
});

export const adsLoadedFulfilled = (ads: AdvertType[]): AdsLoadedFulfilled => ({
  type: "ads/loaded/fulfilled",
  payload: ads,
});

export const adsLoadedRejected = (error: Error): AdsLoadedRejected => ({
  type: "ads/loaded/rejected",
  payload: error,
});

export function adsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (state.ads.loaded) {
      return;
    }

    try {
      dispatch(adsLoadedPending());

      const ads = await api.ads.getLatestAdverts();
      dispatch(adsLoadedFulfilled(ads));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(adsLoadedRejected(error));
      }
      throw error;
    }
  };
}

export const adsDetailPending = (): AdsDetailPending => ({
  type: "ads/detail/pending",
});

export const adsDetailFulfilled = (ad: AdvertType): AdsDetailFulfilled => ({
  type: "ads/detail/fulfilled",
  payload: ad,
});

export const adsDetailRejected = (error: AxiosError): AdsDetailRejected => ({
  type: "ads/detail/rejected",
  payload: error,
});

export function adsDetail(adId: string): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api, router }) {
    const state = getState();
    if (getAdDetail(adId)(state)) {
      return;
    }

    try {
      dispatch(adsDetailPending());

      const ad = await api.ads.getAdvert(adId);
      dispatch(adsDetailFulfilled(ad));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(adsDetailRejected(error));
        if (error.status === 404) {
          router.navigate("/NotFoundPage", { replace: true });
        }
      }

      throw error;
    }
  };
}

export function adDelete(adId: string): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    await api.ads.deleteAdvert(adId);
    dispatch({ type: "ads/delete", payload: adId });
    router.navigate("/", { replace: true });
  };
}

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | AdsLoadedPending
  | AdsLoadedFulfilled
  | AdsLoadedRejected
  | AdsDetailPending
  | AdsDetailFulfilled
  | AdsDetailRejected
  | AdsDelete
  | AdCreatedFulfilled;
