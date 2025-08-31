import React from "react";  
import loadingIcon from '@/assets/loading.svg'; // or use the uploaded spinning-dots.svg

export const Loading = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <img src={loadingIcon} alt="Loading..." className="w-28 h-28 " />
        </div>
    );
};
