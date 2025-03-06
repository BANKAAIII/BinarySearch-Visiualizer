import React from "react";

export function Button({ label, onClick, onMouseEnter, onMouseLeave }) {
    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            type="button"
            className="text-xl font-semibold h-20 w-40 bg-yellow-400 hover:bg-yellow-600 text-black rounded-full mt-5 mb-5 ml-5 mr-5"
        >
            {label}
        </button>
    );
}
