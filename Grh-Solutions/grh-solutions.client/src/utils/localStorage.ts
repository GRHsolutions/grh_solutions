export const localStorageUtil = {
    get: <T>(key: string): T | null => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) as T : null;
      } catch (error) {
        console.error(`Error al obtener el valor de localStorage para la clave "${key}":`, error);
        return null;
      }
    },
  
    set: <T>(key: string, value: T): void => {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error(`Error al guardar el valor en localStorage para la clave "${key}":`, error);
      }
    },
  
    remove: (key: string): void => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error al eliminar el valor de localStorage para la clave "${key}":`, error);
      }
    },
  
    clear: (): void => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error("Error al limpiar localStorage:", error);
      }
    },

    deleteExclude: (sxc: string[]): void => {
      try {
        // Recorre todas las claves de localStorage
        Object.keys(localStorage).forEach((key) => {
          // Si la clave no está en el arreglo 'sxc', la eliminamos
          if (!sxc.includes(key)) {
            localStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.error("Error al limpiar localStorage:", error);
      }
    }
  };