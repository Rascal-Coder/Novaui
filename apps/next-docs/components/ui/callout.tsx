import { cn } from '@novaui/variants';
import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';

type CalloutProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'type' | 'icon'> & {
  title?: ReactNode;
  /** @defaultValue info */
  type?: 'info' | 'warn' | 'error' | 'success' | 'warning';

  /** Force an icon */
  icon?: ReactNode;
};

const iconClass = 'size-5 -me-0.5 fill-(--callout-color) text-fd-card';

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, children, title, type = 'info', icon, ...props }, ref) => {
    let calloutType = type;
    if (calloutType === 'warn') calloutType = 'warning';
    if ((calloutType as unknown) === 'tip') calloutType = 'info';

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-2 my-4 rounded-xl border bg-fd-card p-3 ps-1 text-sm text-fd-card-foreground shadow-md',
          className
        )}
        {...props}
        style={
          {
            '--callout-color': `var(--color-fd-${calloutType}, var(--color-fd-muted))`,
            ...props.style
          } as object
        }
      >
        <div
          className="bg---callout-color/50 w-0.5 rounded-sm"
          role="none"
        />
        {icon ??
          {
            info: <Info className={iconClass} />,
            warning: <TriangleAlert className={iconClass} />,
            error: <CircleX className={iconClass} />,
            success: <CircleCheck className={iconClass} />
          }[calloutType]}
        <div className="min-w-0 flex flex-1 flex-col gap-2">
          {title && <p className="font-medium !my-0">{title}</p>}
          <div className="text-fd-muted-foreground prose-no-margin empty:hidden">{children}</div>
        </div>
      </div>
    );
  }
);

Callout.displayName = 'Callout';
