"use client"

import { api } from "~/trpc/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from "~/lib/utils"

import { Check, ChevronsUpDown } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "~/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

type Props = Partial<React.ComponentProps<'form'>>

export function CreateReceiptForm(props: Props) {
    const { mutate, isLoading } = api.receipt.create.useMutation()

    type Schema = Parameters<typeof mutate>[0]

    const formSchema: z.ZodType<Schema> = z.object({
        clientId: z.string(),
        clientEmail: z.string(),
        clientPhone: z.number(),
        notes: z.string(),
        discount: z.number().min(0),
        discount_type: z.enum(["FIXED_AMOUNTS", "PERCENT"]),
        taxes: z.number().min(0),
    })

    const form = useForm<Schema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            discount: 0,
            discount_type: "PERCENT",
            taxes: 13,
        }
    })

    const clients = api.clients.getAll.useQuery()

    function onSubmit(values: Schema) { mutate(values) }

    if (clients.data == undefined) return <div>Loading...</div>

    return <Form {...form}>
        <form {...props} onSubmit={form.handleSubmit(onSubmit)} className="p-8  flex gap-4 flex-col w-full">

            <FormField
                control={form.control}
                name="clientEmail"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Client Email</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-[200px] justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value
                                            ? clients.data.find(
                                                (client) => client.email === field.value
                                            )?.email
                                            : "Select email"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search email..." />
                                    <CommandEmpty>No email found.</CommandEmpty>
                                    <CommandGroup>
                                        {clients.data.map((client) => (
                                            <CommandItem
                                                value={client.email}
                                                key={client.email}
                                                onSelect={() => {
                                                    form.setValue("clientEmail", client.email)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        client.email === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {client.email}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormDescription>
                            This is the client that will have the receipt.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Discount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="00000000"
                                    {...field}
                                    onChange={event => field.onChange(parseInt(event.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="discount_type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Discount Type</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="PERCENT" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Percent %
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="FIXED_AMOUNTS" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Fixed Amount $
                                        </FormLabel>
                                    </FormItem>

                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Write any notes on the receipt"
                                className="min-h-24"
                                {...field}
                                value={field.value ?? ''}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="taxes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Taxes (%)</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                onChange={event => field.onChange(parseFloat(event.target.value))} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit" disabled={isLoading}>Submit</Button>
        </form>

    </Form>
}