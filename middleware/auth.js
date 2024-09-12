const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token required or malformed" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "secret_key");
        req.user = { id: decoded.userId }; // Ensure `id` is correctly set here
        console.log("User from auth middleware:", req.user);
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid Token" });
    }
};

module.exports = auth;
