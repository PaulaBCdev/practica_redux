import "./login-header.css";

const LoginHeader = () => {
  return (
    <header className="login-header">
      <picture className="login-logo-container">
        <img
          className="login-logo"
          src="/icons/ZOCO-recto.svg"
          alt="ZOCO-logo"
        />
      </picture>
    </header>
  );
};

export default LoginHeader;
