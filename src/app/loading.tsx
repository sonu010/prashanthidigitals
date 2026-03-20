export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-light-bg">
      <div className="text-center">
        {/* Animated camera shutter spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div className="absolute inset-3 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
        <p className="text-gray-500 font-medium text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
