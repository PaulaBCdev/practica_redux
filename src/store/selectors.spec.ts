import type { RootState } from ".";
import type { AdvertType } from "../pages/ads/types";
import { getAdDetail } from "./selectors";

describe("getAdDetail", () => {
  const ad: AdvertType = {
    id: "1",
    createdAt: "today",
    name: "adTest",
    sale: true,
    price: 15,
    tags: ["tag"],
    photo: null,
  };

  const state: RootState = {
    auth: false,
    ads: {
      loaded: true,
      data: [ad],
    },
    tags: {
      loaded: true,
      data: ["tag1", "tag2"],
      error: null,
    },
    filters: {
      name: "",
      sale: null,
      price: null,
      tags: [],
      maxPrice: null,
    },
    ui: {
      pending: false,
      error: null,
    },
  };

  test("should return an ad with id 1", () => {
    const result = getAdDetail("1")(state);
    expect(result).toBe(ad);
  });

  test("should return undefined", () => {
    const result = getAdDetail("2")(state);
    expect(result).toBeUndefined();
  });
});
