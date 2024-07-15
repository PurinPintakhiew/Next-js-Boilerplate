import React from 'react';

const Preloading = ({ isLoading }: any) => {
  return (
    <div
      className={`${isLoading ? 'block' : 'hidden'} fixed left-0 top-0 z-50 size-full bg-white opacity-75`}
    >
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="mt-2 text-center text-gray-600">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Preloading;
