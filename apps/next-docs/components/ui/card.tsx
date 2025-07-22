import { cn } from '@novaui/variants';
import Link from 'fumadocs-core/link';
import type { HTMLAttributes, ReactNode } from 'react';

export function Cards(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('grid grid-cols-2 gap-3 @container', props.className)}
    >
      {props.children}
    </div>
  );
}

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;

  href?: string;
  external?: boolean;
};

export function Card({ icon, title, description, ...props }: CardProps) {
  const E = props.href ? Link : 'div';

  return (
    <E
      {...props}
      data-card
      className={cn(
        'block rounded-xl border bg-fd-card p-4 text-fd-card-foreground transition-colors @max-lg:col-span-full',
        props.href && 'hover:bg-fd-accent/80',
        props.className
      )}
    >
      {icon ? (
        <div className="text-fd-muted-foreground not-prose bg-fd-muted mb-2 w-fit border rounded-lg p-1.5 shadow-md [&_svg]:size-4">
          {icon}
        </div>
      ) : null}
      <h3 className="not-prose mb-1 text-sm font-medium">{title}</h3>
      {description ? <p className="text-fd-muted-foreground text-sm !my-0">{description}</p> : null}
      <div className="text-fd-muted-foreground prose-no-margin text-sm empty:hidden">{props.children}</div>
    </E>
  );
}
