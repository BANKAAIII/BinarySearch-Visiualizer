import React, { useState } from "react";
import Ltr from "../components/Ltr";
import Rtl from "../components/Rtl";
import MiddleElement from "../components/MiddleElement";
import { Button } from "../components/Button";
import Appbar from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const GamePage = () => {
  const navigate = useNavigate(); // Use the navigate hook from react-router-dom

  function search(numbers, key) {
    let firstHalf = [];
    let secondHalf = [];
    let arrayWithKey = [];
    let arrayWithoutKey = [];
    let mid = Math.floor(numbers.length / 2);

    firstHalf = numbers.slice(0, mid);
    secondHalf = numbers.slice(mid);

    if (numbers.slice(0, mid).includes(key)) {
      arrayWithKey = numbers.slice(0, mid);
      arrayWithoutKey = numbers.slice(mid);
    } else if (numbers.slice(mid).includes(key)) {
      arrayWithKey = numbers.slice(mid);
      arrayWithoutKey = numbers.slice(0, mid);
    }

    return { arrayWithKey, arrayWithoutKey, firstHalf, secondHalf };
  }

  // Load initial data from localStorage
  let arrayString = localStorage.getItem("GameArray");
  const keyString = localStorage.getItem("GameKey");

  // As we stored the data in json we convert it back to string in order to use it.
  const [arrayValue, setArrayValue] = useState(JSON.parse(arrayString || "[]"));
  const keyValue = JSON.parse(keyString || "0");

  // set the default state as false. 
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);

  const fullArray = arrayValue.map((value, index) => {
    if (index === 0) {
      return <Ltr label={`${value}`} key={index} hovered={leftHover} />;
    } else if (index === arrayValue.length - 1) {
      return <Rtl label={`${value}`} key={index} hovered={rightHover} />;
    } else if (index < arrayValue.length / 2) {
      return <MiddleElement label={`${value}`} key={index} hovered={leftHover} />;
    } else {
      return <MiddleElement label={`${value}`} key={index} hovered={rightHover} />;
    }
  });


  // Handle button click
  async function mouseClick(buttonIdentifier) {
    const { firstHalf, secondHalf, arrayWithKey } = search(arrayValue, keyValue);

    console.log("arrayWithKey: " + arrayWithKey);
    console.log("firstHalf: " + firstHalf);
    console.log("secondHalf: " + secondHalf);

    // Update the array based on button click
    // Button Identifier is used to differentiate between the left and the right button.
    
    if (buttonIdentifier === 0 && JSON.stringify(arrayWithKey) === JSON.stringify(firstHalf)) {
      setArrayValue(firstHalf);
      localStorage.setItem("GameArray", JSON.stringify(firstHalf));
    } else if (buttonIdentifier === 1 && JSON.stringify(arrayWithKey) === JSON.stringify(secondHalf)) {
      setArrayValue(secondHalf);
      localStorage.setItem("GameArray", JSON.stringify(secondHalf));
    } else {
      console.error("Invalid selection or key not found in the selected half.");
    }

    // Check if the array has only one element, indicating the end of the game
    if (arrayValue.length === 1) {
      navigate("/result"); // Navigate to the result page
    }
  }

  return (
    <>
      <div>
        <Appbar />
      </div>
      <div className="bg-gray-900 h-screen flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Title label={"Choose!"}></Title>
          <div className="mb-10 text-yellow-400 text-xl">Your key is : {keyValue} </div>

          {/* Render the components in the array */}
          <div className="flex flex-row justify-between space-x-1">
            {fullArray}
          </div>

          <div className="flex flex-row justify-between mt-8">
            <div className="flex justify-center">
              <Button
                label="Left"
                onMouseEnter={() => setLeftHover(true)}
                onMouseLeave={() => setLeftHover(false)}
                onClick={() => mouseClick(0)} // Left button
              />
            </div>
            <div className="flex justify-center">
              <Button
                label="Right"
                onMouseEnter={() => setRightHover(true)}
                onMouseLeave={() => setRightHover(false)}
                onClick={() => mouseClick(1)} // Right button
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
