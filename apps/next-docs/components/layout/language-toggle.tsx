'use client';
import { cn } from '@novaui/variants';
import { type ButtonHTMLAttributes, type HTMLAttributes } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useI18n } from '@/contexts/i18n';

export type LanguageSelectProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function LanguageToggle(props: LanguageSelectProps): React.ReactElement {
  const context = useI18n();
  if (!context.locales) throw new Error('Missing `<I18nProvider />`');

  return (
    <Popover>
      <PopoverTrigger
        aria-label={context.text.chooseLanguage}
        {...props}
        className={cn(
          buttonVariants({
            color: 'ghost',
            className: 'gap-1.5 p-1.5'
          }),
          props.className
        )}
      >
        {props.children}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col overflow-hidden p-0">
        <p className="mb-1 p-2 text-xs text-muted-foreground font-medium">{context.text.chooseLanguage}</p>
        {context.locales.map(item => (
          <button
            key={item.locale}
            type="button"
            className={cn(
              'p-2 text-start text-sm',
              item.locale === context.locale
                ? 'bg-primary/10 font-medium text-primary'
                : 'hover:bg-accent hover:text-accent-foreground'
            )}
            onClick={() => {
              context.onChange?.(item.locale);
            }}
          >
            {item.name}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export function LanguageToggleText(props: HTMLAttributes<HTMLSpanElement>): React.ReactElement {
  const context = useI18n();
  const text = context.locales?.find(item => item.locale === context.locale)?.name;

  return <span {...props}>{text}</span>;
}
