import { Spinner } from "../ui/Spinner";

export function SessionLoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas px-5">
      <div className="flex items-center gap-4 border border-line bg-surface px-5 py-4">
        <Spinner size="sm" label="Restoring your session" />
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            Workspace access
          </p>
          <p className="mt-1 text-sm font-medium text-ink">
            Restoring your session…
          </p>
        </div>
      </div>
    </div>
  );
}
