import React from 'react'

function LoadingButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className={`bg-primary-green text-white px-4 py-2 rounded-lg w-full ${"opacity-50"}`}
      disabled
    >
      {children}
    </button>
  );
}

export default LoadingButton