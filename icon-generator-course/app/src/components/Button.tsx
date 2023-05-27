import clsx from "clsx";
import { Spinner } from "./Spinner";

export function Button(props: React.ComponentPropsWithRef<"button"> & {
    variant?: 'primary' | 'secondary';
    isLoading?: boolean
}
) {
    const color = (props.variant ?? "primary") === 'primary' ? 
        "bg-blue-400 hover:bg-blue-500" 
        : "bg-gray-400 hover:bg-gray-500";

    return (
        <button {...props}
            className={clsx("flex gap-2 justify-center rounded px-4 py-2 disabled:bg-gray-600", color)}>
            {props.isLoading && <Spinner />}
            {props.children}
        </button>
    )
}