'use client';
import { cn } from '@novaui/variants';
import type { TOCItemType } from 'fumadocs-core/server';
import * as Primitive from 'fumadocs-core/toc';
import { type ComponentProps, useEffect, useRef, useState } from 'react';

import { useTOCItems } from '@/components/layout/toc';
import { TocThumb } from '@/components/layout/toc-thumb';
import { useI18n } from '@/contexts/i18n';
import { mergeRefs } from '@/utils/merge-refs';

export default function ClerkTOCItems({ ref, className, ...props }: ComponentProps<'div'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = useTOCItems();
  const { text } = useI18n();

  const [svg, setSvg] = useState<{
    path: string;
    width: number;
    height: number;
  }>();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    function onResize(): void {
      if (container.clientHeight === 0) return;
      let h = 0;
      let w = 0;
      const d: string[] = [];
      for (let i = 0; i < items.length; i++) {
        const element: HTMLElement | null = container.querySelector(`a[href="#${items[i].url.slice(1)}"]`);

        if (element) {
          const styles = getComputedStyle(element);
          const offset = getLineOffset(items[i].depth) + 1;
          const top = element.offsetTop + Number.parseFloat(styles.paddingTop);
          const bottom = element.offsetTop + element.clientHeight - Number.parseFloat(styles.paddingBottom);

          w = Math.max(offset, w);
          h = Math.max(h, bottom);

          d.push(`${i === 0 ? 'M' : 'L'}${offset} ${top}`);
          d.push(`L${offset} ${bottom}`);
        }
      }

      setSvg({
        path: d.join(' '),
        width: w + 1,
        height: h
      });
    }

    const observer = new ResizeObserver(onResize);
    onResize();

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0)
    return (
      <div className="text-fd-muted-foreground bg-fd-card border rounded-lg p-3 text-xs">{text.tocNoHeadings}</div>
    );

  return (
    <>
      {svg ? (
        <div
          className="absolute start-0 top-0 rtl:-scale-x-100"
          style={{
            width: svg.width,
            height: svg.height,
            maskImage: `url("data:image/svg+xml,${
              // Inline SVG
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" fill="none" /></svg>`
              )
            }")`
          }}
        >
          <TocThumb
            className="h---fd-height mt---fd-top bg-fd-primary transition-all"
            containerRef={containerRef}
          />
        </div>
      ) : null}
      <div
        className={cn('flex flex-col', className)}
        ref={mergeRefs(containerRef, ref)}
        {...props}
      >
        {items.map((item, i) => (
          <TOCItem
            item={item}
            key={item.url}
            lower={items[i + 1]?.depth}
            upper={items[i - 1]?.depth}
          />
        ))}
      </div>
    </>
  );
}

function getItemOffset(depth: number): number {
  if (depth <= 2) return 14;
  if (depth === 3) return 26;
  return 36;
}

function getLineOffset(depth: number): number {
  return depth >= 3 ? 10 : 0;
}

function TOCItem({
  item,
  upper = item.depth,
  lower = item.depth
}: {
  item: TOCItemType;
  upper?: number;
  lower?: number;
}) {
  const offset = getLineOffset(item.depth);
  const upperOffset = getLineOffset(upper);
  const lowerOffset = getLineOffset(lower);

  return (
    <Primitive.TOCItem
      className="text-fd-muted-foreground data-[active=true]:text-fd-primary [overflow-wrap:anywhere] relative py-1.5 text-sm transition-colors prose first:pt-0 last:pb-0"
      href={item.url}
      style={{
        paddingInlineStart: getItemOffset(item.depth)
      }}
    >
      {offset !== upperOffset ? (
        <svg
          className="absolute start-0 size-4 -top-1.5 rtl:-scale-x-100"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            className="stroke-fd-foreground/10"
            strokeWidth="1"
            x1={upperOffset}
            x2={offset}
            y1="0"
            y2="12"
          />
        </svg>
      ) : null}
      <div
        className={cn(
          'absolute inset-y-0 w-px bg-fd-foreground/10',
          offset !== upperOffset && 'top-1.5',
          offset !== lowerOffset && 'bottom-1.5'
        )}
        style={{
          insetInlineStart: offset
        }}
      />
      {item.title}
    </Primitive.TOCItem>
  );
}
