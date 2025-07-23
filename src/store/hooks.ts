import { useAppDispatch, useAppSelector } from ".";
import type { Credentials } from "../pages/auth/types";
import { authLogin, authLogout } from "./actions";
import { getIsLogged } from "./selectors";

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
