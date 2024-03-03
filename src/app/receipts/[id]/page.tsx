"use server"

import { api } from "~/trpc/server"

export default async function Home({ params }: { params: { id: string } }) {
    // Route -> /receipt/[id: number]

    const receipt = await api.receipt.get.query({ id: parseInt(params.id) })

    console.log(receipt)

    return <h1>{receipt.map(e => e.clientEmail)}</h1>
}