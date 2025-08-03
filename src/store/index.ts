import { applyMiddleware, combineReducers, createStore } from "redux";
import * as reducers from "./reducer.ts";
import * as thunk from "redux-thunk";
import * as auth from "../pages/auth/service.ts";
import * as ads from "../pages/ads/service.ts";
import { useDispatch, useSelector } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import type { Actions } from "./actions.ts";
import type { createBrowserRouter } from "react-router";

const rootReducer = combineReducers(reducers);

type Router = ReturnType<typeof createBrowserRouter>;
type ExtraArgument = {
  api: {
    auth: typeof auth;
    ads: typeof ads;
  };
  router: Router;
};

export default function configureStore(
  preloadedState: Partial<reducers.State>,
  router: Router,
) {
  const store = createStore(
    rootReducer,
    preloadedState as never,
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument<reducers.State, Actions, ExtraArgument>({
          api: { auth, ads },
          router,
        }),
      ),
    ),
  );

  return store;
}

export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// THUNK TYPE
export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;
