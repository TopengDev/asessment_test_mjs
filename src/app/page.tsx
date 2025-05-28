import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   // TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { getUsers } from '@/services/user/actions';

export default async function Home({
   searchParams,
}: {
   searchParams: { page?: string; limit?: string };
}) {
   const params = await searchParams;

   const page = parseInt(params?.page || '1');
   const limit = parseInt(params?.limit || '10');

   const usersResponse = await getUsers({
      page,
      limit,
   });

   const users = usersResponse.data;
   const pageInfo = usersResponse.pageInfo;

   return (
      <div className="w-screen h-screen overflow-y-scroll flex items-center justify-center">
         <div className=" w-full sm:max-w-[640px] lg:max-w-[768px] 2xl:max-w-[1024px]">
            <Table>
               <TableCaption>
                  {' '}
                  Page {pageInfo.page} of {pageInfo.totalPages} with a total of{' '}
                  {pageInfo.total} entries .
               </TableCaption>
               <TableHeader>
                  <TableRow>
                     <TableHead>ID</TableHead>
                     <TableHead>Full Name</TableHead>
                     <TableHead className="text-right">Birth Date</TableHead>
                     <TableHead>Address</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {(users || [])?.map((user) => (
                     <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                           {user.firstname +
                              (user?.lastname ? ` ${user.lastname}` : '')}
                        </TableCell>
                        <TableCell className="text-right">
                           {user.birthdate}
                        </TableCell>
                        <TableCell>
                           {`${
                              user.address?.province
                                 ? user.address?.province + ', '
                                 : ''
                           }${
                              user.address?.city
                                 ? user.address?.city + ', '
                                 : ''
                           }${
                              user.address?.postal_code
                                 ? user.address?.postal_code + ', '
                                 : ''
                           }${
                              user.address?.street ? user.address?.street : ''
                           }`}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            <div className="flex items-center justify-between mt-4 gap-4">
               <a
                  href={`?page=${Math.max(1, page - 1)}&limit=${limit}`}
                  className={`py-2 px-4 flex items-center justify-center rounded-lg ${
                     page === 1
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-700 hover:text-slate-200'
                  } transition-all duration-100`}
               >
                  Prev
               </a>

               <a
                  href={`?page=${Math.min(
                     page + 1,
                     pageInfo.totalPages,
                  )}&limit=${limit}`}
                  className={`py-2 px-4 flex items-center justify-center rounded-lg ${
                     page >= pageInfo.totalPages
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-700 hover:text-slate-200'
                  } transition-all duration-100`}
               >
                  Next
               </a>
            </div>
         </div>
      </div>
   );
}
