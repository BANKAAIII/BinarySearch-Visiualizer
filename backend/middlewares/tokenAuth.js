const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const tokenAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the token is present and properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(411).json({
            status: "error",
            message: "Token is not present in the authorization header"
        });
    }

    try {
        const token = authHeader.split(" ")[1];

        // Verify the token using jwt.verify()
        const decoded = jwt.verify(token, jwt_secret);
        console.log(decoded);
        // Check if the token contains the user ID
        if (!decoded || !decoded.user_id) {
            return res.status(400).json({
                status: "error",
                message: "Invalid token or Jwt_secret import failed or no user_id in token"
            });
        }

        // Attach user ID to the request object for use in other routes
        req.user = { _id: decoded.user_id };
        
        // Proceed to the next middleware or route handler
        next();

    } catch (err) {
        // Catch any error that occurs during verification
        return res.status(500).json({
            status: "error",
            message: "Token verification failed",
            error: err.message
        });
    }
};

module.exports = tokenAuth;
