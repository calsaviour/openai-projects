import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";
import { PrimaryLink } from "./PrimaryLink";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";


export function Header() {
    const session = useSession();
    const { buyCredits } = useBuyCredits();

    const credits = api.user.getCredits.useQuery();

    const isLoggedIn = !!session.data;

    return (
        <header className="dark:bg-gray-800 flex justify-between h-16 items-center container mx-auto px-4 sm:px-0">
            <PrimaryLink href="/">
                Icon Generator
            </PrimaryLink>
            <ul className="flex gap-4">
                <li>
                    <PrimaryLink href="/generate">Generate</PrimaryLink>
                </li>
                <li>
                    <PrimaryLink href="/community">Community</PrimaryLink>
                </li>
                {isLoggedIn && (
                    <li>
                        <PrimaryLink href="/collection">Collection</PrimaryLink>
                    </li>
                    )
                }
            </ul>
            <ul className="flex gap-4">
                {isLoggedIn && (
                    <>
                        <div className="flex items-center">
                            Credits Remaining {credits.data}
                        </div>
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