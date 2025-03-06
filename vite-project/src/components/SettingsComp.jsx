import React from "react";

import { Button } from "./Button";


const SettingsComp = ()=> {
    return (
        <div className="bg-gray-900 h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <div className="text-8xl text-yellow-400 mb-5 ml-5 mr-5 font-bold italic">Welcome</div>
                <div className="text-xl pt-3 pb-3 text-yellow-400">~ You will be given a random Array and its midpoint</div>
                <div  className="text-xl pt-3 pb-3 text-yellow-400">~ Guess in which part the key will be</div>
                
                <div className="pt-4">
                    <Button label={"Play"} onClick={() => navigate("/game")} />
                </div>
            </div>
        </div>
    );
};

export default SettingsComp;
