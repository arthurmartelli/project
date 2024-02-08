import { CreateClientForm, CreateReceiptForm } from "~/components/forms";
import { FormDialog } from "~/components/partials/clients-drawer";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center border-x-slate-700 justify-center">
      <FormDialog title="Create new client" description="Fill the following information">
        <CreateClientForm />
      </FormDialog>

      <FormDialog title="Create new receipt" description="Fill the following information">
        <CreateReceiptForm />
      </FormDialog>
    </main>
  );
}
