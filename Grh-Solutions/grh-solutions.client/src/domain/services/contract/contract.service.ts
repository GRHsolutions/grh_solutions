import { Contract } from "../../models/contratos/contratos.entities";

const BASE_URL = "/api/contract";

function getToken() {
  const raw = localStorage.getItem("usr_items_token") || "";
  return raw.replace(/^"|"$/g, "");
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error en la solicitud");
  }

  return await res.json();
}

// =====================================================================
// SERVICIOS DE CONTRATOS
// =====================================================================

export function getContracts(signal?: AbortSignal) {
  return request<Contract[]>("/getAll", { method: "GET" }, signal);
}

export function getContractById(id: string, signal?: AbortSignal) {
  return request<Contract>(`/getById?id=${id}`, { method: "GET" }, signal);
}

export function createContract(data: Partial<Contract>, signal?: AbortSignal) {
  return request<Contract>(
    "/create",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    signal
  );
}

// ✅ VERSIÓN CORREGIDA - ID por query parameter (como espera tu backend actual)
export function updateContract(
  id: string,
  data: Partial<Contract>,
  signal?: AbortSignal
) {
  // Crear payload sin el _id
  const payload = { ...data };
  delete (payload as any)._id;

  return request<Contract>(
    `/update?id=${id}`, // ✅ ID por query parameter
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
    signal
  );
}

export function deleteContract(id: string, signal?: AbortSignal) {
  return request<{ message: string }>(
    `/delete?id=${id}`, // ✅ Consistente con el backend
    {
      method: "DELETE",
    },
    signal
  );
}

// =====================================================================
// SERVICIOS PARA LOS SELECTS
// =====================================================================

const BASE_PROFILES = "/api/profiles";
const BASE_TYPES = "/api/typeContract";
const BASE_VACANTS = "/api/vacancies";

async function requestExternal<T>(
  url: string,
  method: string = "GET",
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(url, {
    method,
    signal,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error("Error cargando datos externos");
  return await res.json();
}

export function getLoggedProfile(signal?: AbortSignal) {
  return requestExternal<any>(`${BASE_PROFILES}/getByUserId`, "GET", signal);
}

export function getEmployees(signal?: AbortSignal) {
  return requestExternal<any[]>(`${BASE_PROFILES}/getAll`, "GET", signal);
}

export function getContractTypes(signal?: AbortSignal) {
  return requestExternal<any[]>(`${BASE_TYPES}/getAll`, "GET", signal);
}

export function getVacants(signal?: AbortSignal) {
  return requestExternal<any[]>(`${BASE_VACANTS}/getAll`, "GET", signal);
}

// =====================================================================
// EXPORT DEFAULT
// =====================================================================

export default {
  getContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
  getLoggedProfile,
  getEmployees,
  getContractTypes,
  getVacants,
};