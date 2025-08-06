import { adsLoadedFulfilled, authLoginFulfilled } from "./actions";

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
