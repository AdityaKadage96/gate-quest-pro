import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {

  // ---------------------------------------
  // Load initial value from localStorage
  // ---------------------------------------

  const [value, setValue] = useState(() => {

    try {

      const savedValue =
        localStorage.getItem(key);

      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }

      return initialValue;

    } catch (error) {

      console.error(
        `Error reading ${key} from localStorage:`,
        error
      );

      return initialValue;
    }
  });


  // ---------------------------------------
  // Save value whenever it changes
  // ---------------------------------------

  useEffect(() => {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

    } catch (error) {

      console.error(
        `Error saving ${key} to localStorage:`,
        error
      );

    }

  }, [key, value]);


  return [value, setValue];
}

export default useLocalStorage;