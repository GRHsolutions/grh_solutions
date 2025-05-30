import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    // Remove 'Bearer ' prefix if present
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

    if (!tokenValue) {
      return res.status(401).json({
        message: 'Invalid token format'
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(tokenValue, 'my_secret') as JwtPayload;
    
    console.log("decoded token: ",decoded);

    // Add userId to the request object
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }
}