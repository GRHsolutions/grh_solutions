import axios, { AxiosRequestConfig } from "axios";
import { localStorageUtil } from "../../utils/localStorage";


const getHeaderItems = async() => {
  const token = await localStorageUtil.get("usr_items_token")
  return {
    "Content-Type": "application/json;charset=utf-8", // especificar el content-type
     Authorization: token != null ? `Bearer ${token}` : null, // entregar el token a authorization
  }
}

let globalLogout: (() => void) | null = null;

export const setLogout = (logoutFn: () => void) => {
  globalLogout = logoutFn;
};

axios.interceptors.response.use(
  // controlar los codigos de respuesta, luego hay que hacer interceptores en ciertos casos
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      const url = error.config.url;

      switch (status) {
        case 400:
          console.error(`Error 400: Bad Request. URL: ${url}`, data);
          break;
        case 401:
          if (globalLogout) {
            console.log("loggin out")
            globalLogout(); 
          }
          console.error(`Error 401: Unauthorized. URL: ${url}`, data);
          break;
        case 403:
          console.error(
            `Error 403: Forbidden. Access denied. URL: ${url}`,
            data
          );
          break;
        case 404:
          console.error(`Error 404: Not Found. URL: ${url}`, data);
          break;
        case 500:
          console.error(`Error 500: Internal Server Error. URL: ${url}`, data);
          break;
        default:
          console.error(`Error ${status}: ${error.message}. URL: ${url}`, data);
          break;
      }
    } else if (error.request) {
      console.error(`No response received for request to ${error.config.url}.`);
    } else {
      console.error("Request configuration error:", error.message);
    }

    return Promise.reject(error);
  }
);

const makeRequest = async <T>(
  config: AxiosRequestConfig,
  signal?: AbortSignal
): Promise<T> => {
  try {
    // Añadir el signal al config si está presente
    if (signal) {
      config.signal = signal;
    }
    const response = await axios(config);
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    return response.data as T;
  } catch (error: any) {
    if (error && typeof error === "object" && "response" in error) {
      throw (error as { response: { data: T } }).response.data;
    } else {
      throw (error as Error)?.message || "An unexpected error occurred.";
    }
  }
};

const get = async <T>(
  url: string,
  params: Object = {},
  signal?: AbortSignal
) => {
  const headers = await getHeaderItems();
  const config: AxiosRequestConfig = {
    method: "GET",
    url,
    headers: headers,
    params,
  };
  return await makeRequest<T>(config, signal);
};

const post = async <T>(url: string, body: any) => {
  const headers = await getHeaderItems();

  const config: AxiosRequestConfig = {
    method: "POST",
    url,
    headers: headers,
    data: body,
  };
  return await makeRequest<T>(config);
};

const put = async <T>(url: string, body: any) => {
  const headers = await getHeaderItems();

  const config: AxiosRequestConfig = {
    method: "PUT",
    url,
    headers: headers,
    data: body,
  };
  return await makeRequest<T>(config);
};

const _delete = async <T>(url: string) => {
  const headers = await getHeaderItems();

  const config: AxiosRequestConfig = {
    method: "DELETE",
    url,
    headers: headers,
  };
  return await makeRequest<T>(config);
};

export const http = {
  get,
  post,
  put,
  delete: _delete,
  setLogout
};
