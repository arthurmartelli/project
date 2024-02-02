import { unstable_noStore as noStore } from "next/cache";

import { CreatePost } from "~/app/_components/create-post";
import { ThemeToggle } from "~/components/theme/toggle";
import { api } from "~/trpc/server";
import ProfileForm from "./clients/page";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ThemeToggle />
      <h1>{hello.greeting}!</h1>
      <CrudShowcase />
    </main>
  );
}

async function CrudShowcase() {

  return (
    <div className="w-full max-w-xs">
      <ProfileForm />
    </div>
  );
}
