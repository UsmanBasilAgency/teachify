import { Role } from "./const";

function getLastElement<T>(array: T[]): T | null {
    return array.length > 0 ? array[array.length - 1] : null;
}

function convertRoles(roles: string[]): Role[] {
    return roles
        .map((role) => Role[role as keyof typeof Role])
        .filter((role) => role != undefined && role != null);
}

function extractRolesSupabaseResult(data: { role: any }[] | null): Role[] {
    return data != null
        ? convertRoles(
              data.flatMap(({ role }) =>
                  role ? (role as string).split(",") : []
              )
          )
        : [];
}

export {
    getLastElement,
    convertRoles,
    extractRolesSupabaseResult,
    isNullOrEmpty
};
