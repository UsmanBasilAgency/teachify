import { ComponentType, FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { Roles } from "@/utils/const";

interface WithAdminRouteProps {
    session: Session | null;
}

function withAuthorizationRoute<P extends object>(
    WrappedComponent: ComponentType<P>,
    roles: Roles[]
) {
    const withAdminAuth: FC<P & WithAdminRouteProps> = (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            async function checkAuthorization() {
                const response = await fetch("api/v1/validateRole", {
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
                    router.push("/menu");
                }
            }

            checkAuthorization();
        }, []);

        if (loading) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };

    return withAdminAuth;
}

export { withAuthorizationRoute };
