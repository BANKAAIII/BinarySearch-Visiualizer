import React from "react";

import { Button } from "../components/Button";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();
    return (
        <div className="bg-gray-900 h-screen justify-center">
            <div className="flex flex-col items-center">
                 <div>
             <Title  label={"Binary Search"}/>
                 </div>
                 <div className="flex justify-center">
                 <Button label={"play"} onClick={()=>{
                    navigate("/signup")
                 }}/>
                 </div>
            </div>
        </div>
    )
}

export default Dashboard