const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");
const Hospital = require("../models/hospital");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 1. Check token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // 2. Extract token
        const token = authHeader.split(" ")[1];

        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Identify user type (patient / hospital)
        let user = null;

        if (decoded.role === "patient") {
            user = await Patient.findById(decoded.id).select("-password");
        } 
        else if (decoded.role === "hospital") {
            user = await Hospital.findById(decoded.id).select("-password");
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // 5. Attach to request
        req.user = user;
        req.role = decoded.role;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;