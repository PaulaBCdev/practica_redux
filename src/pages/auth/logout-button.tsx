import { logout } from "./service";

function LogoutButton() {
  const { onLogout } = useAuth();
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };
  return (
    <button className="nav-btn logout" onClick={handleLogoutClick}>
      LOGOUT
    </button>
  );
}

export default LogoutButton;
