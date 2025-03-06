// This middleware will be used to check if the inputs are adhereing to zod schema

const zodUpdateSchema = require("../zod/UpdateSchema");

const validateUpdate = ( req,res,next )=> {
    
    const {success} = req.body;
    const result = zodUpdateSchema.safeParse(success);

    if(!result){
        return res.status(400).json({
            status:"error",
            message:"zod Valiation failed",
            error: result.error.errors.map(err=>({
                field: err.path[0],
                message:err.message
            })) 
        })
    }
    next();
}

module.exports = validateUpdate;