"use client";

import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/theme";
import { slugifyHeading } from "@/lib/blog-headings";

const proseLink = cn(
  "font-medium text-diversy-primary underline-offset-4 hover:underline",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-diversy-primary/40 rounded-sm"
);

function flattenChildrenToText(children) {
  if (children == null || children === false) return "";
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(flattenChildrenToText).join("");
  if (children.props && children.props.children) {
    return flattenChildrenToText(children.props.children);
  }
  return "";
}

function isBlockNode(node) {
  if (!node || typeof node !== "object") return false;
  if (!React.isValidElement(node)) return false;
  const tag = node.type;
  if (typeof tag === "string" && (tag === "img" || tag === "figure")) return true;
  if (node.props && typeof node.props.src === "string") return true;
  return false;
}

function hasBlockChild(children) {
  if (children == null || children === false) return false;
  if (typeof children === "string" || typeof children === "number") return false;
  if (Array.isArray(children)) {
    return children.some((child) => isBlockNode(child));
  }
  return isBlockNode(children);
}

const components = {
  h2: ({ className, children, id, ...props }) => {
    const text = flattenChildrenToText(children);
    const resolvedId = id || slugifyHeading(text) || undefined;
    return (
      <h2
        id={resolvedId}
        className={cn(
          "mt-12 scroll-mt-24 text-2xl font-semibold leading-tight tracking-tight text-foreground first:mt-0 sm:mt-14 sm:text-[1.875rem]",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ className, ...props }) => (
    <h3 className={cn("mt-10 text-lg font-semibold tracking-tight text-foreground sm:text-xl", className)} {...props} />
  ),
  p: ({ className, children, node, ...props }) => {
    if (hasBlockChild(children)) {
      return <>{children}</>;
    }
    return (
      <p
        className={cn(
          "mt-5 text-[1.02rem] leading-[1.8] text-muted-foreground first:mt-0 sm:text-[1.05rem]",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
  a: ({ className, href, children, ...props }) => {
    const internal = typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
    if (internal) {
      return (
        <Link href={href} className={cn(proseLink, className)}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={cn(proseLink, className)}
        rel="noopener noreferrer"
        target={href && String(href).startsWith("http") ? "_blank" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ className, ...props }) => (
    <ul className={cn("mt-5 list-disc space-y-2 pl-6 text-muted-foreground marker:text-border", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("mt-5 list-decimal space-y-2 pl-6 text-muted-foreground marker:text-muted-foreground/70", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("pl-1 leading-[1.75]", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-10 border-l-2 border-diversy-primary/70 pl-6 text-xl italic leading-[1.55] text-foreground/90 sm:my-12 sm:text-[1.4rem]",
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-10 border-border/60", className)} {...props} />
  ),
  img: ({ src, alt, title, className, ...props }) => {
    if (!src) return null;
    return (
      <figure className="my-10 sm:my-12">
        <img
          src={src}
          alt={alt || ""}
          loading="lazy"
          className={cn(
            "h-auto w-full rounded-2xl object-cover ring-1 ring-border/60",
            className
          )}
          {...props}
        />
        {(title || alt) ? (
          <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
            {title || alt}
          </figcaption>
        ) : null}
      </figure>
    );
  },
  pre: ({ children }) => <>{children}</>,
  code: ({ className, inline, children, ...props }) =>
    inline ? (
      <code
        className={cn(
          "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </code>
    ) : (
      <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4">
        <code className={cn("block font-mono text-sm text-foreground", className)} {...props}>
          {children}
        </code>
      </pre>
    ),
  table: ({ className, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className={cn("w-full border-collapse text-left text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th className={cn("border-b border-border bg-muted/60 px-4 py-2 font-semibold text-foreground", className)} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("border-b border-border px-4 py-2 text-muted-foreground", className)} {...props} />
  ),
};

export default function BlogProse({ markdown }) {
  return (
    <div className="blog-prose mx-auto max-w-3xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
