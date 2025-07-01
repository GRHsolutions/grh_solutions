import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { cvService } from '../services/cv.service';
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

    const validationAccess = await permissionUtl.verifyPublicAccess(method, originalUrl);
    req.isPublic = validationAccess;

    if(validationAccess){ // this means method an url are public
      console.log(`method access to ${method} - ${originalUrl} is public, no validations for token`);
      return next(); // <-- ¡Aquí debe ir el return!
    }

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
    
    console.log("decoded token: ", decoded);

    // Add userId to the request object
    req.userId = decoded.id;
    req.currentRol = decoded.rol;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }
}