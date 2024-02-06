// import { api } from "~/trpc/server";
import ProfileForm from "./clients/page";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ProfileForm />
    </main>
  );
}
