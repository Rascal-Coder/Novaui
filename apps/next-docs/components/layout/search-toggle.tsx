'use client';
import { cn } from '@novaui/variants';
import { Search } from 'lucide-react';
import type { ComponentProps } from 'react';

import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { useI18n } from '@/contexts/i18n';
import { useSearchContext } from '@/contexts/search';

interface SearchToggleProps extends Omit<ComponentProps<'button'>, 'color'>, ButtonProps {
  hideIfDisabled?: boolean;
}

export function SearchToggle({ hideIfDisabled, size = 'icon-sm', color = 'ghost', ...props }: SearchToggleProps) {
  const { setOpenSearch, enabled } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      aria-label="Open Search"
      data-search=""
      type="button"
      className={cn(
        buttonVariants({
          size,
          color
        }),
        props.className
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search />
    </button>
  );
}

export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<'button'> & {
  hideIfDisabled?: boolean;
}) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();
  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      data-search-full=""
      type="button"
      {...props}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg border bg-secondary/50 p-1.5 ps-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
        props.className
      )}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-4" />
      {text.search}
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k, i) => (
          <kbd
            className="border rounded-md bg-background px-1.5"
            key={i}
          >
            {k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}
