'use client';
import { createContext, usePathname } from 'fumadocs-core/framework';
import { useOnChange } from 'fumadocs-core/utils/use-on-change';
import { type ReactNode, type RefObject, useMemo, useRef, useState } from 'react';

interface SidebarContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;

  /** When set to false, don't close the sidebar when navigate to another page */
  closeOnRedirect: RefObject<boolean>;
}

const SidebarContextValue = createContext<SidebarContext>('SidebarContext');

export function useSidebar(): SidebarContext {
  return SidebarContextValue.use();
}

export function SidebarProvider({ children }: { children: ReactNode }): ReactNode {
  const closeOnRedirect = useRef(true);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();

  useOnChange(pathname, () => {
    if (closeOnRedirect.current) {
      setOpen(false);
    }
    closeOnRedirect.current = true;
  });

  return (
    <SidebarContextValue.Provider
      value={useMemo(
        () => ({
          open,
          setOpen,
          collapsed,
          setCollapsed,
          closeOnRedirect
        }),
        [open, collapsed]
      )}
    >
      {children}
    </SidebarContextValue.Provider>
  );
}
