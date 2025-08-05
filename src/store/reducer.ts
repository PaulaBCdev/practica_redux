import type { AdvertType } from "../pages/ads/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  ads: {
    loaded: boolean;
    data: AdvertType[];
  };
  tags: {
    loaded: boolean;
    data: string[];
    error?: Error | null;
  };
  filters: {
    name: string;
    sale: boolean | null;
    price: [number, number] | null;
    tags: string[];
  };
};

const defaultState: State = {
  auth: false,
  ads: {
    loaded: false,
    data: [],
  },
  tags: {
    loaded: false,
    data: [],
    error: null,
  },
  filters: {
    name: "",
    sale: null,
    price: null,
    tags: [],
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

export function tags(
  state = defaultState.tags,
  action: Actions,
): State["tags"] {
  switch (action.type) {
    case "tags/pending":
      return { ...state, loaded: false, error: null };
    case "tags/fulfilled":
      return { ...state, loaded: true, data: action.payload };
    case "tags/rejected":
      return { ...state, loaded: false, error: action.payload };
    default:
      return state;
  }
}

export function filters(
  state = defaultState.filters,
  action: Actions,
): State["filters"] {
  switch (action.type) {
    case "filters/applied":
      return { ...state, ...action.payload };
    case "filters/reset":
      return defaultState.filters;
    default:
      return state;
  }
}
