// import { api } from "~/trpc/server";
import { CreateClientForm } from "~/components/forms";
import { api } from "~/trpc/server";

export default async function Home() {
  const clients = await api.clients.getAll.query()
  console.log(clients)

  return (
    <main className="flex min-h-screen flex-col items-center border-x-slate-700 justify-center">
      <CreateClientForm />
    </main>
  );
}
