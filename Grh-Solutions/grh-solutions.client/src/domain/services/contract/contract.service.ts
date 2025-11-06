import { Contract } from "../../models/contratos/contratos.entities";

const BASE_URL = "http://localhost:5200/api/contract";

function getToken() {
  const raw = localStorage.getItem("usr_items_token") || "";
  return raw.replace(/^"|"$/g, ""); // 🔥 elimina comillas al inicio/fin
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

// ---------------------------------------------------------------------
// SERVICES
// ---------------------------------------------------------------------

/** Obtener lista completa de contratos */
export function getContracts(signal?: AbortSignal) {
  return request<Contract[]>("/getAll", { method: "GET" }, signal);
}

/** Obtener contrato por ID */
export function getContractById(id: string, signal?: AbortSignal) {
  return request<Contract>(`/getById?id=${id}`, { method: "GET" }, signal);
}

/** Crear un contrato */
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

/** Actualizar contrato */
export function updateContract(id: string, data: Partial<Contract>, signal?: AbortSignal) {
  return request<Contract>(
    "/update",
    {
      method: "PUT",
      body: JSON.stringify({ id, ...data }),
    },
    signal
  );
}

/** Eliminar contrato */
export function deleteContract(id: string, signal?: AbortSignal) {
  return request<{ message: string }>(
    "/delete",
    {
      method: "DELETE",
      body: JSON.stringify({ id }),
    },
    signal
  );
}

export default {
  getContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
};
