import React from "react";

const MiddleElement = ({ hovered , label }) => {
    return (
        <div className={`flex justify-center items-center w-20 h-20 bg-yellow-400 border-4  transition-colors duration-300 ${hovered ? 'border-green-500' : 'border-transparent'}`}>
           {label}
        </div>
    );
};

export default MiddleElement;
