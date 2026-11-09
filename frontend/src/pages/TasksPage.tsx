import { ListChecks } from "lucide-react";

import { Badge } from "../components/ui/Badge";

export function TasksPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="border-b border-line pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Workspace / Tasks
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
          Tasks
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          The working list for everything you need to move forward. This route
          is protected and ready for the task features in the next wave.
        </p>
      </header>

      <section className="mt-8 border border-line bg-surface p-6 sm:p-10">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <span className="grid size-12 place-items-center border border-line-strong bg-raised">
            <ListChecks aria-hidden="true" className="size-5 text-accent" />
          </span>
          <div className="mt-5">
            <Badge tone="todo">Not wired yet</Badge>
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-ink">
            A clear list starts here.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Task creation, filtering, search, and status changes arrive in the
            next wave. No placeholder rows or invented counts are shown on this
            screen.
          </p>
          <div className="mt-8 grid w-full grid-cols-3 gap-px border border-line bg-line">
            <div className="bg-surface px-3 py-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                Create
              </p>
              <p className="mt-1 text-xs text-ink">Next wave</p>
            </div>
            <div className="bg-surface px-3 py-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                Filter
              </p>
              <p className="mt-1 text-xs text-ink">Next wave</p>
            </div>
            <div className="bg-surface px-3 py-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                Update
              </p>
              <p className="mt-1 text-xs text-ink">Next wave</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
