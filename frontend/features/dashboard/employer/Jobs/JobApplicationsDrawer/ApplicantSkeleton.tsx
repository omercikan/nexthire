const ApplicantSkeleton = () => {
  return (
    <div className="p-3 flex gap-3 border border-transparent rounded-[10px] min-w-0 animate-pulse">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-gray-300 shrink-0" />

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Name + status */}
        <div className="flex items-center gap-2 mb-1">
          <div className="h-3 w-24 bg-gray-300 rounded-md" />
          <div className="h-3 w-12 bg-gray-200 rounded-md" />
        </div>

        {/* Title */}
        <div className="h-2 w-40 bg-gray-200 rounded-md mb-2" />

        {/* Meta */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-20 bg-gray-200 rounded-md" />
          <div className="h-2 w-2 bg-gray-200 rounded-full" />
          <div className="h-2 w-16 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 shrink-0">
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-4 h-4 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ApplicantSkeleton;
