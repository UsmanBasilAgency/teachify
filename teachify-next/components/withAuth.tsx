import { ComponentType, FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@/utils/const";
import LoadingIndicator from "./LoadingIndicator";

function withAuthorization<P extends object>(
    WrappedComponent: ComponentType<P>,
    roles: Role[],
    shouldRedirect = true
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

                setLoading(false);

                if (response.status !== 200) {
                    if (shouldRedirect) {
                        router.push("/menu");
                    } else {
                        setRedirect(true);
                    }
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
    shouldRedirect = true
): FC<P> {
    return withAuthorization<P>(
        WrappedComponent,
        Object.values(Role),
        shouldRedirect
    );
}

export { withAuthorization, withAuthentication };
