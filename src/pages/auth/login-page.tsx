import "./login-page.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import FormField from "../../components/ui/form-field";
import { AxiosError } from "axios";
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";
import { useLoginAction } from "../../store/hooks";

function LoginPage() {
  const loginAction = useLoginAction();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const { email, password } = credentials;
  const isDisabled = !email || !password;

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

    try {
      await loginAction(credentials, isChecked);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError({
          message: error.response?.data?.message ?? error.message ?? "",
        });
      }
    }
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
              setError(null);
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
