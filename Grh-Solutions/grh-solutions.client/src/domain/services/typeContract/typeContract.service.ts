import { TypeContract } from "../../models/typeContract/typeContract.entities";

const BASE_URL = import.meta.env.VITE_API_URL + "/typeContract"; // Ajusta si tu endpoint es otro

function getToken() {
  return localStorage.getItem("token") || "";
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(BASE_URL + endpoint, {
    ...options,
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error en la solicitud");
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------
//  SERVICES
// ---------------------------------------------------------------------

/**
 * Obtener lista de tipos de contrato
 */
export function getTipoContratos(params?: Record<string, any>, signal?: AbortSignal) {
  const query = params
    ? "?" +
      Object.entries(params)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&")
    : "";
  return request<TypeContract[]>(`${query}`, { method: "GET" }, signal);
}

/**
 * Obtener tipo contrato por ID
 */
export function getTipoContratoById(id: string, signal?: AbortSignal) {
  return request<TypeContract>(`/${id}`, { method: "GET" }, signal);
}

/**
 * Crear tipo contrato
 */
export function createTipoContrato(data: Partial<TypeContract>, signal?: AbortSignal) {
  return request<TypeContract>(
    "",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    signal
  );
}

/**
 * Actualizar tipo contrato
 */
export function updateTipoContrato(id: string, data: Partial<TypeContract>, signal?: AbortSignal) {
  return request<TypeContract>(
    `/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    signal
  );
}

/**
 * Eliminar tipo contrato
 */
export function deleteTipoContrato(id: string, signal?: AbortSignal) {
  return request<{ message: string }>(
    `/${id}`,
    {
      method: "DELETE",
    },
    signal
  );
}

export default {
  getTipoContratos,
  getTipoContratoById,
  createTipoContrato,
  updateTipoContrato,
  deleteTipoContrato,
};
