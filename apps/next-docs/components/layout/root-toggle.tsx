'use client';
import { cn } from '@novaui/variants';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { Check, ChevronsUpDown } from 'lucide-react';
import { type ComponentProps, type ReactNode, useMemo, useState } from 'react';

import { useSidebar } from '@/contexts/sidebar';
import { isActive } from '@/utils/is-active';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export interface Option {
  /** Redirect URL of the folder, usually the index page */
  url: string;

  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;

  /** Detect from a list of urls */
  urls?: Set<string>;

  props?: ComponentProps<'a'>;
}

export function RootToggle({
  options,
  placeholder,
  ...props
}: {
  placeholder?: ReactNode;
  options: Option[];
} & ComponentProps<'button'>) {
  const [open, setOpen] = useState(false);
  const { closeOnRedirect } = useSidebar();
  const pathname = usePathname();

  const selected = useMemo(() => {
    const lookup = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

    return options.findLast(item => {
      if (item.urls) return item.urls.has(lookup);

      return isActive(item.url, pathname, true);
    });
  }, [options, pathname]);

  const onClick = () => {
    closeOnRedirect.current = false;
    setOpen(false);
  };

  const item = selected ? (
    <>
      <div className="size-9 md:size-5">{selected.icon}</div>
      <div>
        <p className="text-sm font-medium">{selected.title}</p>
        <p className="text-fd-muted-foreground text-[13px] empty:hidden md:hidden">{selected.description}</p>
      </div>
    </>
  ) : (
    placeholder
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      {item && (
        <PopoverTrigger
          {...props}
          className={cn(
            'flex items-center gap-2 rounded-lg p-2 border bg-fd-secondary/50 text-start text-fd-secondary-foreground transition-colors hover:bg-fd-accent data-[state=open]:bg-fd-accent data-[state=open]:text-fd-accent-foreground',
            props.className
          )}
        >
          {item}
          <ChevronsUpDown className="text-fd-muted-foreground ms-auto size-4" />
        </PopoverTrigger>
      )}
      <PopoverContent className="min-w---radix-popover-trigger-width flex flex-col gap-1 overflow-hidden p-1">
        {options.map(option => {
          return (
            <Link
              href={option.url}
              key={option.url}
              onClick={onClick}
              {...option.props}
              className={cn(
                'flex items-center gap-2 rounded-lg p-1.5 hover:bg-fd-accent hover:text-fd-accent-foreground',
                option.props?.className
              )}
            >
              <div className="size-9 md:mb-auto md:mt-1 md:size-5">{option.icon}</div>
              <div>
                <p className="text-sm font-medium">{option.title}</p>
                <p className="text-fd-muted-foreground text-[13px] empty:hidden">{option.description}</p>
              </div>

              <Check className={cn('ms-auto size-3.5 text-fd-primary', !(option === selected) && 'invisible')} />
            </Link>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
