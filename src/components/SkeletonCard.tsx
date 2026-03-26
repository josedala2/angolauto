export function SkeletonVehicleCard() {
  return (
    <div className="glass-card rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-video bg-muted" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-muted rounded" />
          <div className="h-3 w-12 bg-muted rounded-full" />
        </div>
        <div className="h-5 w-3/4 bg-muted rounded" />
        <div className="h-3 w-full bg-muted rounded" />
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col items-center gap-1">
              <div className="h-4 w-4 bg-muted rounded" />
              <div className="h-2.5 w-10 bg-muted rounded" />
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-3 border-t border-border/50">
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-3 w-16 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonNewsCard() {
  return (
    <div className="glass-card rounded-lg overflow-hidden animate-pulse h-full">
      <div className="aspect-video bg-muted" />
      <div className="p-5 space-y-3">
        <div className="flex gap-3">
          <div className="h-4 w-20 bg-muted rounded-full" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
        <div className="h-5 w-4/5 bg-muted rounded" />
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-3 w-3/4 bg-muted rounded" />
        </div>
        <div className="h-3 w-16 bg-muted rounded" />
      </div>
    </div>
  );
}
