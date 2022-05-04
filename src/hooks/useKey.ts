import { useEffect } from "react";

const useKey = (key: string, fn: any) => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEventInit) => {
      if (event.key === key) {
        fn();
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [fn, key]);
};

export default useKey;
