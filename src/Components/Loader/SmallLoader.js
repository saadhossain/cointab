import React from 'react';

const SmallLoader = () => {
    return (
        <div className='flex justify-center items-center gap-1'>
            <div className="w-7 h-7 border-2 border-dashed rounded-full animate-spin border-white"></div>
            <h4 className='text-xl font-Shantell text-white'>Loading</h4>
        </div>
    );
};

export default SmallLoader;