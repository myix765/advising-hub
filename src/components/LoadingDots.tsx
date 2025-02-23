'use client';

export default function LoadingDots() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-loading-1"></div>
      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-loading-2"></div>
      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-loading-3"></div>
    </div>
  );
}
