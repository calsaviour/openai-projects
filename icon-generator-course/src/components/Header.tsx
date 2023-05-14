import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./Button";
import { PrimaryLink } from "./PrimaryLink";

export function Header() {
    const session = useSession();
    const isLoggedIn = !!session.data;

    return (
        <header className="dark:bg-gray-800 flex justify-between h-16 items-center container mx-auto px-4 sm:px-0">
            <PrimaryLink href="/">
                Icon Generator
            </PrimaryLink>
            <ul>
                <li>
                    <PrimaryLink href="/generate">Generate</PrimaryLink>
                </li>
            </ul>
            <ul>
                {isLoggedIn && (
                    <li>
                        <Button
                            variant="secondary"
                            onClick={() => {
                            signOut().catch(console.error)
                        }}>
                            Logout
                        </Button>
                    </li>
                )}
                {!isLoggedIn && (
                    <li>
                    <Button onClick={() => {
                        signIn().catch(console.error)
                    }}>
                        Login
                    </Button>
                </li>
                )}
            </ul>
        </header>
    )
}