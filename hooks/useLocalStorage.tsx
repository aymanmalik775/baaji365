import { useState } from 'react';

function useLocalStorage<TValue>(
  key: string,
  initValue: TValue,
  parse?: (item: any) => TValue
): [TValue, (value: TValue) => void, () => void] {
  const [stateValue, setStateValue] = useState<TValue>(() => {
    try {
      const item = localStorage.getItem(key);

      if (!item) {
        return initValue;
      }

      if (parse) {
        return parse(JSON.parse(item));
      }

      if ((typeof initValue as any).getMonth === 'function') {
        return Date.parse(item);
      }

      return JSON.parse(item);
    } catch (error) {
      console.log(error);
      return initValue;
    }
  });

  const setValue = (value: TValue) => {
    try {
      setStateValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteValue = () => localStorage.removeItem(key);

  return [stateValue, setValue, deleteValue];
}

export default useLocalStorage;
