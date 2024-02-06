import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "../theme/toggle";

export function Header() {
    return (
        <header style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
            <h1>My App</h1>

            <div className="ml-auto pr-4">
                <ThemeToggle />
            </div>

            <SignedIn>
                {/* Mount the UserButton component */}
                <UserButton />
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton />
            </SignedOut>
        </header>
    );
}