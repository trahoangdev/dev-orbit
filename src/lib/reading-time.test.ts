import { describe, expect, it } from "vitest";
import { calculateReadingTime, getWordCount } from "@/lib/reading-time";

describe("reading-time", () => {
  it("ignores code blocks and html tags when counting words", () => {
    const input = `
# Title
Hello world from DevOrbit.
<b>bold text</b>
\`\`\`ts
const x = 1;
\`\`\`
`;

    expect(getWordCount(input)).toBe(8);
  });

  it("returns at least 1 minute for short content", () => {
    const result = calculateReadingTime("xin chao");

    expect(result.minutes).toBe(1);
    expect(result.text).toBe("1 phút đọc");
  });
});
