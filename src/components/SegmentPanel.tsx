import type { ReactNode } from "react";
import { useSegment, segmentPanelId, segmentTabId, type Segment } from "@/context/SegmentContext";

interface Props {
  value: Segment;
  children: ReactNode;
  className?: string;
  /** Keep DOM mounted when inactive (default: false → unmounted). */
  keepMounted?: boolean;
}

/**
 * Wraps content that belongs to a specific segment.
 * Establishes the tabpanel ↔ tab relationship with SegmentToggle.
 */
export default function SegmentPanel({ value, children, className, keepMounted = false }: Props) {
  const { segment } = useSegment();
  const isActive = segment === value;

  if (!isActive && !keepMounted) return null;

  return (
    <div
      role="tabpanel"
      id={segmentPanelId(value)}
      aria-labelledby={segmentTabId(value)}
      hidden={!isActive}
      className={className}
    >
      {children}
    </div>
  );
}
