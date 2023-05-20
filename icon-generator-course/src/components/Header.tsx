import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { PrimaryLink } from "./PrimaryLink";
import { useBuyCredits } from "~/hooks/useBuyCredits";


export function Header() {
    const session = useSession();
    const { buyCredits } = useBuyCredits();
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
            <ul className="flex gap-4">
                {isLoggedIn && (
                    <>
                        <li>
                            <Button onClick={() => {
                                buyCredits().catch(console.error)
                                }}>
                                Buy Credits
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                signOut().catch(console.error)
                            }}>
                                Logout
                            </Button>
                        </li>
                    </>
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