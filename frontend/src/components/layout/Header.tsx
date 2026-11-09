import { Menu } from "lucide-react";
import { useLocation } from "react-router";

import { UserProfileBadge } from "./UserProfileBadge";

interface HeaderProps {
  isNavigationOpen: boolean;
  onOpenNavigation: () => void;
}

const PAGE_LABELS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tasks": "Tasks",
};

export function Header({
  isNavigationOpen,
  onOpenNavigation,
}: HeaderProps) {
  const location = useLocation();
  const pageLabel = PAGE_LABELS[location.pathname] ?? "Workspace";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenNavigation}
          aria-label="Open navigation"
          aria-controls="mobile-navigation"
          aria-expanded={isNavigationOpen}
          className="grid size-9 shrink-0 place-items-center border border-line-strong bg-raised text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas lg:hidden"
        >
          <Menu aria-hidden="true" className="size-4" />
        </button>

        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            Workspace
          </p>
          <p className="truncate text-sm font-medium text-ink">{pageLabel}</p>
        </div>

        <div className="ml-auto">
          <UserProfileBadge />
        </div>
      </div>
    </header>
  );
}
