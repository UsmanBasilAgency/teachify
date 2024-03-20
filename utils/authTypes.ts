import { ReactNode } from "react";
import { Role } from "./const";

interface RedirectInfo {
    redirectUrl: string | null;
    canRedirect: boolean;
}

interface AuthenticationInfo {
    redirectInfo?: RedirectInfo;
    children: ReactNode;
}

interface AuthorizationInfo extends AuthenticationInfo {
    roles: Role[];
}

export type {
    RedirectInfo,
    AuthenticationInfo,
    AuthorizationInfo,
}