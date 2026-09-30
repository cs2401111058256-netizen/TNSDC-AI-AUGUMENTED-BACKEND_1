const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied: Missing authentication credentials." 
      });
    }

    const token = authHeader.split(' ')[1];

    // Verifying token using the exact same secret from .env
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    
    req.user = decoded; // attaching user data to request
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid session signature or token expired." 
    });
  }
};

module.exports = authMiddleware;