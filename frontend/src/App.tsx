import type { ReactNode } from "react";
import {
  Activity,
  ArrowUpRight,
  Command,
  Layers3,
  SlidersHorizontal,
  Tags,
} from "lucide-react";

import { Badge } from "./components/ui/Badge";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { Spinner } from "./components/ui/Spinner";
import { API_BASE_URL } from "./lib/api-client";
import { cn } from "./lib/utils";

const PALETTE = [
  { label: "Canvas", value: "#02070A", swatchClassName: "bg-canvas" },
  { label: "Surface", value: "#081015", swatchClassName: "bg-surface" },
  { label: "Raised", value: "#0D1921", swatchClassName: "bg-raised" },
  { label: "Accent", value: "#FC7340", swatchClassName: "bg-accent" },
  { label: "Green", value: "#16A34A", swatchClassName: "bg-brand-bright" },
  { label: "Danger", value: "#E11D48", swatchClassName: "bg-danger" },
] as const;

const SECTIONS = [
  { id: "surfaces", index: "01", label: "Surfaces" },
  { id: "controls", index: "02", label: "Controls" },
  { id: "status", index: "03", label: "Status" },
  { id: "motion", index: "04", label: "Motion" },
] as const;

interface SectionProps {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

function Section({
  id,
  index,
  title,
  description,
  icon,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 border-t border-line py-12 sm:py-16"
    >
      <div className="grid gap-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">{index}</span>
          <span className="text-muted">{icon}</span>
        </div>
        <div>
          <div className="grid gap-3 sm:flex sm:items-baseline sm:justify-between sm:gap-8">
            <h2
              id={`${id}-title`}
              className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl"
            >
              {title}
            </h2>
            <p className="max-w-md text-sm leading-6 text-muted">
              {description}
            </p>
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-accent focus:bg-canvas focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        Skip to content
      </a>

      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center border border-line-strong bg-raised">
              <Command aria-hidden="true" className="size-4 text-accent" />
            </div>
            <div className="leading-none">
              <p className="text-sm font-semibold tracking-[-0.02em]">
                Fieldnote
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                Task workspace
              </p>
            </div>
          </div>

          <nav
            aria-label="Foundation sections"
            className="hidden items-center gap-6 lg:flex"
          >
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                {section.index} / {section.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-brand-bright"
            />
            <span>Foundation 01</span>
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="relative overflow-hidden border-b border-line py-14 sm:py-20 lg:py-24">
          <div
            aria-hidden="true"
            className="canvas-grid pointer-events-none absolute inset-0"
          />
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                Phase 06 / Wave 01 · Foundation
              </p>
              <h1 className="mt-6 max-w-[13ch] text-balance text-display font-semibold text-ink">
                A quieter place to get work done
                <span className="text-accent">.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted">
                Fieldnote is a dark, focused workspace for planning and
                finishing the work that matters. This wave sets the type,
                colour, surface, and control system the rest of the product
                will use.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button>
                  Primary action
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Preview only · controls are not wired to the API yet
              </p>
            </div>

            <aside
              aria-label="Design token calibration"
              className="border border-line bg-surface"
            >
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                  Calibration
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                  01 / 04
                </span>
              </div>

              <div className="grid grid-cols-3 gap-px bg-line">
                {PALETTE.map((token) => (
                  <div key={token.label} className="bg-surface p-2">
                    <div
                      className={cn(
                        "h-9 border border-line",
                        token.swatchClassName,
                      )}
                    />
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink">
                      {token.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] text-muted">
                      {token.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-line p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                      Type specimen
                    </p>
                    <p className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-ink">
                      Aa
                    </p>
                  </div>
                  <p className="text-right font-mono text-[9px] uppercase leading-5 tracking-[0.14em] text-muted">
                    System sans
                    <br />
                    Mono / data
                  </p>
                </div>
                <p
                  lang="vi"
                  className="mt-5 text-lg font-medium tracking-[-0.02em] text-ink"
                >
                  Nộp báo cáo thử việc
                </p>
                <p className="mt-1 text-xs text-muted">
                  Vietnamese diacritics · system font stack
                </p>
                <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
                  <p className="font-mono text-2xl tabular-nums tracking-[-0.03em] text-ink">
                    0123456789
                  </p>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                    Tabular
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <Section
          id="surfaces"
          index="01"
          title="Surface hierarchy"
          description="Three quiet planes carry the entire interface. Borders do the work that shadows usually do."
          icon={<Layers3 aria-hidden="true" className="size-3.5" />}
        >
          <div className="grid gap-px border border-line bg-line md:grid-cols-3">
            <article className="bg-canvas p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Canvas
                </span>
                <span
                  aria-hidden="true"
                  className="size-2 border border-line-strong"
                />
              </div>
              <p className="mt-10 text-lg font-medium tracking-[-0.02em] text-ink">
                Page field
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                The lowest layer. Text and controls sit directly on it.
              </p>
              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                #02070A
              </p>
            </article>

            <article className="bg-surface p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Surface
                </span>
                <span
                  aria-hidden="true"
                  className="size-2 border border-line-strong bg-surface"
                />
              </div>
              <p className="mt-10 text-lg font-medium tracking-[-0.02em] text-ink">
                Working panel
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Holds grouped controls, specimens, and future task content.
              </p>
              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                #081015
              </p>
            </article>

            <article className="bg-raised p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Raised
                </span>
                <span
                  aria-hidden="true"
                  className="size-2 border border-line-strong bg-raised"
                />
              </div>
              <p className="mt-10 text-lg font-medium tracking-[-0.02em] text-ink">
                Control plane
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Reserved for inputs, menus, and elements that need lift.
              </p>
              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                #0D1921
              </p>
            </article>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
            <span>Border / #162733</span>
            <span>Strong / #223847</span>
            <span>Hierarchy by line, not shadow</span>
          </div>
        </Section>

        <Section
          id="controls"
          index="02"
          title="Controls"
          description="A small set of controls with deliberate states. Orange marks primary intent; danger stays legible."
          icon={<SlidersHorizontal aria-hidden="true" className="size-3.5" />}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border border-line bg-surface p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Button / variants
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button>
                  Primary
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Delete</Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
                <Button disabled>Disabled</Button>
                <Button isLoading>Saving…</Button>
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
              </div>
              <p className="mt-6 text-sm leading-6 text-muted">
                Dark text on orange reaches 7.39:1. The danger fill uses a
                darker rose so normal text stays above AA.
              </p>
            </div>

            <div className="border border-line bg-surface p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Input / states
              </p>
              <div className="mt-6 grid gap-5">
                <Input
                  label="Search tasks"
                  placeholder="e.g. Nộp báo cáo"
                  hint="Searches the title field."
                />
                <Input
                  label="Email"
                  type="email"
                  defaultValue="not-an-email"
                  error="Enter a valid email address."
                />
                <Input
                  label="Workspace slug"
                  defaultValue="focus"
                  disabled
                  hint="This field is disabled."
                />
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="status"
          index="03"
          title="Status & priority"
          description="Colour appears in the dot and border. Labels stay ink-white so meaning never depends on colour alone."
          icon={<Tags aria-hidden="true" className="size-3.5" />}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border border-line bg-surface p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Workflow
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge tone="neutral" />
                <Badge tone="todo" />
                <Badge tone="in-progress" />
                <Badge tone="done" />
              </div>
              <p className="mt-6 text-sm leading-6 text-muted">
                To do, in progress, and done map directly to the task status
                contract.
              </p>
            </div>

            <div className="border border-line bg-surface p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Priority
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge tone="low" />
                <Badge tone="medium" />
                <Badge tone="high" />
              </div>
              <p className="mt-6 text-sm leading-6 text-muted">
                Priority dots use neutral, amber, and danger. High is the only
                red signal in the system.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="motion"
          index="04"
          title="Motion & focus"
          description="Motion is limited to state feedback. Keyboard focus uses a two-pixel orange ring with a canvas offset."
          icon={<Activity aria-hidden="true" className="size-3.5" />}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border border-line bg-surface p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Spinner / loading
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-8">
                <Spinner />
                <Spinner size="sm" />
                <Button isLoading>Syncing</Button>
              </div>
              <p className="mt-8 text-sm leading-6 text-muted">
                Rotation is motion-safe only. A reduced-motion preference stops
                the loop while the loading state remains readable.
              </p>
            </div>

            <div className="border border-line bg-surface p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Focus / keyboard
              </p>
              <p className="mt-4 text-sm leading-6 text-muted">
                Every interactive element exposes the same focus treatment. Tab
                through the controls to inspect it.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button variant="secondary">Focus target</Button>
                <a
                  href="#controls"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  Jump to controls
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            Fieldnote / Frontend foundation
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            Wave 01 · API {API_BASE_URL}
          </p>
        </div>
      </footer>
    </div>
  );
}
