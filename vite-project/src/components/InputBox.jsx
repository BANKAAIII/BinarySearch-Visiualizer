import React from "react";

const Inputbox = ({label,type,name,onChange,value})=>{
    return(
        <div>
            <label className="text-sm w-full font-medium text-left py-2">{label}</label>
            <input 
            type={type} 
            placeholder={name} 
            onChange={onChange} 
            value={value}
            
            className="w-50 px-2 py-1 border rounded-full  border-zinc-500"></input>
        </div>
    )
}

export default Inputbox