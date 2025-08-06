import type { AdvertType } from "../pages/ads/types";
import type {
  Actions,
  ActionsFulfilled,
  ActionsPending,
  ActionsRejected,
} from "./actions";

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
    maxPrice: number | null;
  };
  ui: {
    pending: boolean;
    error: Error | null;
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
    maxPrice: 0,
  },
  ui: {
    pending: false,
    error: null,
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

function isPending(action: Actions): action is ActionsPending {
  return action.type.endsWith("/pending");
}

function isFulfilled(action: Actions): action is ActionsFulfilled {
  return action.type.endsWith("/fulfilled");
}

function isRejected(action: Actions): action is ActionsRejected {
  return action.type.endsWith("/rejected");
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  if (isPending(action)) {
    return { pending: true, error: null };
  }

  if (isFulfilled(action)) {
    return { pending: false, error: null };
  }

  if (isRejected(action)) {
    return { pending: false, error: action.payload };
  }

  if (action.type === "ui/reset-error") {
    return { ...state, error: null };
  }

  return state;
}
