import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { formatDateTime } from "../../lib/date";
import { cn } from "../../lib/utils";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";
import { Badge } from "../ui/Badge";
import type { BadgeTone } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";

interface TaskItemRowProps {
  task: Task;
  isUpdatingStatus?: boolean;
  isHighlighted?: boolean;
  onViewDetails?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onStatusChange?: (task: Task, nextStatus: TaskStatus) => Promise<void>;
}

const STATUS_PRESENTATION: Record<
  TaskStatus,
  { label: string; tone: BadgeTone }
> = {
  TODO: { label: "Cần làm", tone: "todo" },
  IN_PROGRESS: { label: "Đang làm", tone: "in-progress" },
  DONE: { label: "Hoàn thành", tone: "done" },
};

const PRIORITY_PRESENTATION: Record<
  TaskPriority,
  { label: string; tone: BadgeTone }
> = {
  HIGH: { label: "Cao", tone: "high" },
  MEDIUM: { label: "Trung bình", tone: "medium" },
  LOW: { label: "Thấp", tone: "low" },
};

const STATUS_OPTIONS: ReadonlyArray<{ value: TaskStatus; label: string }> = [
  { value: "TODO", label: "Cần làm" },
  { value: "IN_PROGRESS", label: "Đang làm" },
  { value: "DONE", label: "Hoàn thành" },
];

const CELL_CLASS =
  "border-b border-line px-4 py-3 last:border-b-0 md:border-0 md:px-5 md:py-4 md:align-top";

function CellLabel({ children }: { children: string }) {
  return (
    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted md:hidden">
      {children}
    </span>
  );
}

export function TaskItemRow({
  task,
  isUpdatingStatus = false,
  isHighlighted = false,
  onViewDetails,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskItemRowProps) {
  const [prevTaskStatus, setPrevTaskStatus] = useState(task.status);
  const [optimisticStatus, setOptimisticStatus] = useState<TaskStatus | null>(
    null,
  );

  if (prevTaskStatus !== task.status) {
    setPrevTaskStatus(task.status);
    setOptimisticStatus(null);
  }

  const currentStatus = optimisticStatus ?? task.status;
  const status = STATUS_PRESENTATION[task.status];
  const priority = PRIORITY_PRESENTATION[task.priority];

  async function handleStatusSelect(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const nextStatus = event.target.value as TaskStatus;

    if (nextStatus === currentStatus || isUpdatingStatus) {
      return;
    }

    setOptimisticStatus(nextStatus);

    if (!onStatusChange) {
      return;
    }

    try {
      await onStatusChange(task, nextStatus);
    } catch {
      setOptimisticStatus(null);
    }
  }

  return (
    <tr
      id={`task-row-${task.id}`}
      data-highlighted={isHighlighted ? "true" : undefined}
      className={cn(
        "block overflow-hidden border transition-colors duration-300 last:border-b-0 md:table-row md:border-x-0 md:border-t-0 md:border-b md:border-line",
        isHighlighted
          ? "border-accent bg-accent/10 ring-1 ring-accent/60 md:bg-accent/10 motion-safe:animate-pulse"
          : "border-line bg-surface md:bg-transparent md:hover:bg-raised/40",
      )}
    >
      <td className={`${CELL_CLASS} block md:table-cell`}>
        <p className="break-words text-sm font-semibold leading-6 text-ink">
          {task.title}
        </p>
        <p className="mt-1 break-words text-xs leading-5 text-muted">
          {task.description || "Không có mô tả"}
        </p>
      </td>

      <td
        className={`${CELL_CLASS} flex items-start justify-between gap-4 md:table-cell`}
      >
        <CellLabel>Trạng thái</CellLabel>
        <Badge tone={status.tone}>{status.label}</Badge>
      </td>

      <td
        className={`${CELL_CLASS} flex items-start justify-between gap-4 md:table-cell`}
      >
        <CellLabel>Ưu tiên</CellLabel>
        <Badge tone={priority.tone}>{priority.label}</Badge>
      </td>

      <td
        className={`${CELL_CLASS} flex items-start justify-between gap-4 md:table-cell`}
      >
        <CellLabel>Hạn chót</CellLabel>
        <time
          dateTime={task.due_date ?? undefined}
          className="text-right text-xs leading-5 text-muted md:text-left"
        >
          {formatDateTime(task.due_date, "vi-VN", "Chưa đặt hạn")}
        </time>
      </td>

      <td
        className={`${CELL_CLASS} flex items-start justify-between gap-4 md:table-cell`}
      >
        <CellLabel>Cập nhật</CellLabel>
        <time
          dateTime={task.updated_at}
          className="text-right text-xs leading-5 text-muted md:text-left"
        >
          {formatDateTime(task.updated_at, "vi-VN")}
        </time>
      </td>

      <td
        className={`${CELL_CLASS} flex flex-wrap items-center justify-between gap-2 md:table-cell md:text-right`}
      >
        <CellLabel>Thao tác</CellLabel>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <div className="relative inline-flex items-center">
            <select
              value={currentStatus}
              disabled={isUpdatingStatus}
              aria-label={`Đổi trạng thái cho "${task.title}"`}
              aria-busy={isUpdatingStatus || undefined}
              onChange={handleStatusSelect}
              className="h-8 appearance-none rounded-[2px] border border-line-strong bg-canvas pl-2.5 pr-7 font-mono text-[11px] text-ink transition-colors duration-150 hover:border-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-55"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {isUpdatingStatus ? (
              <span className="pointer-events-none absolute right-2 inline-flex items-center">
                <Spinner size="sm" label="Đang cập nhật" className="size-3 text-muted" />
              </span>
            ) : (
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-2 size-3 text-muted"
              />
            )}
          </div>

          {onViewDetails ? (
            <Button
              variant="ghost"
              onClick={() => onViewDetails(task)}
              aria-label={`Xem chi tiết "${task.title}"`}
              className="h-8 px-2.5 text-xs"
            >
              Chi tiết
            </Button>
          ) : null}

          {onEdit ? (
            <Button
              variant="ghost"
              onClick={() => onEdit(task)}
              aria-label={`Chỉnh sửa "${task.title}"`}
              className="h-8 px-2.5 text-xs"
            >
              Chỉnh sửa
            </Button>
          ) : null}

          {onDelete ? (
            <Button
              variant="ghost"
              onClick={() => onDelete(task)}
              aria-label={`Xóa "${task.title}"`}
              className="h-8 px-2.5 text-xs text-danger-ink hover:border-danger/30 hover:bg-danger/10"
            >
              Xóa
            </Button>
          ) : null}
        </div>
      </td>
    </tr>
  );
}
