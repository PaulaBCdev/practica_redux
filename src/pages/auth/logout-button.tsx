import { useLogoutAction } from "../../store/hooks";
import { logout } from "./service";

function LogoutButton() {
  const logoutAction = useLogoutAction();
  const handleLogoutClick = async () => {
    await logout();
    logoutAction();
  };
  return (
    <button className="nav-btn logout" onClick={handleLogoutClick}>
      LOGOUT
    </button>
  );
}

export default LogoutButton;
