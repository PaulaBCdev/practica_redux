import "./login-page.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import FormField from "../../components/ui/form-field";
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";
import { useLoginAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";

function LoginPage() {
  const loginAction = useLoginAction();
  const uiResetErrorAction = useUiResetError();
  const { pending: isFetching, error } = useAppSelector(getUi);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  const { email, password } = credentials;
  const isDisabled = !email || !password || isFetching;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  function handleCheck(event: ChangeEvent<HTMLInputElement>) {
    setIsChecked(event.target.checked);
  }

  // TODO: middleware de control de errores
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await loginAction(credentials, isChecked);
  }

  return (
    <Page title="Login">
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <FormField
            label="Email"
            classNameLabel="login-label"
            classNameInput="login-input"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <FormField
            label="Password"
            classNameLabel="login-label"
            classNameInput="login-input"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Button type="submit" className="login-btn" disabled={isDisabled}>
            Login
          </Button>
          <div className="remember-me-check">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={isChecked}
              onChange={handleCheck}
            />
            <label>Remember me</label>
          </div>
        </form>
        {error && (
          <div
            className="login-error"
            role="alert"
            onClick={() => {
              uiResetErrorAction();
            }}
          >
            {error.message}
          </div>
        )}
      </div>
    </Page>
  );
}

export default LoginPage;
