export function SkeletonRow() {
  return (
    <li className="border-b border-[#F0EDE9] last:border-0 px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-40 bg-[#F0EDE9] rounded animate-pulse" />
          <div className="h-2.5 w-28 bg-[#F7F5F2] rounded animate-pulse" />
        </div>
        <div className="h-3 w-16 bg-[#F0EDE9] rounded animate-pulse hidden sm:block" />
        <div className="h-6 w-20 bg-[#F0EDE9] rounded-full animate-pulse" />
        <div className="h-4 w-24 bg-[#F0EDE9] rounded animate-pulse" />
        <div className="h-4 w-4 bg-[#F7F5F2] rounded animate-pulse" />
      </div>
    </li>
  );
}
