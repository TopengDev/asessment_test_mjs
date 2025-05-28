'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function SearchBar() {
   const [query, setQuery] = useState('');
   const router = useRouter();

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      router.push(
         `?page=1&limit=5&keyword=${encodeURIComponent(query.trim())}`,
      );
   }

   return (
      <div className="w-full">
         <form
            onSubmit={handleSubmit}
            className="flex items-center border rounded-lg overflow-hidden shadow-sm"
         >
            <input
               type="text"
               placeholder="Search..."
               className="w-full px-4 py-2 focus:outline-none"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" className="hover:cursor-pointer">
               Search
            </Button>
         </form>
      </div>
   );
}
