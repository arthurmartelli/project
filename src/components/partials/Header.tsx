import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
// import { SignInButton, SignedOut } from "@clerk/nextjs";

import { ThemeToggle } from "../theme/toggle";

export function Header() {
    return (
        <header style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
            {/* Logo - RHS */}
            <Link href="/">Facturas</Link>

            {/* Activities - LFH */}
            <div className="ml-auto flex gap-4">
                <ThemeToggle />

                {/* Mount the UserButton component */}
                <SignedIn>
                    <UserButton />
                </SignedIn>

                {/* Signed out users get sign in button */}
                {/* But there is no need as whole app is protected */}
                {/* <SignedOut>
                <SignInButton />
            </SignedOut> */}
            </div>
        </header>
    );
}