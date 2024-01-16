import {
    ComponentType,
    FC, useEffect,
    useState
} from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Roles, Tables } from "@/utils/const";
import LoadingIndicator from "./LoadingIndicator";

interface WithAdminRouteProps {
    session: Session | null;
}

const withAdminRoute = <P extends object>(
    WrappedComponent: ComponentType<P>,
    roles: Roles[]
) => {
    const withAdminAuth: FC<P & WithAdminRouteProps> = (props) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            checkAuthorization();
        }, []);

        const checkAuthorization = async () => {
            await supabase.auth.getSession();

            const { data, error } = await supabase
                .from(Tables.userRoles)
                .select("role");

            if (
                error ||
                !data ||
                data.length === 0 ||
                data.filter((userRole) => roles.includes(userRole.role)).length === 0
            ) {
                router.push("/menu");
            } else {
                setLoading(false);
            }
        };

        if (loading) {
            return <LoadingIndicator />;
        }

        return <WrappedComponent {...props} />;
    };

    return withAdminAuth;
};

export { withAdminRoute };
