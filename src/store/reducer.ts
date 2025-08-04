import type { AdvertType } from "../pages/ads/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  ads: {
    loaded: boolean;
    data: AdvertType[];
  };
};

const defaultState: State = {
  auth: false,
  ads: {
    loaded: false,
    data: [],
  },
};

export function auth(
  state = defaultState.auth,
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

export function ads(state = defaultState.ads, action: Actions): State["ads"] {
  switch (action.type) {
    case "ads/loaded/fulfilled":
      return { loaded: true, data: action.payload };
    case "ads/detail/fulfilled":
      return { loaded: false, data: [action.payload] };
    case "ads/delete":
      return {
        ...state,
        data: state.data.filter((ad) => ad.id !== action.payload),
      };
    case "ads/created/fulfilled":
      return { ...state, data: [action.payload, ...state.data] };

    default:
      return state;
  }
}
