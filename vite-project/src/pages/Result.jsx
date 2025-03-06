import React from "react";

import Title from "../components/Title";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

const Result =() =>{
   
    const navigate = useNavigate();
    return (
        <div className="bg-gray-900 h-screen justify-center">
            <div className="flex flex-col items-center">
                <Title label={"You have Completed the Game!"}/>
               
              
             
            </div>
            <div className="flex justify-center">
              
                <Button label={"Play Again!"} onClick={()=>{
                    navigate("/welcome")
                }}/>
            </div>
        </div>
    )
}

export default Result