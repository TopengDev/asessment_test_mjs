import { useEffect } from 'react';

export default function useDebouncer<TValue>({
   value,
   callback,
   ms,
}: {
   value: TValue;
   callback: (val: TValue) => void;
   ms: number;
}) {
   useEffect(() => {
      const timeoutId = setTimeout(() => {
         callback(value);
      }, ms);

      return () => clearTimeout(timeoutId);
   }, [value, callback, ms]);
}
