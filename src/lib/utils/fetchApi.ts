'use server';

type TFetchApiParams<TBody> = {
   url: string;
   queryParams?: Record<string, string>;
} & ({ method: 'GET' } | { method: 'POST' | 'PUT' | 'DELETE'; body: TBody });

export async function fetchApi<TBody>(params: TFetchApiParams<TBody>) {
   try {
      const queryParamsString =
         params.queryParams && Object.keys(params.queryParams).length
            ? '?' +
              Object.entries(params.queryParams)
                 .map(
                    ([key, value]) =>
                       `${encodeURIComponent(key)}=${encodeURIComponent(
                          String(value),
                       )}`,
                 )
                 .join('&')
            : '';

      const response = await fetch(`${params.url}${queryParamsString}`, {
         method: params.method,
         headers: {
            'Content-Type': 'application/json',
         },
         body:
            params.method === 'GET'
               ? undefined
               : JSON.stringify(params?.body || {}),
      });

      if (!response.ok) {
         throw new Error(`Fetch failed with status: ${response.status}`);
      }

      const result = await response.json();
      return result;
   } catch (err) {
      console.error({ err });
      return undefined;
   }
}
