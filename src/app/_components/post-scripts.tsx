"use client";

import { useEffect } from "react";

export function PostScripts() {
    useEffect(() => {
        const preTags = document.querySelectorAll("pre");

        preTags.forEach((pre) => {
            // Check if button already exists to prevent duplicates (e.g. re-renders)
            if (pre.querySelector(".copy-btn")) return;

            // Create container for relative positioning if not already
            if (getComputedStyle(pre).position === "static") {
                pre.style.position = "relative";
            }

            const button = document.createElement("button");
            button.className = "copy-btn absolute top-2 right-2 p-2 rounded bg-slate-700/50 hover:bg-slate-700 text-white opacity-0 group-hover:opacity-100 transition-opacity";
            button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;

            // Make pre a group for hover effect
            pre.classList.add("group");

            button.onclick = () => {
                const code = pre.querySelector("code")?.innerText || pre.innerText;
                navigator.clipboard.writeText(code).then(() => {
                    const originalHTML = button.innerHTML;
                    button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-400">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
                    setTimeout(() => {
                        button.innerHTML = originalHTML;
                    }, 2000);
                });
            };

            pre.appendChild(button);
        });
    }, []);

    return null;
}
