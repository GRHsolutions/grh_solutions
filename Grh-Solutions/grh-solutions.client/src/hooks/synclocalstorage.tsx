import { useEffect, useState } from 'react'

export function useSyncedLocalStorage<T>(key: string, initialValue: T): T {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
        setValue(newValue);
      }
    };

    const syncLocal = () => {
      const item = localStorage.getItem(key);
      setValue(item ? JSON.parse(item) : initialValue);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-sync', syncLocal);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-sync', syncLocal);
    };
  }, [key, initialValue]);

  return value;
}
