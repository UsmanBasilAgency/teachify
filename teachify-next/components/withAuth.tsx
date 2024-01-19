import { ComponentType, FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@/utils/const";
import LoadingIndicator from "./LoadingIndicator";

function withAuthorization<P extends object>(
    WrappedComponent: ComponentType<P>,
    roles: Role[],
    redirectRoute: string | null = "/menu"
): FC<P> {
    const withAdminAuth: FC<P> = (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [redirect, setRedirect] = useState(true);

        useEffect(() => {
            async function checkAuthorization() {
                const response = await fetch("/api/v1/validateRole", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        roles
                    })
                });

                if (response.status !== 200) {
                    if (redirectRoute) {
                        router.push(redirectRoute);
                    } else {
                        setLoading(false);
                        setRedirect(false);
                    }
                } else {
                    setLoading(false);
                }
            }

            checkAuthorization();
        }, []);

        if (loading) {
            return <LoadingIndicator />;
        }

        if (!redirect) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return withAdminAuth;
}

function withAuthentication<P extends object>(
    WrappedComponent: ComponentType<P>,
    redirectRoute: string | null = "/login"
): FC<P> {
    return withAuthorization<P>(
        WrappedComponent,
        Object.values(Role),
        redirectRoute
    );
}

export { withAuthorization, withAuthentication };
