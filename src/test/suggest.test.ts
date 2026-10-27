import { describe, it, expect } from "vitest";
import { suggestPackage } from "@/lib/i18n";

describe("suggestPackage", () => {
  it("10-25 guests -> gathering", () => expect(suggestPackage(20, "simple")).toBe("gathering"));
  it("25-60 guests -> party", () => expect(suggestPackage(40, "comfortable")).toBe("party"));
  it("60+ guests -> event", () => expect(suggestPackage(80, "simple")).toBe("event"));
});
