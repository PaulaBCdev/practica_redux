import { auth } from "./reducer";

describe("auth reducer", () => {
  test('should manage "auth/login/fulfilled" action', () => {
    const result = auth(undefined, { type: "auth/login/fulfilled" });
    expect(result).toBe(true);
  });

  test('should manage "auth/logout" action', () => {
    const result = auth(undefined, { type: "auth/logout" });
    expect(result).toBe(false);
  });

  test("should manage any oyher action", () => {
    const result = auth(true, { type: "ads/created/pending" });
    expect(result).toBe(true);
  });
});
