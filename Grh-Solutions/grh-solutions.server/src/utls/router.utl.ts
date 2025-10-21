// utils/routeUtils.ts
import { Request } from "express";

export function getCanonicalUrl(req: Request): string {
  // Si Express resolvió la ruta, usamos baseUrl + route.path para mantener params como :id
  try {
    const base = req.baseUrl || "";
    const routePath = (req as any).route?.path; // puede ser undefined
    if (routePath) {
      return `${base}${routePath}`;
    }
  } catch (_) {
    // ignore
  }

  // Fallback: quitar query string de originalUrl
  const original = req.originalUrl || req.url || "";
  return original.split("?")[0];
}

export function getCanonicalMethod(req: Request): string {
  return (req.method || "GET").toUpperCase();
}