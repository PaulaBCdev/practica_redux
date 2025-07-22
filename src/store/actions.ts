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

export type Actions =
  | AuthLoginPending
  | AuthLoginFulfilled
  | AuthLoginRejected
  | AuthLogout;
