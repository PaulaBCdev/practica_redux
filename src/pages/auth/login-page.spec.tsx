import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./login-page";
import { Provider } from "react-redux";
import { authLogin, uiResetError } from "../../store/actions";
import type { RootState } from "../../store";

// mock module
vi.mock("../../store/actions");

describe("LoginPage", () => {
  const state: RootState = {
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

  const renderComponent = (error?: Error) => {
    if (error) {
      state.ui.error = error;
    }

    return render(
      <Provider
        store={{
          getState: () => state,
          // @ts-expect-error: subscribe
          subscribe: () => {},
          // @ts-expect-error: dispatch
          dispatch: () => {},
        }}
      >
        <LoginPage />
      </Provider>,
    );
  };

  test("should render", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  test("should dispatch login action", async () => {
    renderComponent();

    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);

    const loginButton = screen.getByRole("button");
    const remembermeButton = screen.getByRole("checkbox");

    expect(loginButton).toHaveTextContent("Login");
    expect(loginButton).toBeDisabled();

    await userEvent.type(emailInput, "paula@gmail.com");
    await userEvent.type(passwordInput, "1234");

    expect(loginButton).toBeEnabled();

    await userEvent.click(remembermeButton);
    await userEvent.click(loginButton);

    expect(authLogin).toHaveBeenCalledWith(
      {
        email: "paula@gmail.com",
        password: "1234",
      },
      true,
    );
  });

  test("should render error", async () => {
    const error = new Error("Wrong email/password");
    const { container } = renderComponent(error);

    expect(container).toMatchSnapshot();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(error.message);

    await userEvent.click(alert);
    expect(uiResetError).toHaveBeenCalled();
  });
});
