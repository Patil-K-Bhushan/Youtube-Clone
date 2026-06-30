const ShimmerCard = () => (
  <div className="animate-pulse">
    <div className="aspect-video w-full rounded-xl bg-gray-200" />
    <div className="mt-3 flex gap-3">
      <div className="h-9 w-9 shrink-0 rounded-full bg-gray-200" />
      <div className="w-full space-y-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  </div>
);

export default ShimmerCard;
