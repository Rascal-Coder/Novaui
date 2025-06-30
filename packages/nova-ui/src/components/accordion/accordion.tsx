import AccordionContent from './accordion-content';
import AccordionHeader from './accordion-header';
import AccordionItem from './accordion-item';
import AccordionRoot from './accordion-root';
import AccordionTrigger from './accordion-trigger';
import type { AccordionItemData, AccordionProps } from './types';

export default function Accordion<T extends AccordionItemData = AccordionItemData>({
  className,
  size,
  ui,
  items,
  renderItem,
  renderTriggerLeading,
  renderTitle,
  renderTriggerTrailing,
  renderTriggerIcon,
  renderContent,
  disabled,
  ...props
}: AccordionProps<T>) {
  return (
    <AccordionRoot
      className={className || ui?.root}
      size={size}
      {...props}
    >
      {items.map(item => {
        const slotProps = {
          item,
          modelValue: 'value' in props ? props.value : undefined
        };

        if (renderItem) {
          return renderItem(slotProps);
        }

        return (
          <AccordionItem
            className={ui?.item}
            disabled={disabled || item.disabled}
            key={item.value}
            size={size}
            value={item.value}
          >
            <AccordionHeader
              className={ui?.header}
              size={size}
            >
              <AccordionTrigger
                className={ui?.trigger}
                icon={item.icon}
                iconSlot={renderTriggerIcon?.(slotProps)}
                leading={renderTriggerLeading?.(slotProps)}
                size={size}
                title={item.title}
                trailing={renderTriggerTrailing?.(slotProps)}
                ui={ui}
              >
                {renderTitle?.(slotProps)}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent
              className={ui?.content}
              size={size}
            >
              {renderContent ? renderContent(slotProps) : item.content}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </AccordionRoot>
  );
}
