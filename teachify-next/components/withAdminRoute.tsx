import { ComponentType, FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Roles } from "@/utils/const";
import LoadingIndicator from "./LoadingIndicator";

function withAuthorizationRoute<P extends object>(
    WrappedComponent: ComponentType<P>,
    roles: Roles[],
    redirect = true
): FC<P> {
    const withAdminAuth: FC<P> = (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [nonRedirect, setNonRedirect] = useState(false);

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
                    if (redirect) {
                        router.push("/menu");
                    } else {
                        setNonRedirect(true);
                    }
                }
            }

            checkAuthorization();
        }, []);

        if (loading) {
            return <LoadingIndicator />;
        }

        if (nonRedirect) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return withAdminAuth;
}

export { withAuthorizationRoute };
