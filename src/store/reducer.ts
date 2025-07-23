import type { AdvertType } from "../pages/ads/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  ads: AdvertType[] | null;
};

const defautlState: State = {
  auth: false,
  ads: null,
};

export function auth(
  state = defautlState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

export function ads(state = defautlState.ads, action: Actions): State["ads"] {
  switch (action.type) {
    case "ads/loaded/fulfilled":
      return action.payload;
    case "ads/created/fulfilled":
      return [action.payload, ...(state ?? [])];

    default:
      return state;
  }
}
