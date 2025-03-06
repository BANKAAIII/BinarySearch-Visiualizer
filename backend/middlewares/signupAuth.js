const express = require("express");
const z = require('zod');
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const jwt_secret = process.env.JWT_SECRET;
const {User} = require("../db");

const  zodSignupSchema = require ("../zod/signupSchema");

const router = express.Router();




// Middleware for Signup Validation

function validateSignup  (req, res, next)  {

  const { username, email, password} = req.body;

  // Check if the inputs are present:
  const missingField =[];
  if(!username){ missingField.push("username"); }
  if(!email){ missingField.push("email"); }
  if(!password){ missingField.push("password"); }

  if(missingField.length > 0){
    return res.status(411).json({
        status: "error",
        message: "missing field",
        errors: missingField.map(field => ({
            field,
                // SLICE : Cuts a string from given index to the end or as specified.
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
             
        })
    ) 
    })
  }

  // Do the input validation checks using the Zod Schema:
  const result = zodSignupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: "zod validation failed",
      
      // The error field will give all the error objects present in the errors array
      errors: result.error.errors.map(err => ({
        // The maping is used to convert the errors objects in the array into a new array of objects
        // { error,message }

       // Path is an zod provided array which contains the errors messages if any
        field: err.path[0], 
        message: err.message 
      }))
    });
  }

  next();  // Proceed to the next middleware or route handler
};

//Signin Route :

const signinSchema = z.object ({
  username: z.string()
  .min(2, { message: "username must be atleast more than 2 characters" } )
  .refine( value => /^[A-Z]/.test(value) , {message: "First letter of the username must be capital"} ),
  
  password: z.string()
  .min(8, { message: "Password must have minimum length of 8 char" })
  .refine( value => /[A-Z]/ .test(value) , { message: "Password must contain a Capital Letter"} )
  .refine( value => /[a-z]/ .test(value), { message: "Password must contain a small Letter" })
  .refine( value => /[0=9]/ .test(value) , {message: "Password must contain a number" } )
})

function validateSignin  (req,res,next) {
    
  const {username, password} = req.body;

  const missingField = [];
  
  if(!username)  missingField.push("username");
  if(!password)  missingField.push("password");

  if(missingField.length > 0){
    return res.status(411).json({
      status: error,
      message: "Missing field",
      errors : missingField.map({
        field,
        message: `${field.charAt(0).toUpperCase()+ field.slice(1) } is required`
      })
    })
  }

  const result = signinSchema.safeParse(req.body);

  if(!result){
    return res.status(411).json({
      status: error,
      message: "validation Failed in middleware",
      error: result.error.errors.map({

        field: err.path[0],
        message: err.message
      })
    })
  }

  next();

}



// the userid will be extracted from the token which is stored in the local storage
// Frontend will retrieve the token from the local storage and pass it as header in the request

const IdAttach = (req,res,next)=>{
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
}


module.exports = {
  validateSignup,
  validateSignin,
  IdAttach
} ;