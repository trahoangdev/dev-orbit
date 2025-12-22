"use client";

import { useRef, useEffect, useState } from "react";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    TelegramIcon,
} from "next-share";

type Props = {
    slug: string;
    title: string;
};

export function SocialShare({ slug, title }: Props) {
    const [url, setUrl] = useState(`https://devorbitblog.vercel.app/posts/${slug}`);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(`${window.location.origin}/posts/${slug}`);
        }
    }, [slug]);

    return (
        <div className="flex flex-col items-center justify-center py-8 border-t border-slate-200 dark:border-slate-800 mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                Chia sẻ bài viết này
            </h3>
            <div className="flex gap-4">
                <FacebookShareButton url={url} quote={title} hashtag={"#devorbit"}>
                    <FacebookIcon size={40} round className="hover:scale-110 transition-transform" />
                </FacebookShareButton>

                <TwitterShareButton url={url} title={title}>
                    <TwitterIcon size={40} round className="hover:scale-110 transition-transform" />
                </TwitterShareButton>

                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={40} round className="hover:scale-110 transition-transform" />
                </LinkedinShareButton>

                <TelegramShareButton url={url} title={title}>
                    <TelegramIcon size={40} round className="hover:scale-110 transition-transform" />
                </TelegramShareButton>
            </div>
        </div>
    );
}
