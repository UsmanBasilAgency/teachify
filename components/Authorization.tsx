import LoadingIndicator from "./LoadingIndicator";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthorizationInfo } from "@/utils/authTypes";
import { useTransition } from "react";

function Authorization({ roles, redirectInfo, children }: AuthorizationInfo) {
    const { canRedirect, redirectUrl } = redirectInfo
        ? redirectInfo
        : { canRedirect: true, redirectUrl: null };
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() =>
            fetch("/api/v1/validateRole", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roles
                })
            })
                .then((res) => {
                    if (res.status !== 200 && canRedirect) {
                        const finalRoute = redirectUrl ? redirectUrl : "/menu";
                        router.push(finalRoute);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    router.push("/menu");
                })
        );
    }, []);

    if (isPending) {
        return <LoadingIndicator />;
    }

    return <>{children}</>;
}

export { Authorization };
