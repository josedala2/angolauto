import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Segment = "particulares" | "empresas";

export const segmentTabId = (s: Segment) => `segment-tab-${s}`;
export const segmentPanelId = (s: Segment) => `segment-panel-${s}`;

interface SegmentContextValue {
  segment: Segment;
  setSegment: (s: Segment) => void;
  isEmpresa: boolean;
}

const SegmentContext = createContext<SegmentContextValue>({
  segment: "particulares",
  setSegment: () => {},
  isEmpresa: false,
});

const STORAGE_KEY = "segment";

export function SegmentProvider({ children }: { children: ReactNode }) {
  const [segment, setSegmentState] = useState<Segment>(() => {
    if (typeof window === "undefined") return "particulares";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "empresas" ? "empresas" : "particulares";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, segment);
    } catch {
      // ignore
    }
  }, [segment]);

  const setSegment = (s: Segment) => setSegmentState(s);

  return (
    <SegmentContext.Provider value={{ segment, setSegment, isEmpresa: segment === "empresas" }}>
      {children}
    </SegmentContext.Provider>
  );
}

export function useSegment() {
  return useContext(SegmentContext);
}
