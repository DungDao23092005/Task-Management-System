import { ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router";

export function DashboardEmptyState() {
  return (
    <section
      aria-labelledby="dashboard-empty-heading"
      className="relative overflow-hidden border border-line bg-surface"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-px bg-accent"
      />

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center border border-line-strong bg-raised">
              <Compass aria-hidden="true" className="size-4 text-accent" />
            </span>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Không gian trống
            </p>
          </div>

          <h2
            id="dashboard-empty-heading"
            className="mt-6 max-w-[24ch] text-balance text-2xl font-semibold tracking-[-0.04em] text-ink sm:text-3xl"
          >
            Không gian công việc của bạn đang trống.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Bạn có thể bắt đầu bằng cách khám phá khu vực quản lý công việc.
          </p>
        </div>

        <Link
          to="/tasks"
          className="inline-flex min-h-11 w-fit items-center justify-center gap-2 border border-accent bg-accent px-4 text-sm font-semibold text-canvas transition-colors hover:border-accent-hover hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Đến khu vực công việc
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
