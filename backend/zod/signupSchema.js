const z = require('zod');

const zodSignupSchema = z.object({
    username: z.string()
      .min(2, { message: "Username must be at least 2 characters long" })
      .refine(value => /^[A-Z]/.test(value), { message: "Username must start with an uppercase letter" }),
  
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .refine(value => /[A-Z]/.test(value), { message: "Password must contain at least one uppercase letter" })
      .refine(value => /[a-z]/.test(value), { message: "Password must contain at least one lowercase letter" })
      .refine(value => /[0-9]/.test(value), { message: "Password must contain at least one number" }),
     
  
    email: z.string().email("Invalid email format")
      .refine(value => value.endsWith('.com'), { message: "Only '.com' domains are allowed" })
  });

  module.exports = zodSignupSchema;