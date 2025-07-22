import { cn } from '@novaui/variants';
import { Image as FrameworkImage } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import type { AnchorHTMLAttributes, FC, HTMLAttributes, ImgHTMLAttributes, TableHTMLAttributes } from 'react';

import { Callout } from '@/components/ui/callout';
import { Card, Cards } from '@/components/ui/card';
import {
  CodeBlock,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  Pre
} from '@/components/ui/codeblock';
import { Heading } from '@/components/ui/heading';

function Image(
  props: ImgHTMLAttributes<HTMLImageElement> & {
    sizes?: string;
  }
) {
  return (
    <FrameworkImage
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
      {...props}
      className={cn('rounded-lg', props.className)}
      src={props.src as unknown as string}
    />
  );
}

function Table(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="prose-no-margin relative my-6 overflow-auto">
      <table {...props} />
    </div>
  );
}

export const defaultMdxComponents = {
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props}>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
  Card,
  Cards,
  a: Link as FC<AnchorHTMLAttributes<HTMLAnchorElement>>,
  img: Image,
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      as="h1"
      {...props}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      as="h2"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      as="h3"
      {...props}
    />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      as="h4"
      {...props}
    />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      as="h5"
      {...props}
    />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading
      as="h6"
      {...props}
    />
  ),
  table: Table,
  Callout
};

export const createRelativeLink: typeof import('./mdx.server').createRelativeLink = () => {
  throw new Error('`createRelativeLink` is only supported in Node.js environment');
};

// export { defaultMdxComponents as default };
