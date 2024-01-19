import { AuthenticationInfo } from "@/utils/authTypes";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import LoadingIndicator from "./LoadingIndicator";

function Authentication({ children }: AuthenticationInfo) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() =>
            supabase.auth
                .getUser()
                .then(({ data: { user } }) => {
                    if (!user) {
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    router.push("/login");
                })
        );
    }, []);

    if (isPending) {
        return <LoadingIndicator />;
    }

    return <>{children}</>;
}

export { Authentication };
