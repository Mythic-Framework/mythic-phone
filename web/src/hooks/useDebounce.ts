import { useCallback, useEffect, DependencyList } from 'react';

export const useDebounce = (effect: () => void, delay: number, deps: DependencyList) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(effect, deps);
  useEffect(() => {
    const handler = setTimeout(() => callback(), delay);
    return () => clearTimeout(handler);
  }, [callback, delay]);
};
