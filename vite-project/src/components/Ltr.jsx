import React from "react";

const Ltr= ({label,hovered})=>{
    return(
        <div dir="ltr">
  <div className={`flex items-center justify-center rounded-s-full w-20 h-20 border-4 bg-yellow-400 ${hovered? 'border-green-500':`border-transparent`} `}>{label}</div>
        </div>
    )
}



export default Ltr;
