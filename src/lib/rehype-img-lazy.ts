import { visit } from 'unist-util-visit';
import { Root, Element as HastElement } from 'hast';

export function rehypeImgLazy() {
    return (tree: Root) => {
        visit(tree, 'element', (node: HastElement) => {
            if (node.tagName === 'img') {
                node.properties = node.properties || {};
                node.properties.loading = 'lazy';

                // Add styling for better aesthetics
                const existingClasses = (node.properties.className as string[]) || [];
                // Only add if not already present (though unlikely in std markdown)
                node.properties.className = [...existingClasses, 'rounded-lg', 'shadow-md', 'my-8'];
            }
        });
    };
}
