import { describe, expect, it } from "vitest";
import { parseHeadings } from "@/lib/toc";

describe("parseHeadings", () => {
  it("extracts only h2 and h3 headings", () => {
    const markdown = `
# Ignore h1
## Java Core
Some text
### Collections
#### Ignore h4
## Java Core
`;

    const toc = parseHeadings(markdown);

    expect(toc).toHaveLength(3);
    expect(toc.map((item) => item.text)).toEqual([
      "Java Core",
      "Collections",
      "Java Core",
    ]);
    expect(toc.map((item) => item.slug)).toEqual([
      "java-core",
      "collections",
      "java-core-1",
    ]);
  });
});
