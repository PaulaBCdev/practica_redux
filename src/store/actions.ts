import type { AppThunk } from ".";
import type { AdvertType } from "../pages/ads/types";
import { login } from "../pages/auth/service";
import type { Credentials } from "../pages/auth/types";

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

type AdsLoadedFulfilled = {
  type: "ads/loaded/fulfilled";
  payload: AdvertType[];
};

type AdCreatedFulfilled = {
  type: "ads/created/fulfilled";
  payload: AdvertType;
};

// ACTIONS

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
  return async function (dispatch) {
    dispatch(authLoginPending());
    try {
      await login(credentials, isChecked);
      dispatch(authLoginFulfilled());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
};

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout
  | AdsLoadedFulfilled
  | AdCreatedFulfilled;
