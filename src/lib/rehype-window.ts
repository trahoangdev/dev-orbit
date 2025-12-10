
import { visit } from 'unist-util-visit';
import { Element as HastElement, Root, Parent } from 'hast';

export function rehypeWindow() {
    return (tree: Root) => {
        visit(tree, 'element', (node: HastElement, index: number | undefined, parent: Parent | undefined) => {
            if (node.tagName === 'pre' && parent && typeof index === 'number') {
                // Ensure we don't wrap twice if somehow visited multiple times
                if ((parent as HastElement).properties?.className && Array.isArray((parent as HastElement).properties.className) && ((parent as HastElement).properties.className as string[]).includes('mockup-code-window')) return;

                const originalNode = { ...node };

                // Adjust original pre styles if needed
                // rehype-pretty-code often puts styles on 'pre'. We want to ensure it fits our container.
                // We'll add 'p-4 overflow-x-auto !bg-transparent !m-0' to override/merge.
                // Note: !bg-transparent is important if shiki adds a background color we want to match our container.
                const existingClasses = (originalNode.properties.className as string[]) || [];
                originalNode.properties.className = [...existingClasses, '!p-5', 'overflow-x-auto', '!bg-transparent', '!m-0', 'text-sm'];

                const wrapper: HastElement = {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: ['mockup-code-window', 'relative', 'rounded-xl', 'overflow-hidden', 'bg-[#1e293b]', 'my-8', 'border', 'border-slate-800', 'shadow-2xl']
                    },
                    children: [
                        // Header
                        {
                            type: 'element',
                            tagName: 'div',
                            properties: { className: ['flex', 'items-center', 'justify-between', 'px-4', 'py-3', 'bg-[#0f172a]/80', 'backdrop-blur', 'border-b', 'border-slate-800'] },
                            children: [
                                // Left controls (Mac style)
                                {
                                    type: 'element',
                                    tagName: 'div',
                                    properties: { className: ['flex', 'gap-2'] },
                                    children: [
                                        { type: 'element', tagName: 'div', properties: { className: ['w-3', 'h-3', 'rounded-full', 'bg-red-500/80'] }, children: [] },
                                        { type: 'element', tagName: 'div', properties: { className: ['w-3', 'h-3', 'rounded-full', 'bg-yellow-500/80'] }, children: [] },
                                        { type: 'element', tagName: 'div', properties: { className: ['w-3', 'h-3', 'rounded-full', 'bg-green-500/80'] }, children: [] },
                                    ]
                                },
                                // Title
                                {
                                    type: 'element',
                                    tagName: 'div',
                                    properties: { className: ['text-xs', 'text-slate-500', 'font-mono', 'font-medium'] },
                                    children: [{ type: 'text', value: 'terminal' }]
                                },
                                // Copy Button
                                {
                                    type: 'element',
                                    tagName: 'button',
                                    properties: {
                                        className: ['copy-btn', 'group', 'relative', 'p-1.5', 'rounded-md', 'hover:bg-slate-800', 'transition-all', 'text-slate-500', 'hover:text-slate-200'],
                                        'aria-label': 'Copy code',
                                    },
                                    children: [
                                        // Clipboard Icon
                                        {
                                            type: 'element',
                                            tagName: 'svg',
                                            properties: {
                                                className: ['w-4', 'h-4', 'js-copy-icon'],
                                                xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
                                            },
                                            children: [
                                                { type: 'element', tagName: 'rect', properties: { width: '14', height: '14', x: '8', y: '8', rx: '2', ry: '2' }, children: [] },
                                                { type: 'element', tagName: 'path', properties: { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }, children: [] }
                                            ]
                                        },
                                        // Check Icon (Hidden by default)
                                        {
                                            type: 'element',
                                            tagName: 'svg',
                                            properties: {
                                                className: ['w-4', 'h-4', 'hidden', 'js-check-icon', 'text-green-500'],
                                                xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
                                            },
                                            children: [
                                                { type: 'element', tagName: 'polyline', properties: { points: '20 6 9 17 4 12' }, children: [] }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // Content content
                        {
                            type: 'element',
                            tagName: 'div',
                            properties: { className: ['bg-[#1e293b]'] }, // Wrapper content background
                            children: [originalNode]
                        }
                    ]
                };

                parent.children[index] = wrapper;
            }
        });
    };
}
