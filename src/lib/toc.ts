import GithubSlugger from 'github-slugger';

export type TOCItem = {
    text: string;
    slug: string;
    level: number;
};

export function parseHeadings(markdown: string): TOCItem[] {
    const slugger = new GithubSlugger();
    const headingRegex = /^(#{2,3})\s+(.*)$/gm;
    const headings: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const slug = slugger.slug(text);
        headings.push({ text, slug, level });
    }

    return headings;
}
