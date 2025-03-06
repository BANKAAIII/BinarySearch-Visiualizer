const express = require("express");
const router = express.Router();
const { User, Result, ScoreCard } = require("../db");
const { number } = require("zod");
const tokenAuth = require("../middlewares/tokenAuth");

// first Generate an array of random numbers for the Search array

function numberGeneration(){
    const numbers = [];

    for(let i =0; i<8; i++){
        numbers[i] = Math.floor(Math.random() * 10);
    }

    return numbers;
}

function keyGeneration(numbers){
    // here we basically generate a index 
    const key = Math.floor( Math.random() * numbers.length);
    return key;
}


// The Search api will accept an array and a key
// Break the Array into to equal ones
// return an array with and without key




// function to seperate Bearer from the token and getting the user id from the token by verifying i
// generate array and the key
// one route for breaking the array and getting two arrays
// one route to update the score based on selection
// one route to get the final scoreCard

router.get("/generate", async( req,res )=>{
    let array = [];
     array = numberGeneration();
    const key = keyGeneration(array);

try{
    return res.status(200).json({
        array,key
    })
    }catch(error){
        return res.status(500).json({
            message: "error while generating array and key",
            error: error.message
        })
    }

})




module.exports = router;