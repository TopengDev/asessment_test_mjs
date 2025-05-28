'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { createUser, getUserById } from '@/services/user/actions';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
   firstname: z
      .string()
      .min(2, { message: 'Firstname must be at least 2 characters long' })
      .max(50, { message: 'Firstname must be less than 50 characters' }),
   lastname: z
      .string()
      .max(50, { message: 'Lastname must be less than 50 characters' })
      .optional()
      .or(z.literal('')), // Allow empty string
   birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Birthdate must be in YYYY-MM-DD format',
   }),
   address: z.object({
      street: z
         .string()
         .min(5, { message: 'Street address must be at least 5 characters' }),
      city: z
         .string()
         .min(2, { message: 'City must be at least 2 characters' }),
      province: z
         .string()
         .min(2, { message: 'Province must be at least 2 characters' }),
      postal_code: z
         .string()
         .min(4, { message: 'Postal code must be at least 4 characters' })
         .max(10, { message: 'Postal code must be less than 10 characters' }),
   }),
});

export default function Page() {
   const { id } = useParams<{ id: string }>();
   const router = useRouter();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstname: '',
         lastname: '',
         birthdate: '',
         address: {
            city: '',
            postal_code: '',
            province: '',
            street: '',
         },
      },
   });

   async function onSubmit(data: any) {
      try {
         await createUser(data);

         router.back();
      } catch (err: any) {
         toast(err.toString());
      }
   }

   const fetchUser = async function () {
      try {
         const response = await getUserById({ id: parseInt(id) });

         form.reset({
            firstname: response?.firstname || '',
            lastname: response?.lastname || '',
            birthdate: response?.birthdate || '',
            address: {
               city: response?.address?.city || '',
               postal_code: response?.address?.postal_code || '',
               province: response?.address?.province || '',
               street: response?.address?.street || '',
            },
         });
      } catch (err: any) {
         toast(err.toString());
      }
   };

   useEffect(() => {
      if (id) fetchUser();
   }, [id]);

   return (
      <div className="w-screen h-screen flex items-center justify-center">
         <div className="w-full sm:max-w-[640px] lg:max-w-[768px] 2xl:max-w-[1024px]">
            <Card>
               <CardTitle className="p-4">User Detail</CardTitle>
               <CardContent>
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                     >
                        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2">
                           <div className="grid grid-cols-2 gap-2">
                              <FormField
                                 control={form.control}
                                 name="firstname"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>First Name</FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder="Christopher"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="lastname"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Last Name</FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder="Nolan"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <div className="col-span-2">
                                 <FormField
                                    control={form.control}
                                    name="birthdate"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>Birth Date</FormLabel>
                                          <FormControl>
                                             <Input
                                                type="date"
                                                placeholder="1998-10-12"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-2">
                              <FormField
                                 control={form.control}
                                 name="address.province"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Province</FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder="DKI Jakarta"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="address.city"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>City</FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder="Jakarta Pusat"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="address.street"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Street</FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder="Jl sudirman"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="address.postal_code"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Postal Code</FormLabel>
                                       <FormControl>
                                          <Input
                                             type="text"
                                             inputMode="numeric"
                                             pattern="[0-9]*"
                                             placeholder="17132"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                        <div className="w-full flex items-center justify-between">
                           <Button
                              type="button"
                              onClick={router.back}
                              className="hover:cursor-pointer"
                           >
                              Back
                           </Button>
                           <Button
                              type="submit"
                              className="hover:cursor-pointer"
                           >
                              Submit
                           </Button>
                        </div>
                     </form>
                  </Form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
