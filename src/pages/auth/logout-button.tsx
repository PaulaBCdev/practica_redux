import { useLogoutAction } from "../../store/hooks";

function LogoutButton() {
  const logoutAction = useLogoutAction();

  return (
    <button className="nav-btn logout" onClick={logoutAction}>
      LOGOUT
    </button>
  );
}

export default LogoutButton;
