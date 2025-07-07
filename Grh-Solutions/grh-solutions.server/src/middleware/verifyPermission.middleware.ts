import { NextFunction, Request, Response } from "express";
import { rolModel } from "../models/rol.model";

export const verifyPermissionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { method, originalUrl, currentRol, isPublic } = req;
    
    // console.log("=== PERMISSION VALIDATION START ===");
    // console.log("Method:", method, "URL:", originalUrl);
    // console.log("isPublic:", isPublic);
    // console.log("currentRol:", currentRol);

    // If it's a public route, skip permission check
    if(isPublic) {
      //console.log("Public route, skipping permission check.");
      //console.log("=== PERMISSION VALIDATION END (PUBLIC) ===");
      return next();
    }

    //console.log("Private route, checking permissions...");

    if (!currentRol) {
      console.log("No role found in request");
      return res.status(401).json({
        success: false,
        message: "User role not found in request.",
      });
    }

    // Find role with populated permissions - FIXED: Proper population
    const rol = await rolModel.findById(currentRol).populate('permissions');

    //console.log("Role found:", rol ? "Yes" : "No");
    if (rol) {
      // console.log("Role name:", rol.name);
      // console.log("Role isActive:", rol.isActive);
      // console.log("Number of permissions:", rol.permissions?.length || 0);
    }

    if (!rol) {
      //console.log("Role not found in database");
      return res.status(403).json({
        success: false,
        message: "Role does not exist.",
      });
    }

    if (!rol.isActive) {
      //console.log("Role is not active");
      return res.status(403).json({
        success: false,
        message: "Role is not active.",
      });
    }

    // FIXED: Improved permission checking logic
    // console.log("Checking permissions...");
    // console.log("Looking for permission with method:", method.toUpperCase(), "and URL:", originalUrl);

    let hasPermission = false;
    
    if (rol.permissions && rol.permissions.length > 0) {
      for (let i = 0; i < rol.permissions.length; i++) {
        const permission = rol.permissions[i] as any;

        // Check if permission matches
        if (permission.ident?.method === method.toUpperCase() && 
            permission.ident?.originalUrl === originalUrl) {
          //console.log("Permission match found!");
          hasPermission = true;
          break;
        }
      }
    } else {
      console.log("No permissions found for this role");
    }

    if (!hasPermission) {
      if (rol.permissions) {
        rol.permissions.forEach((perm: any, index: number) => {
          console.log(`  ${index + 1}. ${perm.ident?.method} ${perm.ident?.originalUrl}`);
        });
      }
      
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions.",
        requested: {
          method: method.toUpperCase(),
          originalUrl,
        }
      });
    }

    // console.log("Permission granted");
    // console.log("=== PERMISSION VALIDATION END (SUCCESS) ===");
    return next();
  } catch (error: any) {
    //console.error("Permission validation error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error validating permissions.",
      error: error.message,
    });
  }
};