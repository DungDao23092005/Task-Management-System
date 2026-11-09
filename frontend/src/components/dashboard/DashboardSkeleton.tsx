const PULSE = "motion-safe:animate-pulse";

function SkeletonBlock({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block rounded-[1px] bg-line ${PULSE} ${className}`}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Đang tải bảng điều khiển"
      className="grid gap-4"
    >
      <p role="status" className="sr-only">
        Đang tải thông tin bảng điều khiển.
      </p>

      <div
        aria-hidden="true"
        className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(19rem,0.5fr)]"
      >
        <div className="border border-line bg-surface">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-7">
            <SkeletonBlock className="h-3 w-36" />
            <SkeletonBlock className="h-2.5 w-24" />
          </div>
          <div className="p-5 sm:p-7">
            <SkeletonBlock className="h-2.5 w-24" />
            <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SkeletonBlock className="h-24 w-40 sm:h-28" />
              <div className="grid gap-2 sm:justify-items-end">
                <SkeletonBlock className="h-2.5 w-24" />
                <SkeletonBlock className="h-9 w-20" />
                <SkeletonBlock className="h-3 w-28" />
              </div>
            </div>
            <div className="mt-7 grid gap-3">
              <div className="flex items-center justify-between gap-4">
                <SkeletonBlock className="h-3 w-28" />
                <SkeletonBlock className="h-2.5 w-10" />
              </div>
              <SkeletonBlock className="h-2 w-full" />
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <div className="flex items-center justify-between gap-4">
                <SkeletonBlock className="h-2.5 w-32" />
                <SkeletonBlock className="h-2.5 w-20" />
              </div>
              <SkeletonBlock className="mt-4 h-2.5 w-full" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                <SkeletonBlock className="h-9 w-full" />
                <SkeletonBlock className="h-9 w-full" />
                <SkeletonBlock className="h-9 w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px border border-line bg-line lg:grid-cols-1">
          {[0, 1, 2].map((item) => (
            <div key={item} className="bg-surface p-4 sm:p-5">
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="mt-7 h-8 w-12" />
              <SkeletonBlock className="mt-2 h-2.5 w-24" />
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="border border-line bg-surface"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="size-9" />
            <div className="grid gap-1.5">
              <SkeletonBlock className="h-4 w-36" />
              <SkeletonBlock className="h-2.5 w-64 max-w-[45vw]" />
            </div>
          </div>
          <SkeletonBlock className="h-3 w-24" />
        </div>

        <div className="divide-y divide-line">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="grid gap-3 px-5 py-4 sm:px-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
            >
              <div className="grid gap-2">
                <SkeletonBlock className="h-4 w-[min(28rem,70%)]" />
                <div className="flex gap-2">
                  <SkeletonBlock className="h-5 w-16" />
                  <SkeletonBlock className="h-5 w-20" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 md:justify-end">
                <div className="grid gap-1.5 md:justify-items-end">
                  <SkeletonBlock className="h-2.5 w-20" />
                  <SkeletonBlock className="h-3 w-32" />
                </div>
                <SkeletonBlock className="size-11" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
