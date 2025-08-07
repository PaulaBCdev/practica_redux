import type { Credentials } from "../pages/auth/types";
import { adsLoadedFulfilled, authLogin, authLoginFulfilled } from "./actions";

describe("authLoginFulfilled", () => {
  test('should return an "auth/login/fulfilled" action', () => {
    const expected = { type: "auth/login/fulfilled" };
    const result = authLoginFulfilled();
    expect(result).toEqual(expected);
  });
});

describe("adsLoadedFulfilled", () => {
  test('should return an "ads/loaded/fulfilled" action with 1 tweet', () => {
    const ads = [
      {
        id: "1",
        createdAt: "today",
        name: "adTest",
        sale: true,
        price: 15,
        tags: ["tag"],
        photo: null,
      },
    ];

    const expected = { type: "ads/loaded/fulfilled", payload: ads };
    const result = adsLoadedFulfilled(ads);

    expect(result).toEqual(expected);
    expect(result.payload).toHaveLength(1);
  });
});

describe("authLogin", () => {
  afterEach(() => {
    dispatch.mockClear();
    router.navigate.mockClear();
  });

  const credentials: Credentials = {
    email: "paula@gmail.com",
    password: "1234",
  };
  const thunk = authLogin(credentials, true);

  // mocks
  const dispatch = vi.fn();
  const api = {
    auth: {
      login: vi.fn(),
    },
  };
  const from = "/from";
  const router = {
    state: { location: { state: { from } } },
    navigate: vi.fn(),
  };

  test("when login resolves", async () => {
    api.auth.login = vi.fn().mockResolvedValue(undefined);
    // @ts-expect-error: no need getState
    await thunk(dispatch, undefined, { api, router });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "auth/login/pending" });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: "auth/login/fulfilled",
    });

    expect(api.auth.login).toHaveBeenCalledWith(credentials, true);

    expect(router.navigate).toHaveBeenCalledWith(from, { replace: true });
  });

  test("when login rejects", async () => {
    const error = new Error("unauthorized");

    api.auth.login = vi.fn().mockRejectedValue(error);
    await expect(() =>
      // @ts-expect-error: no need getState
      thunk(dispatch, undefined, { api, router }),
    ).rejects.toThrowError(error);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: "auth/login/pending" });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: "auth/login/rejected",
      payload: error,
    });

    expect(router.navigate).not.toHaveBeenCalled();
  });
});
