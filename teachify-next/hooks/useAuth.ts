import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const loadUseStatus = async () => {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser();
                setIsAuthenticated(user ? true : false);
            } catch (error) {
                console.error('Async operation failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUseStatus();
    }, [supabase.auth]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
          router.push('/login');
        }
      }, [isLoading, isAuthenticated, router]);

    return {
        isAuthenticated,
        isLoading,
    }
}