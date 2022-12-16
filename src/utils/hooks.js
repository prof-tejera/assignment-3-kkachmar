import { useState, useEffect } from 'react';

export const usePersistedState = (storageKey, fallbackValue) => {
    const [value, setValue] = useState(() => {
      const storedValue = window.localStorage.getItem(storageKey);
  
      if (storedValue === null || !storedValue) {
        return fallbackValue;
      }
  
      try {
        return JSON.parse(storedValue);
      } catch (e) {
        return null;
      }
    });
  
    useEffect(() => {
      if (value) {
        window.localStorage.setItem(storageKey, JSON.stringify(value));
      } else {
        window.localStorage.removeItem(storageKey);
      }
    }, [value, storageKey]);
  
    return [
      value,
      setValue,
      () => {
        setValue(fallbackValue);
      },
    ];
  };