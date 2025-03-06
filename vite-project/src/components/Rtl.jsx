import React from "react";

const Rtl= ({label,hovered})=>{
    return(
        <div dir="rtl">
        <div className={`flex items-center justify-center rounded-s-full border-4 bg-yellow-400 w-20 h-20 ${hovered? `border-green-500`:`border-transparent`}`}>{label}</div>
      </div>
    )
}



export default Rtl;
