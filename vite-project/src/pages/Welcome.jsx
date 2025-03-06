import React, { useEffect } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import dataArrayAtom from "../store/dataArray";
import dataKeyAtom from "../store/datakey";
import axios from "axios";

const Welcome = () => {
    const navigate = useNavigate();
    const setDataArray = useSetRecoilState(dataArrayAtom); // Set function only
    const setDataKey = useSetRecoilState(dataKeyAtom);

    // the error is in setting the Game key as directly the value and not the index in the array

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/search/generate");

        let array=[];
         array = response.data.array;    
        let keyIndex = response.data.key;  
        let gameKey = array[keyIndex]  

        localStorage.setItem("GameKey",JSON.stringify(gameKey));
        localStorage.setItem("GameArray",JSON.stringify(array));
        
            setDataArray(array);
            setDataKey(gameKey);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };

    // Now mount the component using an empty dependancy array so the component is mounted only once and the generateion happend onlyu once the game when the page is opened.
    
    useEffect(() => {
        fetchData();
    }, []); 
  
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

export default Welcome;
