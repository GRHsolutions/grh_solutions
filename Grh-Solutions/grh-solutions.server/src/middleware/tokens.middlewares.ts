import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { permissionUtl } from '../utls/permission.utl';

interface JwtPayload {
  id: string;
  email: string;
  rol: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      currentRol?: string;
      isPublic?: boolean;
    }
  }
}

export const validateToken = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const method = req.method;
    const originalUrl = req.originalUrl;

    console.log("=== TOKEN VALIDATION START ===");
    console.log(`Method: ${method}, URL: ${originalUrl}`);

    // Check if this is a public route
    const validationAccess = await permissionUtl.verifyPublicAccess(method, originalUrl);
    console.log(`Is public access: ${validationAccess}`);
    req.isPublic = validationAccess;

    if(validationAccess) {
      console.log(`Route ${method} - ${originalUrl} is public, skipping token validation`); 
      console.log("=== TOKEN VALIDATION END (PUBLIC) ===");
      return next();
    }

    console.log("Route is private, validating token...");

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    // Remove 'Bearer ' prefix if present
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

    if (!tokenValue) {
      console.log("Invalid token format");
      return res.status(401).json({
        message: 'Invalid token format'
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(tokenValue, 'my_secret') as JwtPayload;
    
    console.log("Token decoded successfully:", { id: decoded.id, email: decoded.email, rol: decoded.rol });

    // Add userId to the request object
    req.userId = decoded.id;
    req.currentRol = decoded.rol;

    console.log("=== TOKEN VALIDATION END (SUCCESS) ===");
    next();
  } catch (error) {
    console.log("Token validation error:", error);
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }
}