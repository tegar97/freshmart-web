const SkeletonLoading = () => {
  return (
    <div className="py-16 relative bg-white">
      <div className="w-FULL">
        <div className="h-80 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="animate-pulse flex flex-col mt-2">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-3"></div>
      </div>
      <div className="animate-pulse flex flex-col mt-2">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-3"></div>
      </div>
      <div className="animate-pulse flex flex-col mt-2">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-3"></div>
      </div>
      <div className="animate-pulse flex flex-col mt-2">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-3"></div>
          </div>
          
    </div>
  );
};

export default SkeletonLoading;