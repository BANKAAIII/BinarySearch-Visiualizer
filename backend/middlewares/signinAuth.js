// checks:
// 1. Check if any field is missing
// 2. Check if the fields follow the zod validations


const zodSigninSchema = require("../zod/signinSchema");


const validateSignin = (req,res,next)=>{
    const { username,password } = req.body;

    const missingField = [];
    if(!username){ missingField.push("username") };
    if(!password){ missingField.push("password") };

    if(missingField.length > 0){
        return res.status(400),json({
            status:"error",
            message:"missing Field",
            error: missingField.map(field =>({
                field,
                message :`${field.charAt(0).toUpperCase + field.slice(1)}`
            }))
        })
    }

    const payload = req.body;
    const result = zodSigninSchema.safeParse(payload);

    if( !result.success ){
        return res.status(400).json({
            status:"error",
            message:"zod validation failed",
            error: result.error.errors.map(err=>({
                field:err.path[0],
                message:err.message
            }))

        })
    }

    next();
}

module.exports = validateSignin;
