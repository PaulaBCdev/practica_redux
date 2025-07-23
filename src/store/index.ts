import { applyMiddleware, combineReducers, createStore } from "redux";
import * as reducers from "./reducer.ts";
import * as thunk from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import type { Actions } from "./actions.ts";

const rootReducer = combineReducers(reducers);

export default function configureStore(
  preloadedState: Partial<reducers.State>,
) {
  const store = createStore(
    rootReducer,
    preloadedState as never,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument<reducers.State, Actions>()),
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
  undefined,
  Actions
>;
