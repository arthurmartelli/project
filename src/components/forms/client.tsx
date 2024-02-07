"use client"

import { api } from "~/trpc/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

type Props = Partial<React.ComponentProps<'form'>>

export function CreateClientForm(props: Props) {
    const { mutate, isLoading } = api.clients.create.useMutation()

    type Schema = Parameters<typeof mutate>[0]

    const formSchema: z.ZodType<Schema> = z.object({
        name: z.string(),
        email: z.string(),
        phone: z.number(),
        address_line1: z.string(),
        address_line2: z.string().nullish(),
        address_city: z.string(),
        address_state: z.string(),
        address_country: z.string(),
        address_zip: z.string(),
    })


    const form = useForm<Schema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address_line2: null,
        }
    })

    function onSubmit(values: Schema) {
        console.log(values)
        mutate(values)
    }

    return <Form {...form}>
        <form {...props} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder="00000000" {...field} onChange={event => field.onChange(+event.target.value)} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="address_line1"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="address_line2"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="address_city"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input placeholder=""  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="address_state"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                            <Input placeholder="New York"  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="address_country"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <Input placeholder="USA"  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="address_zip"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Zip</FormLabel>
                        <FormControl>
                            <Input placeholder="123"  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit" disabled={isLoading}>Submit</Button>
        </form>

    </Form>
}