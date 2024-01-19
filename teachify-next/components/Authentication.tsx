import { Role } from "@/utils/const";
import { Authorization } from "./Authorization";
import { AuthenticationInfo } from "@/utils/authTypes";

function Authentication({ redirectInfo, children }: AuthenticationInfo) {
    return (
        <Authorization
            roles={[Role.any]}
            redirectInfo={
                redirectInfo
                    ? redirectInfo
                    : { canRedirect: true, redirectUrl: "/login" }
            }
        >
            {children}
        </Authorization>
    );
}

export { Authentication };
