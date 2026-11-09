import { ArrowUpRight } from "lucide-react";

import { Badge } from "../components/ui/Badge";
import { useAuth } from "../context/AuthContext";

export function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.full_name.trim().split(/\s+/)[0] ?? "there";

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="border-b border-line pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Workspace / Overview
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
            Dashboard
          </h1>
          <Badge tone="done">Authenticated</Badge>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          A quick read on what needs attention. Live task metrics and upcoming
          deadlines arrive with the task workspace.
        </p>
      </header>

      <section className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
        <article className="border border-line bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge tone="in-progress">Workspace ready</Badge>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              01 / Overview
            </span>
          </div>

          <h2 className="mt-10 max-w-[16ch] text-balance text-3xl font-semibold tracking-[-0.04em] text-ink">
            Good to see you, {firstName}.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
            Your account is connected and this area is protected. Once task
            data exists, this page will summarize the work that needs your
            attention without inventing numbers in the meantime.
          </p>

          <dl className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
            <div className="bg-surface p-4">
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                Session
              </dt>
              <dd className="mt-2 text-sm font-medium text-ink">Active</dd>
            </div>
            <div className="bg-surface p-4">
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                Access
              </dt>
              <dd className="mt-2 text-sm font-medium text-ink">
                Authenticated
              </dd>
            </div>
          </dl>
        </article>

        <aside className="border border-line bg-surface p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            Next wave
          </p>
          <ol className="mt-4 grid gap-4">
            <li className="flex gap-3 border-t border-line pt-4">
              <span className="font-mono text-[10px] text-accent">01</span>
              <div>
                <p className="text-sm font-medium text-ink">Task workspace</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Create and manage real tasks.
                </p>
              </div>
            </li>
            <li className="flex gap-3 border-t border-line pt-4">
              <span className="font-mono text-[10px] text-accent">02</span>
              <div>
                <p className="text-sm font-medium text-ink">Live overview</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Counts and deadlines from your data.
                </p>
              </div>
            </li>
            <li className="flex gap-3 border-t border-line pt-4">
              <span className="font-mono text-[10px] text-accent">03</span>
              <div>
                <p className="text-sm font-medium text-ink">Focus tools</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Search, filter, and priority views.
                </p>
              </div>
            </li>
          </ol>

          <p className="mt-8 border-t border-line pt-4 text-xs leading-5 text-muted">
            Nothing on this screen is mocked. The API is ready, but this view
            stays intentionally empty until the task workspace lands.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            Fieldnote / Wave 02
            <ArrowUpRight aria-hidden="true" className="size-3" />
          </p>
        </aside>
      </section>
    </div>
  );
}
