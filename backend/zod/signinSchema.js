const z = require('zod');



const zodSigninSchema = z.object({
    username : z.string()
    .min(2, { message: "username must me more than 2 characters" } )
    .refine((value) => /^[A-Z]/ .test(value), {message : " Username's First character must be capital "}),

    password: z.string()
    .min(8,{ message: " password must be atleast 8 characters long " })
    .refine( value => /[A-Z]/ .test(value) , { message: "Password must contain atleast one capital letter" } )
    .refine( value => /[a-z]/ .test(value) , { message: "Password must contain atleast one small letter" } )
    .refine( value => /[0-1]/ .test(value) ,{ message: "Password must constain atleast ine number"} ),
}
)

module.exports = zodSigninSchema;